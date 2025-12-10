import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";
import { Colors } from "@/theme/theme";
import { Ionicons } from "@expo/vector-icons";

export default function DrawerLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerItemStyle: {
                    backgroundColor: Colors.background,
                },
                drawerStyle: {
                    backgroundColor: Colors.background,
                    width: 280,

                },
            }}
        >
            <Drawer.Screen
                name="home"
                options={{ title: "Home", drawerIcon: ({ color, size, focused }) => <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} /> }}

            />
            <Drawer.Screen
                name="profile"
                options={{ title: "Profile", drawerIcon: ({ color, size, focused }) => <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} /> }}
            />
            <Drawer.Screen
                name="friends"
                options={{ title: "Friends", drawerIcon: ({ color, size, focused }) => <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} /> }}
            />
            <Drawer.Screen
                name="settings"
                options={{ title: "Settings", drawerIcon: ({ color, size, focused }) => <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} /> }}
            />
        </Drawer>
    );
}
