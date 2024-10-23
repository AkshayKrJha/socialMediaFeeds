import ImagePickerExample from "@/components/ImagePicker";
import { addPost } from "@/store/reducer/postReducer";
import { store } from "@/store/store";
import { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function Post() {
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [keyboardActive, setKeyboardActive] = useState<any>(false);
  const [image, setImage] = useState<string | null>(null);
  function submit() {
    // validate entries
    // add post to user post list
    store.dispatch(addPost({ title, description, image }));
    setTitle("")
    setDescription("")
    setImage(null)
  }
  function titleValidity(title: any) {
    return /^[a-zA-Z0-9_]+$/.test(title);
  }
  function descriptionValidity(description: any) {
    if (description) return true;
    return false;
  }
  function isDisabled() {
    return !(titleValidity(title) && descriptionValidity(description) && image);
  }
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardActive(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardActive(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <View style={styles.root}>
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
      <TextInput
        style={styles.title}
        maxLength={40}
        placeholder="Enter title here..."
        value={title}
        error={title && !titleValidity(title)}
        onChangeText={(text: any) => {
          setTitle(text);
        }}
      />
      <TextInput
        style={styles.description}
        placeholder="Enter description here..."
        multiline
        maxLength={280}
        numberOfLines={6}
        value={description}
        onChangeText={(text: any) => {
          setDescription(text);
        }}
        // error={!descriptionValidity(description)}
      />
      {!keyboardActive && (
        <ImagePickerExample image={image} setImage={setImage} />
      )}
      <Pressable
        style={{ ...styles.submit, opacity: isDisabled() ? 0.5 : 1 }}
        onPress={submit}
        disabled={isDisabled()}
      >
        <Text style={styles.submitText}>Post</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: "space-evenly" },
  title: { padding: "2%" },
  description: {
    padding: "2%",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  submit: { backgroundColor: "#ff0", padding: "3%", marginHorizontal: "5%" },
  submitText: { textAlign: "center" },
});
