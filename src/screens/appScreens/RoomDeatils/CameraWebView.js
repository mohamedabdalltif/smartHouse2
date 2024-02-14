// Import necessary components
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// Create your component
const CameraWebView = ({ route }) => {
    // useEffect(() => {
    //     console.log(route?.params?.psdata?.link)
    // }, [])
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: route?.params?.psdata?.link }} // Replace with your desired URL
                style={styles.webview}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});

export default CameraWebView;
