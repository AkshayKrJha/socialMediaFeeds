import Post from "@/components/Post";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const postList = Array.from({ length: 50 }).map((_, id) => {
    let length = Math.floor(Math.random() * 10) + 1;
    return {
      id,
      length,
      randomList: Array.from({ length }).map((_) => {
        return Math.floor(Math.random() * 10000);
      }),
    };
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={postList}
        renderItem={({ item }) => {
          return <Post randomList={item.randomList}/>;
        }}
        keyExtractor={(item: any) => item.id}
      />
      {/* <Post /> */}
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
    </View>
  );
}
