import { store } from "@/store/store";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";

export default function TabLayout() {
  return (
    <Provider store={store}>
      <Tabs>
        <Tabs.Screen name="index" options={{ title: "feed" }} />
        <Tabs.Screen name="post" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </Provider>
  );
}
