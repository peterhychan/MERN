import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import AddCard from './components/AddCard';
import { setLocalNotification } from './utils/notification'

const store = createStore(reducer);

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='th-list' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square-o' size={30} color={tintColor} />
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Decks'
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: 'Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz Time!'
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card'
    }
  },
})

export default class App extends Component {
  componentDidMount(){
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={ store }>
        <View style={{flex:1}}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
