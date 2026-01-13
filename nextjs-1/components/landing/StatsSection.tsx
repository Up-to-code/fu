export function StatsSection() {
    const stats = [
        { value: "1,200+", label: "شريك نشط", sublabel: "في مختلف القطاعات" },
        { value: "50K+", label: "معاملة يومية", sublabel: "معالجة آمنة" },
        { value: "99.9%", label: "وقت تشغيل", sublabel: "موثوقية عالية" },
        { value: "24/7", label: "دعم فني", sublabel: "متاح دائماً" },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-[#242C5A] to-[#1a2144] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/5"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center space-y-3 group">
                                <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-white transition-transform duration-300 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-bold text-white/90">
                                        {stat.label}
                                    </p>
                                    <p className="text-sm text-white/60">
                                        {stat.sublabel}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
