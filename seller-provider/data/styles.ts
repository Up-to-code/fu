// Furniture Style Types
export const styleTypes = [
    { id: "modern", name: "عصري", nameEn: "Modern", color: "bg-blue-100 text-blue-700" },
    { id: "classic", name: "كلاسيكي", nameEn: "Classic", color: "bg-amber-100 text-amber-700" },
    { id: "minimal", name: "مينيمال", nameEn: "Minimal", color: "bg-gray-100 text-gray-700" },
    { id: "rustic", name: "ريفي", nameEn: "Rustic", color: "bg-green-100 text-green-700" },
    { id: "luxury", name: "فاخر", nameEn: "Luxury", color: "bg-purple-100 text-purple-700" },
    { id: "scandinavian", name: "إسكندنافي", nameEn: "Scandinavian", color: "bg-sky-100 text-sky-700" },
    { id: "industrial", name: "صناعي", nameEn: "Industrial", color: "bg-slate-100 text-slate-700" },
    { id: "bohemian", name: "بوهيمي", nameEn: "Bohemian", color: "bg-pink-100 text-pink-700" },
];

export type StyleType = typeof styleTypes[number];

export const getStyleById = (id: string) => styleTypes.find(s => s.id === id) || styleTypes[0];
