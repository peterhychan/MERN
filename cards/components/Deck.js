import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";
import { clearLocalNotification, setLocalNotification } from '../utils/notification'
import styles from './Styles';
import { Button ,Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class Deck extends Component {
    goAddCard = deckTitle => {
        this.props.navigation.navigate('AddCard',{ deckTitle });
    }
    goQuiz = (deckTitle, cardNum) => {
        clearLocalNotification().then(setLocalNotification);
        this.props.navigation.navigate('Quiz', { deckTitle, cardNum})
    };
    render() {
        const { deckTitle } = this.props.navigation.state.params;
        const cardNum = this.props.deckData[deckTitle].questions.length;
        return(
            <View style={styles.container}>
                <Text h3 style={styles.title}>{deckTitle}</Text>
                <Text h4>{cardNum} Questions</Text>
                <View
                  style={{
                    borderBottomWidth: 30,
                  }}
                />
                <Icon
                    onPress={() => this.goAddCard(deckTitle)} 
                    name='plus-square'
                    size={50}
                    style={{textAlign:'center'}}
                />
                <View
                  style={{
                    borderBottomWidth: 30,
                  }}
                />
                    {cardNum > 0 && 
                        (<Icon 
                            onPress={() => this.goQuiz(deckTitle, cardNum)}
                            name='check-square-o'
                            size={50}
                            style={{textAlign:'center'}}                            
                        />)
                    }
            </View>
        )
    }
}

function mapStateToProps (state) {
    return state
}

export default connect(mapStateToProps)(Deck);