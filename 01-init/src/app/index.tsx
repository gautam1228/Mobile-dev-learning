import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

export default function Index() {
    const [name, setName] = useState("");
    return (
        <View>
            <Text numberOfLines={2}>
                soluta alias maiores explicabo aliquam accusamus nostrum
                deserunt nobis.
            </Text>

            {/* Remote image from the internet */}
            {/* <Image
                source={{
                    uri: "https://images.pexels.com/photos/3532558/pexels-photo-3532558.jpeg",
                }}
                width={200}
                height={200}
            /> */}

            {/* Local image */}
            <Image
                source={require("@/assets/images/icon.png")}
                style={{
                    height: 200,
                    width: 200,
                }}
                blurRadius={10}
            />

            {/* Text Input */}
            <TextInput
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                placeholderTextColor={"gray"}
                style={{
                    borderWidth: 1,
                    borderColor: "#ddd",
                    marginTop: 10,
                }}
            />

            <Pressable
                // onLongPress={() => alert("Button pressed.")}
                onPress={() => alert("Button pressed.")}
                style={({ pressed }) => ({
                    backgroundColor: pressed ? "#4a42d4" : "#6C63FF",
                })}
            >
                {({ pressed }) =>
                    pressed ? <Text>Pressing...</Text> : <Text>Press me</Text>
                }
            </Pressable>
        </View>
    );
}
