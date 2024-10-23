import { RootState } from "@/store/store";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Index() {
  const userPosts = useSelector((state: RootState) => {
    return state.postsReducer.posts;
  });
  useEffect(() => {
    console.log("User Posts", userPosts);
  }, [userPosts]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
    </View>
  );
}
