import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{title:"feed"}}/>
      <Tabs.Screen name="post" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
