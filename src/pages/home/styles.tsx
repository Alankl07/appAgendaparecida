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

    views: {
        backgroundColor: "#87CEFA",
        width: "100%",
        height: 230,
        padding: 10,
        justifyContent: "space-between",
        marginTop: 10
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
    },

    titleText:{
        fontSize: 18,
        fontWeight: "bold"
    },  

    texts: {
        fontSize: 18,
    }
})