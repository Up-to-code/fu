import { useLocalSearchParams } from 'expo-router';
import CategoryDetailsScreen from '../../src/screens/category/CategoryDetailsScreen';

export default function CategoryDetailsRoute() {
    const { id, name } = useLocalSearchParams();

    const categoryId = Array.isArray(id) ? id[0] : id || '1';
    const categoryName = Array.isArray(name) ? name[0] : name || 'التصنيف';

    return <CategoryDetailsScreen id={categoryId} name={categoryName} />;
}
