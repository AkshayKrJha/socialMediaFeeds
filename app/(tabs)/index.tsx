import Post from "@/components/Post";
import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const numPosts = 500;
  const postList = Array.from({ length: numPosts }).map((_, id) => {
    let length = Math.floor(Math.random() * 10) + 1;
    return {
      id,
      length,
      randomList: Array.from({ length }).map((_) => {
        return Math.floor(Math.random() * 10000);
      }),
    };
  });
  const verticalListOptimizationProps = {
    initialNumToRender: 10,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 3,
    keyExtractor: useCallback((e: any) => e.id, []),
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: "2%",
      }}
    >
      <FlatList
        data={postList}
        renderItem={useCallback(({ item }: any) => {
          return <Post randomList={item.randomList} />;
        }, [])}
        {...verticalListOptimizationProps}
      />
      {/* <Post /> */}
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
    </View>
  );
}
