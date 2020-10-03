import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "flex-start", 
        alignItems: "center", 
        backgroundColor: '#FFF',
        paddingTop: 100,
        paddingHorizontal: 10
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
    },

    views: {
        width: "100%",
        height: "50%",
        backgroundColor: "rgba(55, 55, 55, 0.8)"
    }
})