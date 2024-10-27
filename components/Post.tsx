import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIndex } from "@/hooks/useIndex";
import Octicons from "@expo/vector-icons/Octicons";

// slideList credit https://dev.to/lloyds-digital/let-s-create-a-carousel-in-react-native-4ae2

export default function Post({ randomList = [1, 2, 3, 4, 5] }) {
  const [like, setLike] = useState<any>("like2");
  const [caption, setCaption] = useState<any>("");
  const [author, setAuthor] = useState<any>("");
  const { index, onScroll } = useIndex();
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    (async function () {
      const postQuote = await fetch("https://dummyjson.com/quotes/random")
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          return res;
        });
      console.log(postQuote);
      setCaption(`${postQuote?.quote}`);
      setAuthor(postQuote?.author);
    })();
  }, []);
  const slideList = randomList.map((random, i) => {
    // let random = Math.floor(Math.random() * 10000);
    return {
      id: i,
      image: `https://picsum.photos/1440/2842?random=${random}`,
    };
  });

  const dotList = randomList.map((_, i) => {
    return (
      <Octicons
        name="dot-fill"
        size={24}
        color={i === index ? "#f00" : "#0ff"}
        key={i}
        style={{ marginHorizontal: "1.5%" }}
      />
    );
  });

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((e: any) => e.id, []),
    getItemLayout: useCallback(
      (_: any, index: any) => ({
        index,
        length: 0.88 * windowWidth,
        offset: 0.88 * index * windowWidth,
      }),
      []
    ),
  };

  return (
    <View style={styles.root}>
      <View style={styles.user}>
        <Image
          // source={require("../assets/images/react-logo.png")}
          source={{
            uri: `https://picsum.photos/1440/2842?random=${[...author].reduce(
              (sum, char) => {
                return sum + char.charCodeAt();
              },
              0
            )}`,
          }}
          style={{ height: 34, width: 34, borderRadius: 17 }}
          // resizeMode="contain"
        />
        {/* <Text>React Native</Text> */}
        <Text style={styles.author} adjustsFontSizeToFit>
          {author
            ?.toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (m: any, chr: string) =>
              chr.toUpperCase()
            )
            .replace(/[()]/g, "")}
        </Text>
      </View>
      {/* Images with horizontal scroll */}
      <View style={styles.postImage}>
        {/* Find id and length of slidelist item and slidelist */}
        <View>
          <FlatList
            data={slideList}
            renderItem={useCallback(({ item }: any) => {
              return (
                <View style={styles.carouselView}>
                  <Image
                    style={{
                      ...styles.carouselImage,
                      width: 0.88 * windowWidth,
                    }}
                    //   resizeMode="contain"
                    source={{ uri: item.image }}
                  />
                </View>
              );
            }, [])}
            horizontal
            pagingEnabled
            onScroll={onScroll}
            {...flatListOptimizationProps}
            // showsHorizontalScrollIndicator={false}
          />
          <View
            style={{
              position: "absolute",
              bottom: "4%",
              // left: "40%",
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            {dotList}
          </View>
        </View>
        {/* Likes count and description */}
        <Pressable
          onPress={() => {
            setLike((like: any) => {
              if (like === "like2") return "like1";
              else return "like2";
            });
          }}
        >
          <AntDesign name={like} size={24} color="black" />
        </Pressable>
        <Text style={styles.description}>
          {/* Energy, and time in right direction reaps maximum rewards. You need to
          determine your future actions. If one can czannel energy in present,
          future would be great.{"\n\n"} */}
          {caption}
          {"\n"}
          <Text style={styles.time}>{new Date().toLocaleString("en-IN")}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "4%",
    paddingVertical: "1%",
    backgroundColor: "#ff0",
  },
  user: { flex: 1, flexDirection: "row" },
  author: { fontWeight: "bold", paddingHorizontal: "4%" },
  postImage: { flex: 4 },
  carouselView: { flex: 1 },
  carouselImage: {
    flex: 1,
    margin: "1%",
    height: 200,
  },
  title: { fontSize: 24 },
  subTitle: { fontSize: 18 },
  description: { padding: "2%", fontWeight: "bold" },
  time: { fontWeight: "300" },
});
