import { RootState } from "@/store/store";
import { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

export default function Index() {
  const userPosts = useSelector((state: RootState) => {
    return state.postsReducer.posts;
  });
  // User data
  const numFollowers = 30;
  const userName = "myProfile";
  const bio = "\nA passionate coder\n with keen interest in react-native\n";
  // required dimensions for image
  function getDimensions() {
    const height = Dimensions.get("window").height;
    const width = Dimensions.get("window").width;
    if (height > width) return { wide: width / 3.4, high: width / 3.4 };
    else return { wide: height / 3.4, high: height / 3.4 };
  }
  useEffect(() => {
    console.log("User Posts", userPosts);
  }, [userPosts]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        padding: "5%",
      }}
    >
      {/* profile pic, username */}
      <View
        style={{
          flex: 0.25,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={{ flex: 1, height: 50, width: 50, borderRadius: 25 }}
          resizeMode="contain"
        />
        <Text style={{ flex: 3, fontWeight: "bold", fontSize: 15 }}>
          {userName}
        </Text>
      </View>
      {/* bio */}
      <Text>{bio}</Text>
      {/* #followers #posts */}
      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
        {`\n${numFollowers}\t`}Followers {"\t\t\t\t"}
        {`${userPosts?.length}\t`}Posts{"\n"}
      </Text>
      {/* GRID OF POSTS */}
      <FlatList
        data={userPosts}
        renderItem={({ item }) => {
          return (
            <ImageBackground
              source={{ uri: item?.image }}
              // resizeMode="contain"
              style={{
                height: getDimensions().high,
                width: getDimensions().wide,
                margin: "1%",
              }}
            ></ImageBackground>
          );
        }}
        numColumns={3}
      />
    </View>
  );
}
