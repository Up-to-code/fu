// File: app/(tabs)/categories.tsx
import { AuthGuard } from '../../src/components/global/AuthGuard';
import CategoriesScreen from '../../src/screens/categories/CategoriesScreen';

export default function CategoriesRoute() {
    return (
        <AuthGuard>
            <CategoriesScreen />
        </AuthGuard>
    );
}
