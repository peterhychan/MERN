import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './Styles';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'react-native-elements';
import { clearLocalNotification, setLocalNotification } from '../utils/notification'

class Quiz extends Component {
    state = {
        index: 0,
        showResult: false,
        showAnswer: false,
        correct: 0,
        incorrect: 0,
    }

    displayAnswer = () => {
        if(this.state.showAnswer === false){
            this.setState({ showAnswer:true });
        }else{
            this.setState({ showAnswer:false });
        }
    }

    submitResult = (index, cardNum, title) => {
        this.setState( state => {
            let nextIndex;
            let {correct, incorrect} = this.state;
            let checkShowResult = false;
            if (index  === cardNum -1 ) {
                nextIndex = index;
                checkShowResult = true;
                showAnswer:false;
                clearLocalNotification().then(setLocalNotification)
            } else if (index  < cardNum -1){
                if(title==='correct'){
                    correct = correct+1;
                }else{
                    incorrect = incorrect+1;
                }
                nextIndex = index +1;
                showAnswer:false;
            }
            return {
                ...state,
                showAnswer:false,
                index: nextIndex,
                showResult: checkShowResult,
                correct: correct,
                incorrect: incorrect
            }
        })
    }

    restart = () => this.setState({
            index: 0,
            showAnswer: false,
            showResult: false,
            correct: 0,
            incorrect: 0,
        })
    render() {
        const { deckTitle, cardNum } = this.props.navigation.state.params;
        let { index, showAnswer, showResult, correct, incorrect } = this.state;
        const cardInfo = this.props.deckData[deckTitle].questions[index];
        const { question, answer } = cardInfo;
        return(
            <View style={styles.container}>
                {!showResult && (<View style={styles.container}>
                    {!showAnswer && (<View style={styles.noFlexContainer}>
                        <Text h1>---------</Text>                        
                        <TouchableOpacity onPress={this.displayAnswer}><Text h4 style={styles.answerToggler}>Check Answer</Text></TouchableOpacity>
                        <Text h1>---------</Text>
                        <Text h4>{index + 1}/{cardNum}</Text>
                        <Text h1>---------</Text>
                        <Text h3 style={styles.title}>{question}</Text>
                    </View>)}
                    {showAnswer && 
                    (<View style={styles.container}>
                        <Text h1>---------</Text>
                        <Text h3 style={styles.title}>{answer}</Text>
                        <Text h1>---------</Text>
                        <TouchableOpacity onPress={this.displayAnswer}><Text h4 style={styles.answerToggler}>Return Question</Text></TouchableOpacity>
                    </View>)}
                    <View style={styles.container}>
                        <Icon
                            style={styles.title}
                            onPress={() => { this.submitResult(index, cardNum, "correct")}}
                            name='check'
                            size={50}
                        />
                        <View
                          style={{
                            borderBottomWidth: 30,
                          }}
                        />
                        <Icon
                            onPress={() => this.submitResult(index, cardNum, "incorrect")}   
                            name='times'
                            size={58}
                        />  
                    </View>
                </View>)}
                {showResult && (
                    <View style={styles.container}>
                        <Text h2>Result</Text>
                        <Text h2>-----------</Text>
                        <Text h4>{correct} out of {cardNum}</Text>
                        <Text h4>{incorrect} Qs wrong</Text>
                        <Text h2>-----------</Text>
                        <Icon
                          onPress={this.restart}
                          name='repeat'
                          size={40}
                        /> 
                        <View
                          style={{
                            borderBottomWidth: 30,
                          }}
                        /> 
                        <Icon
                          onPress={() => this.props.navigation.navigate('Deck',{ deckTitle, cardNum })}
                          size={40}
                          name='arrow-left'
                        />
                    </View>
                )}
            </View>
        )
    }
}

const mapStateToProps =(state)=> {
    return state
}

export default connect(mapStateToProps)(Quiz);