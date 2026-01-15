const { withPodfile } = require('@expo/config-plugins');

const withFollyFix = (config) => {
    return withPodfile(config, (config) => {
        let podfileContent = config.modResults.contents;

        // Check if already patched to verify idempotency (partially)
        if (podfileContent.includes('FOLLY_CFG_NO_COROUTINES')) {
            return config;
        }

        const follyFix = `
    installer.pods_project.targets.each do |target|
      if target.name == 'RCT-Folly'
        target.build_configurations.each do |config|
          config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= ['$(inherited)']
          config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_NO_CONFIG=1'
          config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_MOBILE=1'
          config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_USE_LIBCPP=1'
          config.build_settings['OTHER_CPLUSPLUSFLAGS'] ||= ['$(inherited)']
          config.build_settings['OTHER_CPLUSPLUSFLAGS'] << '-DFOLLY_CFG_NO_COROUTINES=1'
        end
      end
    end
    `;

        // Regex to match the post_install block.
        // We assume the block ends with "end" on a new line with some indentation.
        // "post_install do |installer|" starts the block.
        // We append our fix right before the closing "end" of this block.

        // Note: JS regex dot (.) does not match newlines by default. [\s\S] does.
        // We rely on the fact that inside post_install there are typically no other "end" keywords 
        // at the same nesting level if it only contains the react_native_post_install call.
        // However, to be safer, we can match the specific react_native_post_install call and then finding the end.

        // Let's try matching the whole block assuming standard expo template structure.
        const regex = /(post_install do \|installer\|[\s\S]*?)(\n\s*end)/;

        if (regex.test(podfileContent)) {
            config.modResults.contents = podfileContent.replace(regex, `$1\n${follyFix}$2`);
        } else {
            console.warn('withFollyFix: Could not match post_install block, skipping patch.');
        }

        return config;
    });
};

module.exports = withFollyFix;
