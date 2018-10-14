import React, { Component } from "react";
import { View, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { setDecks } from '../actions';
import { DECK_STORAGE_KEY } from '../reducers';
import styles from './Styles';
import { Text } from 'react-native-elements';

class DeckList extends Component {
    componentDidMount() {
        AsyncStorage.getItem(DECK_STORAGE_KEY)
            .then(res => {
                this.props.setDecks(res)
            })
    }

    render() {
        const { deckData, navigation } = this.props;
        return(
            <ScrollView>
                {Object.keys(deckData).map((deckTitle, navigation) => {
                    const cardNumber = deckData[deckTitle].questions.length;
                    return (
                    <TouchableOpacity 
                        key={deckTitle} 
                        style={styles.deckStyle} 
                        onPress={() => this.props.navigation.navigate('Deck',{ deckTitle, cardNumber })}
                    >
                        <Text h3>{deckTitle}</Text>
                        <Text h4 style={{ color: '#666' }}>{cardNumber} Qs</Text>
                    </TouchableOpacity>
                )})}
            </ScrollView>
        )
    }
}

const mapStateToProps = ({ deckData }) =>{
    return { deckData }
}

const mapDispatchToProps =(dispatch)=> {
    return {
        setDecks: (e) => dispatch(setDecks(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);