import React, { Component } from 'react';
import { View } from 'react-native';
import { Input , Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import { addCard } from '../actions';


class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    }
    pushCard = () => {
        const { question, answer } = this.state;
        if(question && answer) {
            this.setState({ question, answer });
            this.props.addCard({ 
                deckTitle: this.props.navigation.state.params.deckTitle, 
                question, 
                answer 
            });
        }
        this.props.navigation.dispatch(NavigationActions.back({}))
    }

    render() {
        return(
            <View style={styles.container}>
                <Input 
                    leftIcon={{ type: 'font-awesome', name: 'question-circle' }}
                    textAlign='center' 
                    placeholder='Question' 
                    onChangeText={(question) => this.setState({question})} 
                    value={this.state.question}
                />
                <View
                  style={{
                    borderBottomWidth: 30,
                  }}
                /> 
                <Input 
                    leftIcon={{ type: 'font-awesome', name: 'pencil-square' }}
                    textAlign='center' 
                    placeholder='Answer'
                    onChangeText={(answer) => this.setState({answer})} 
                    value={this.state.answer}/>
                <View
                  style={{
                    borderBottomWidth: 30,
                  }}
                /> 
                <Icon
                  onPress={this.pushCard}
                  name='paper-plane'
                  size={40}
                /> 
            </View>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addCard: (e) => dispatch(addCard(e))
    }
}

export default connect(null, mapDispatchToProps)(AddCard);