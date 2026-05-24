import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Creates db if it doesn't exist
const db = SQLite.openDatabaseSync("demo.db");

export default function Index() {
    const [output, setOutput] = useState("");
    const [data, setData] = useState("");

    const createTable = () => {
        db.execSync(`
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER    
            )
        `);
    };

    const getUsers = () => {
        const users = db.getAllSync("SELECT * FROM users");

        setOutput(JSON.stringify(users, null, 2));
    };

    const insertData = () => {
        db.runSync("INSERT INTO users (name, age) VALUES (?, ?)", "Gautam", 22);
    };

    // setItem
    const saveData = async () => {
        await AsyncStorage.setItem("user", "Gautam");
    };

    // getItem
    const getData = async () => {
        const value = await AsyncStorage.getItem("user");
        setData(value!);
    };

    // removeItem
    const removeItem = async () => {
        await AsyncStorage.removeItem("user");
        setData("");
    };

    // clearStorage
    const clearStorage = async () => {
        await AsyncStorage.clear();
    };

    // Get all keys
    const keys = async () => {
        const keys = AsyncStorage.getAllKeys();
        console.log(keys);
    };

    // Save multiple keys
    const setMultiKeys = async () => {
        await AsyncStorage.multiSet([
            ["name", "Gautam"],
            ["lastName", "Singh"],
        ]);
    };

    const saveToken = async () => {
        await SecureStore.setItemAsync("token", "securetoken123");
    };

    return (
        <View style={styles.container}>
            <Text>Edit src/app/index.tsx to edit this screen.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
