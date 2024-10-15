import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Markdown from "react-native-markdown-display";
import { Ionicons } from "@expo/vector-icons";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ChatBot = () => {
  const [userQuery, setUserQuery] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [generating, setGenerating] = useState(false);

  const bujjiresponse = async (userQuery) => {
    console.log("------------Bujji AI-------------");

    const apiKey = "AIzaSyA-A_IPZW8YonSqF1krVvnQJekwpVjb6nM";
    if (!apiKey) {
      console.error("API Key is missing");
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const res = await model.generateContent(userQuery);
      console.log("UQ", userQuery);
      console.log("BR", res.response.text());
      return res.response.text();
    } catch (error) {
      console.error("Error generating content:", error);
      return null;
    }
  };

  const handleAsk = async () => {
    setGenerating(true);
    const response = await bujjiresponse(userQuery);
    setBotResponse(response);
  };
  const clear = () => {
    setUserQuery("");
    setBotResponse("");
    setGenerating(false);
  };

  return (
    <View style={styles.chatBotContainer}>
      <Text style={styles.logoText}>
        <Ionicons name="logo-wechat" size={30} color={'#d7ca17e6'}/> Bujji AI <Ionicons name="logo-wechat" size={30} color={'#d7ca17e6'}/>
      </Text>


      <ScrollView style={styles.aiResponseContainer}>
        {generating && (
          <>
            <Text style={styles.userName}>
              <Ionicons name="person" size={35} />
            </Text>
            <Text style={styles.userText}>{userQuery}</Text>
            {botResponse ? (
              <>
                <Text style={styles.botText}>
                  <Ionicons name="logo-octocat" size={35} />
                </Text>
                <Markdown style={styles.markdown}>{botResponse}</Markdown>
              </>
            ) : (
              <Text style={styles.botText}>
                Bujji Generating Response for You
              </Text>
            )}
          </>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        {botResponse == "" ? (
          <>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Your Query"
              value={userQuery}
              onChangeText={setUserQuery}
            />
            <TouchableOpacity style={styles.askButton} onPress={handleAsk}>
              <Text style={styles.askButtonText}>
                <Ionicons name="send" size={22} color={"white"} />
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.askButton} onPress={clear}>
            <Text style={styles.askButtonText}>New Query</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  chatBotContainer: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
    minHeight: "100%",
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
    width: "95%",
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 20,
  },
  aiResponseContainer: {
    width: "95%",
    backgroundColor: "#ececec",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexGrow: 1,
    maxHeight: "78%",
  },
  markdown: {
    color: "#333333",
    fontSize: 10,
  },
  userName: {
    color: "#9b3333",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  userText: {
    color: "#000000",
    fontSize: 16,
    marginBottom: 25,
  },
  botText: {
    color: "#4CAF50",
    fontSize: 16,
    marginBottom: 2,
    fontWeight: "bold",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    bottom: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 40,
  },
  askButton: {
    marginLeft: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  askButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
