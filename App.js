import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { search } from "./api";

export default function App() {
  const [postcode, setPostcode] = useState("SW1A1AA");
  const [searchResults, setSearchResults] = useState({ name: "", address: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    search(postcode)
      .then((data) => {
        console.log("Reached then");
        setSearchResults((curr) => {
          return data;
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error in handleSearch, ", err);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={postcode}
        onChangeText={(text) => {
          console.log("postcode changed to: " + text);
          setPostcode(text);
        }}
      ></TextInput>
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {isLoading && <ActivityIndicator size="large" color="#00ff00" />}
      <Text>{searchResults.error}</Text>
      <Text>{searchResults.name}</Text>
      <Text>{searchResults.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#24a0ed",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    borderColor: "#2B2D42",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
