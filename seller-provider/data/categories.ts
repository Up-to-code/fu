// Categories Mock Data
export const categories = [
    {
        id: "1",
        name: "غرف نوم",
        nameEn: "Bedrooms",
        description: "أسرّة، خزائن ملابس، كومودينو، تسريحات",
        products: 24,
        icon: "🛏️",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
        style: "modern"
    },
    {
        id: "2",
        name: "غرف معيشة",
        nameEn: "Living Rooms",
        description: "كنب، طاولات قهوة، وحدات تلفزيون، سجاد",
        products: 18,
        icon: "🛋️",
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400",
        style: "classic"
    },
    {
        id: "3",
        name: "غرف طعام",
        nameEn: "Dining Rooms",
        description: "طاولات طعام، كراسي، بوفيهات، خزائن عرض",
        products: 12,
        icon: "🍽️",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400",
        style: "luxury"
    },
    {
        id: "4",
        name: "مكتبي",
        nameEn: "Office",
        description: "مكاتب عمل، كراسي مكتب، أرفف، خزائن ملفات",
        products: 15,
        icon: "💼",
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
        style: "minimal"
    },
    {
        id: "5",
        name: "إكسسوارات",
        nameEn: "Accessories",
        description: "مرايا، لوحات فنية، مزهريات، ديكورات",
        products: 45,
        icon: "🎨",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        style: "modern"
    },
    {
        id: "6",
        name: "إضاءة",
        nameEn: "Lighting",
        description: "ثريات، أباجورات، إضاءة أرضية، إضاءة حائط",
        products: 30,
        icon: "💡",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400",
        style: "rustic"
    },
    {
        id: "7",
        name: "غرف أطفال",
        nameEn: "Kids Rooms",
        description: "أسرّة أطفال، مكاتب دراسة، خزائن، ألعاب",
        products: 20,
        icon: "🧸",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400",
        style: "scandinavian"
    },
    {
        id: "8",
        name: "حدائق وخارجية",
        nameEn: "Outdoor",
        description: "جلسات خارجية، طاولات حديقة، مظلات",
        products: 14,
        icon: "🌳",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400",
        style: "rustic"
    },
];

export type Category = typeof categories[number];
