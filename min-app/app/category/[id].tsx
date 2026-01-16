import { useLocalSearchParams } from 'expo-router';
import CategoryDetailsScreen from '../../src/screens/category/CategoryDetailsScreen';

export default function CategoryDetailsRoute() {
    const { id, name, fromSearch, searchQuery } = useLocalSearchParams();

    const categoryId = Array.isArray(id) ? id[0] : id || '1';
    const categoryName = Array.isArray(name) ? name[0] : name || 'التصنيف';
    const isFromSearch = Array.isArray(fromSearch) ? fromSearch[0] : fromSearch;
    const query = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;

    return (
        <CategoryDetailsScreen
            id={categoryId}
            name={categoryName}
            fromSearch={isFromSearch}
            searchQuery={query}
        />
    );
}
