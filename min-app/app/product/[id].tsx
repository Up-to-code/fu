import { useLocalSearchParams } from 'expo-router';
import ProductDetailsScreen from '../../src/screens/product/ProductDetailsScreen';

export default function ProductDetailsRoute() {
    const { id } = useLocalSearchParams();

    // Ensure id is a string
    const productId = Array.isArray(id) ? id[0] : id;

    return <ProductDetailsScreen id={productId} />;
}
