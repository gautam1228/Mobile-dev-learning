import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
    const [data, setData] = useState("");

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
