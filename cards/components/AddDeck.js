import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { NavigationActions } from "react-navigation";
import { Button, Input } from 'react-native-elements';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

class AddDeck extends Component {
    state = {
        deckTitle: ''
    }
    submitdeckTitle = () => {
        if(this.state.deckTitle) {
            this.setState({ deckTitle: '' });
            this.props.addDeck(this.state.deckTitle);
        }
        this.props.navigation.dispatch(NavigationActions.back({
            key: "AddDeck"
        }))        
    }
    render() {
        return(
            <View style={styles.container}>
                <Input 
                    textAlign='center'
                    placeholder='Deck Title' 
                    onChangeText={(deckTitle) => this.setState({deckTitle})} 
                    value={this.state.deckTitle}
                />
                <View
                  style={{
                    borderBottomWidth: 30,
                  }}
                />                 
                <Icon
                  onPress={this.submitdeckTitle}
                  name='paper-plane'
                  size={40}
                />               
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDeck: (e) => dispatch(addDeck(e))
    }
}

export default connect(null, mapDispatchToProps)(AddDeck);