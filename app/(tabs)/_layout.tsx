import { store } from "@/store/store";
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Provider } from "react-redux";

export default function TabLayout() {
  return (
    <Provider store={store}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "feed",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="feed" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="send" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="account-circle" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </Provider>
  );
}
