export default function App() {
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
  
    return (
      
      <SafeAreaView style={styles.safeContainer}>
        
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
          <View style={styles.form}>
            <Image
              source={{ uri: "https://picsum.photos/100" }}
              style={styles.image}
            />
            <Text style={styles.label}>User Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUserName}
            />
  
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
  
            <Button
              title="Login"
              onPress={() => alert(username + password)}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  
    safeContainer: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
      backgroundColor: "pink",
    },
  
    form: {
      backgroundColor: "#f5f5f5",
      padding: 20,
      borderRadius: 10,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  
    label: {
      fontSize: 15,
      marginBottom: 5,
      fontWeight: "bold",
    },
  
    input: {
      height: 40,
      borderColor: "#ddd",
      borderWidth: 1,
      marginBottom: 15,
      padding: 10,
      borderRadius: 5,
    },
  
    image: { width: 100, height: 100, alignSelf: "center" },
  });