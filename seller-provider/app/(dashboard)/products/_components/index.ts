// Shared Product Components
export { MediaUpload, CompactMediaUpload, type Media } from './MediaUpload';
export { MediaManager } from './MediaManager';
export { ProductOptions, type Option, type OptionValue } from './ProductOptions';
export { VariantsList, type Variant } from './VariantsList';
export { RichTextEditor } from './RichTextEditor';
export { ProductSidebar } from './ProductSidebar';

// Variant generation utility
export function generateVariants(options: { id: string; name: string; values: { value: string }[] }[], existingVariants: { id: string; combination: Record<string, string> }[] = []): { id: string; combination: Record<string, string>; price: string; stock: string; sku: string; media: { id: string; url: string; type: string }[] }[] {
    if (options.length === 0 || options.every(o => o.values.length === 0)) return [];

    const combinations: Record<string, string>[] = [];

    const generate = (index: number, current: Record<string, string>) => {
        if (index === options.length) {
            combinations.push({ ...current });
            return;
        }
        const option = options[index];
        if (option.values.length === 0) {
            generate(index + 1, current);
        } else {
            for (const val of option.values) {
                current[option.name] = val.value;
                generate(index + 1, current);
            }
        }
    };

    generate(0, {});

    return combinations.map((combo, i) => {
        const comboKey = Object.values(combo).join('-');
        const existing = existingVariants.find(v => Object.values(v.combination).join('-') === comboKey) as { id: string; combination: Record<string, string>; price: string; stock: string; sku: string; media: { id: string; url: string; type: string }[] } | undefined;
        return existing || {
            id: `var-${i}-${Date.now()}`,
            combination: combo,
            price: "",
            stock: "",
            sku: "",
            media: [],
        };
    });
}
