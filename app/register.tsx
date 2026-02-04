import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Image } from "react-native";
import { useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { signUp } from "../api/auth";


export default function RegisterScreen() {
  const router = useRouter();

  const [username, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async() => {
    if (!username || !fullName || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const res = await signUp({
        username,
        fullName,
        email,
        password,
      });

      if (res.data.success) {
        Alert.alert("Success", "Account created successfully");
        router.replace("/");
      }
    } catch (err: any) {
      console.log("SIGNUP ERROR ", err?.response?.data);

      Alert.alert(
        "Registration Failed",
        err?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
        <View style={styles.card}>

          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Start managing your business with SmartBiz
          </Text>

          <TextInput
            style={styles.input}
            placeholder="`Username"
            value={username}
            onChangeText={setUserName}
          />

          <TextInput
            style={styles.input}
            placeholder="Owners Full Name"
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text style={styles.link} onPress={() => router.push("/")}>
              Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  logo: {
    width: 200,
    height: 60,
    alignSelf: "center",
    resizeMode: "contain",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 24,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 6,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
    color: "#6b7280",
  },
  link: {
    color: "#2563eb",
    fontWeight: "600",
  },
});
