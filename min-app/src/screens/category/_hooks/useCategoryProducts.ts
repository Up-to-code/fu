// File: src/screens/category/_hooks/useCategoryProducts.ts
// Purpose: Fetch products by category

import { useMemo } from 'react';
import { IProductCardProps } from '../../shared';

interface UseCategoryProductsReturn {
    products: IProductCardProps[];
    isLoading: boolean;
}

// Mock products data (in real app, fetch from Convex)
const MOCK_PRODUCTS: Record<string, IProductCardProps[]> = {
    '1': [ // كنب
        { id: '1', name: 'صوفا مودرن مريحة', price: 2499, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', rating: 4.8 },
        { id: '2', name: 'كنبة زاوية فاخرة', price: 3499, discount: 15, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80', rating: 4.5 },
        { id: '3', name: 'صوفا جلد أصلي', price: 4299, image: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=500&q=80', rating: 4.9 },
        { id: '14', name: 'أريكة كنب كبيرة', price: 4999, discount: 12, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80', rating: 4.7 },
        { id: '15', name: 'صوفا قماش فاخر', price: 3299, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', rating: 4.6 },
        { id: '16', name: 'كنبة استرخاء', price: 2799, discount: 8, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', rating: 4.4 },
        { id: '32', name: 'صوفا ثلاثية مودرن', price: 3799, discount: 18, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', rating: 4.7 },
        { id: '33', name: 'كنبة كشمير فاخرة', price: 5499, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80', rating: 4.9 },
        { id: '34', name: 'أريكة كنب صغيرة', price: 1999, discount: 10, image: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=500&q=80', rating: 4.5 },
        { id: '35', name: 'صوفا قابلة للتحويل', price: 4199, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80', rating: 4.6 },
        { id: '36', name: 'كنبة جلد إيطالي', price: 6999, discount: 20, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', rating: 4.8 },
        { id: '37', name: 'أريكة كنب مريحة', price: 3199, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', rating: 4.7 },
        { id: '69', name: 'صوفا أنيقة بوسائد', price: 3699, discount: 14, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', rating: 4.8 },
        { id: '70', name: 'كنبة كنب فاخرة', price: 4599, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80', rating: 4.7 },
        { id: '71', name: 'أريكة كنب مودرن', price: 2899, discount: 11, image: 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=500&q=80', rating: 4.6 },
        { id: '72', name: 'صوفا جلد فاخر', price: 5999, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80', rating: 4.9 },
        { id: '73', name: 'كنبة استرخاء كبيرة', price: 3899, discount: 16, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', rating: 4.8 },
        { id: '74', name: 'أريكة كنب كلاسيكية', price: 3399, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', rating: 4.7 },
    ],
    '2': [ // أسرة
        { id: '4', name: 'سرير ملكي خشب زان', price: 5999, image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', rating: 4.7 },
        { id: '5', name: 'سرير مزدوج مودرن', price: 3999, discount: 10, image: 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=500&q=80', rating: 4.6 },
        { id: '17', name: 'سرير مفرد كلاسيكي', price: 2499, image: 'https://images.unsplash.com/photo-1631889993954-980d3c103b11?w=500&q=80', rating: 4.5 },
        { id: '18', name: 'سرير أطفال', price: 1899, discount: 15, image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', rating: 4.8 },
        { id: '19', name: 'سرير مودرن بدرج', price: 4499, image: 'https://images.unsplash.com/photo-1631889993954-980d3c103b11?w=500&q=80', rating: 4.9 },
        { id: '38', name: 'سرير مزدوج فاخر', price: 5499, discount: 12, image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', rating: 4.8 },
        { id: '39', name: 'سرير مودرن بذراعين', price: 3799, image: 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=500&q=80', rating: 4.6 },
        { id: '40', name: 'سرير مفرد مودرن', price: 2199, discount: 8, image: 'https://images.unsplash.com/photo-1631889993954-980d3c103b11?w=500&q=80', rating: 4.5 },
        { id: '41', name: 'سرير أطفال مودرن', price: 1699, image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', rating: 4.7 },
        { id: '42', name: 'سرير ملكي فاخر', price: 6999, discount: 15, image: 'https://images.unsplash.com/photo-1631889993954-980d3c103b11?w=500&q=80', rating: 4.9 },
        { id: '43', name: 'سرير مزدوج كلاسيكي', price: 3299, image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', rating: 4.6 },
        { id: '75', name: 'سرير مزدوج أنيق', price: 4799, discount: 13, image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', rating: 4.8 },
        { id: '76', name: 'سرير مفرد فاخر', price: 2699, image: 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=500&q=80', rating: 4.7 },
        { id: '77', name: 'سرير أطفال كلاسيكي', price: 1599, discount: 9, image: 'https://images.unsplash.com/photo-1631889993954-980d3c103b11?w=500&q=80', rating: 4.6 },
        { id: '78', name: 'سرير مودرن بوسائد', price: 4199, image: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=500&q=80', rating: 4.8 },
        { id: '79', name: 'سرير ملكي أنيق', price: 6499, discount: 17, image: 'https://images.unsplash.com/photo-1631889993954-980d3c103b11?w=500&q=80', rating: 4.9 },
        { id: '80', name: 'سرير مزدوج مريح', price: 3599, image: 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=500&q=80', rating: 4.7 },
    ],
    '3': [ // طاولات
        { id: '6', name: 'طاولة قهوة خشبية', price: 899, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', rating: 4.4 },
        { id: '7', name: 'طاولة طعام رخام', price: 2999, discount: 20, image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', rating: 4.8 },
        { id: '20', name: 'طاولة جانبية ذهبية', price: 599, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', rating: 4.3 },
        { id: '21', name: 'طاولة مكتب زجاجية', price: 1299, discount: 10, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', rating: 4.6 },
        { id: '22', name: 'طاولة طعام مستديرة', price: 3499, image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', rating: 4.7 },
        { id: '44', name: 'طاولة قهوة زجاجية', price: 749, discount: 12, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', rating: 4.5 },
        { id: '45', name: 'طاولة طعام مستطيلة', price: 3799, image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', rating: 4.8 },
        { id: '46', name: 'طاولة جانبية خشبية', price: 549, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', rating: 4.4 },
        { id: '47', name: 'طاولة مكتب مودرن', price: 1499, discount: 15, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', rating: 4.7 },
        { id: '48', name: 'طاولة طعام بيضاوية', price: 4299, image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', rating: 4.9 },
        { id: '49', name: 'طاولة قهوة رخامية', price: 1199, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', rating: 4.6 },
        { id: '81', name: 'طاولة قهوة أنيقة', price: 999, discount: 11, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', rating: 4.6 },
        { id: '82', name: 'طاولة طعام فاخرة', price: 3999, image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', rating: 4.8 },
        { id: '83', name: 'طاولة جانبية مودرن', price: 649, discount: 9, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', rating: 4.5 },
        { id: '84', name: 'طاولة مكتب فاخرة', price: 1699, discount: 14, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', rating: 4.7 },
        { id: '85', name: 'طاولة طعام كلاسيكية', price: 3199, image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&q=80', rating: 4.9 },
        { id: '86', name: 'طاولة قهوة مودرن', price: 849, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&q=80', rating: 4.5 },
    ],
    '4': [ // كراسي
        { id: '8', name: 'كرسي مكتب مريح', price: 599, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.3 },
        { id: '9', name: 'كرسي جلد كلاسيكي', price: 1299, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.7 },
        { id: '23', name: 'كرسي استرخاء', price: 899, discount: 12, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.5 },
        { id: '24', name: 'كرسي طعام خشبي', price: 449, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.4 },
        { id: '25', name: 'كرسي مكتب إرجونوميك', price: 1499, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.8 },
        { id: '50', name: 'كرسي مكتب فاخر', price: 1799, discount: 10, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.7 },
        { id: '51', name: 'كرسي جلد مودرن', price: 1399, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.6 },
        { id: '52', name: 'كرسي استرخاء فاخر', price: 1199, discount: 15, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.8 },
        { id: '53', name: 'كرسي طعام معدني', price: 549, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.5 },
        { id: '54', name: 'كرسي مكتب قماش', price: 699, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.4 },
        { id: '55', name: 'كرسي مكتب ذكي', price: 1999, discount: 12, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.9 },
        { id: '87', name: 'كرسي مكتب أنيق', price: 1599, discount: 13, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.7 },
        { id: '88', name: 'كرسي جلد فاخر', price: 1899, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.8 },
        { id: '89', name: 'كرسي استرخاء مودرن', price: 1099, discount: 11, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.6 },
        { id: '90', name: 'كرسي طعام أنيق', price: 499, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.5 },
        { id: '91', name: 'كرسي مكتب كلاسيكي', price: 1299, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80', rating: 4.7 },
        { id: '92', name: 'كرسي مكتب مودرن', price: 1699, discount: 14, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80', rating: 4.8 },
    ],
    '5': [ // إضاءة
        { id: '10', name: 'مصباح أرضي ذهبي', price: 450, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.5 },
        { id: '11', name: 'ثريا كريستال', price: 1999, discount: 10, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', rating: 4.9 },
        { id: '26', name: 'مصباح طاولة LED', price: 299, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.3 },
        { id: '27', name: 'إضاءة جدارية مودرن', price: 599, discount: 15, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', rating: 4.6 },
        { id: '28', name: 'مصباح سقفي ذكي', price: 1299, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.7 },
        { id: '56', name: 'مصباح أرضي مودرن', price: 549, discount: 8, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.6 },
        { id: '57', name: 'ثريا ذهبية فاخرة', price: 2499, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', rating: 4.8 },
        { id: '58', name: 'مصباح طاولة كلاسيكي', price: 349, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.4 },
        { id: '59', name: 'إضاءة جدارية LED', price: 699, discount: 10, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', rating: 4.7 },
        { id: '60', name: 'مصباح سقفي مودرن', price: 1499, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.8 },
        { id: '61', name: 'مصباح أرضي ذكي', price: 799, discount: 12, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', rating: 4.9 },
        { id: '93', name: 'مصباح أرضي أنيق', price: 599, discount: 9, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.6 },
        { id: '94', name: 'ثريا مودرن فاخرة', price: 2199, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', rating: 4.8 },
        { id: '95', name: 'مصباح طاولة مودرن', price: 379, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.5 },
        { id: '96', name: 'إضاءة جدارية أنيقة', price: 649, discount: 11, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', rating: 4.7 },
        { id: '97', name: 'مصباح سقفي كلاسيكي', price: 1399, image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80', rating: 4.8 },
        { id: '98', name: 'مصباح أرضي فاخر', price: 899, discount: 13, image: 'https://images.unsplash.com/photo-1513506003011-3b03c801e12b?w=500&q=80', rating: 4.9 },
    ],
    '6': [ // ديكور
        { id: '12', name: 'مرآة دائرية ذهبية', price: 399, image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', rating: 4.2 },
        { id: '13', name: 'لوحة فنية مودرن', price: 299, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', rating: 4.4 },
        { id: '29', name: 'ساعة حائط كلاسيكية', price: 499, discount: 10, image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', rating: 4.5 },
        { id: '30', name: 'مزهرية زجاجية', price: 199, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', rating: 4.3 },
        { id: '31', name: 'سجادة صوف فاخرة', price: 1299, discount: 12, image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80', rating: 4.6 },
        { id: '62', name: 'مرآة مستطيلة مودرن', price: 549, discount: 8, image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', rating: 4.5 },
        { id: '63', name: 'لوحة فنية كلاسيكية', price: 399, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', rating: 4.6 },
        { id: '64', name: 'ساعة حائط مودرن', price: 599, discount: 15, image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', rating: 4.7 },
        { id: '65', name: 'مزهرية خزفية', price: 249, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', rating: 4.4 },
        { id: '66', name: 'سجادة تركية فاخرة', price: 1599, discount: 10, image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80', rating: 4.8 },
        { id: '67', name: 'شمعدان ذهبي', price: 349, image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', rating: 4.5 },
        { id: '68', name: 'تمثال فني مودرن', price: 899, discount: 12, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', rating: 4.6 },
        { id: '99', name: 'مرآة أنيقة مودرن', price: 479, discount: 7, image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', rating: 4.6 },
        { id: '100', name: 'لوحة فنية فاخرة', price: 449, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', rating: 4.7 },
        { id: '101', name: 'ساعة حائط أنيقة', price: 529, discount: 11, image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', rating: 4.6 },
        { id: '102', name: 'مزهرية فاخرة', price: 279, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80', rating: 4.5 },
        { id: '103', name: 'سجادة أنيقة', price: 1399, discount: 13, image: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80', rating: 4.7 },
        { id: '104', name: 'شمعدان أنيق', price: 379, image: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?w=500&q=80', rating: 4.6 },
    ],
};

export const useCategoryProducts = (categoryId: string): UseCategoryProductsReturn => {
    // TODO: Implement actual Convex query for category products
    // For now, return mock data as fallback
    const products: IProductCardProps[] = useMemo(() => {
        // In real app, fetch from Convex:
        // const products = useQuery(api.products.getByCategory, { categoryId });
        // return products || MOCK_PRODUCTS[categoryId] || [];
        
        return MOCK_PRODUCTS[categoryId] || [];
    }, [categoryId]);

    return {
        products,
        isLoading: false,
    };
};
