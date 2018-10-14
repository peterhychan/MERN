import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
    },
    noFlexContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerToggler: {
        color: 'red',
        fontWeight: 'bold',
    },
    deckStyle: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderRadius: 40,
    }  
})