// Standard Tab Layout - Clean and Simple
import { Tabs } from 'expo-router';
import { CartIcon, CategoryIcon, HomeIcon, UserIcon } from '../../src/components/icons/CustomIcons';
import { COLORS } from '../../src/constants/theme';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                animation: 'shift',
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: '#94a3b8',
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#f1f5f9',
                    height: 85,
                    paddingBottom: 25,
                    paddingTop: 10,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Cairo_700Bold',
                    fontSize: 11,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'الرئيسة',
                    tabBarIcon: ({ color, size, focused }) => (
                        <HomeIcon size={size} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="categories"
                options={{
                    title: 'التصنيفات',
                    tabBarIcon: ({ color, size, focused }) => (
                        <CategoryIcon size={size} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'السلة',
                    tabBarIcon: ({ color, size, focused }) => (
                        <CartIcon size={size} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'حسابي',
                    tabBarIcon: ({ color, size, focused }) => (
                        <UserIcon size={size} color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
