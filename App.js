import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  useWindowDimensions,
  SafeAreaView,
  Platform,
  Image,
  StatusBar,
  Pressable,
  Button,
  Modal,
  ActivityIndicator,
  Alert,
  FlatList,
  SectionList,
  TextInput,
  Switch,
  KeyboardAvoidingView,
} from "react-native";

import movieData from "./data.json";
import CustomButton from "./components/CustomButton/CustomButton.android";
import { useState, useEffect } from "react";
import Box from "./components/Box";

export default function App() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [isPosting, setIsPosting] = useState(false)

  const getData = async (limit) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    );

    const data = await response.json();
    setPostList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData(10);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getData(postList.length + 10);
    setRefreshing(false);
  };

  const handleSubmitPost = async () => {
    setIsPosting(true)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postTitle,
        body: postBody
      })
    })

    const newPost = await response.json()
    setPostList([newPost,...postList])
    setPostBody("")
    setPostTitle("")
    setIsPosting(false)
    setIsModal(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading ? (
        <View style={styles.container}>
          <View>
            <Button title="Create new post" onPress={() => setIsModal(true)} />
            <Modal
              visible={isModal}
              animationType="fade"
              presentationStyle="pageSheet"
            >
                <View
                  style={{
                    flex: 1,
                    padding: 60,
                    backgroundColor: "lightgreen",
                  }}
                >
                  <Text style={styles.modalLabel}> Create new post</Text>
                  <Text style={styles.label}> Title</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your title"
                    value={postTitle}
                    onChangeText={setPostTitle}
                  />
                  <Text style={styles.label}> Body</Text>
                  <TextInput
                    style={styles.bodyInput}
                    placeholder="Enter your body"
                    value={postBody}
                    onChangeText={setPostBody}
                    multiline={true}
                  />
                  <View style={styles.modalFooter}>
                    <Button
                      title={isPosting ? "Adding..." : "Add post"}
                      color="green"
                      onPress={handleSubmitPost}
                    />
                    <Button
                      title="Cancel"
                      color="grey"
                      onPress={() => setIsModal(false)}
                    />
                  </View>
                </View>
            </Modal>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={postList}
              renderItem={({ item }) => {
                return (
                  <View style={styles.card}>
                    <Text style={styles.label}>{item.title}</Text>
                    <Text style={styles.text}>{item.body}</Text>
                    <Text style={styles.text}>{item.id}</Text>
                  </View>
                );
              }}
              ListEmptyComponent={<Text>no data found</Text>}
              ListFooterComponent={
                <Text style={styles.HeaderFooterText}>End of List</Text>
              }
              ListHeaderComponent={
                <Text style={styles.HeaderFooterText}>Post List</Text>
              }
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          </View>
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" color="red" />
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    paddingTop: StatusBar.currentHeight,
  },

  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    margin: 3,
  },

  text: {
    fontSize: 16,
    color: "blue",
  },

  label: {
    fontSize: 20,
  },

  HeaderFooterText: {
    fontSize: 24,
    textAlign: "center",
    margin: 3,
  },

  modalLabel: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },

  bodyInput: {
    height: 100,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },

  modalFooter: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    justifyContent: "space-around",
  },
});
