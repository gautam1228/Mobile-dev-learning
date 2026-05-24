import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, Paths } from "expo-file-system";
import * as SecureStore from "expo-secure-store";
import * as SQLite from "expo-sqlite";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Creates db if it doesn't exist
const db = SQLite.openDatabaseSync("demo.db");

export default function Index() {
    const [output, setOutput] = useState("");
    const [fileOutput, setFileOutput] = useState("");
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

    const demoFile = new File(Paths.document, "demo.txt");

    const writeFile = async () => {
        try {
            demoFile.write("Hello expo file system");
        } catch (error) {
            console.log(error);
        }
    };

    const readFile = async () => {
        const data = await demoFile.text();

        setFileOutput(data);
        return data;
    };

    const appendFile = async () => {
        const oldData = await readFile();

        demoFile.write(oldData + "\n This is new data.");
    };

    const copiedFile = new File(Paths.document, "copy-demo.txt");

    const copyFile = async () => {
        demoFile.copy(copiedFile);

        setFileOutput("File copied successfully.");
    };

    return (
        <View style={styles.container}>
            <Text>Data-Storage And Offline Support Demo</Text>
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
