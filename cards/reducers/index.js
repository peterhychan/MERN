import { SET_DECKS, ADD_DECK, ADD_CARD } from "../actions/keys";
import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY } from '../utils/helper';

const deckData = {
    Economics: {
      title: 'Economics',
      questions: [
        {
          question: 'What is Economics?',
          answer: 'The branch of knowledge concerned with the production, consumption, and transfer of wealth.'
        },
        {
          question: 'What is Opportunity Cost ?',
          answer: 'The highest value option forgone.'
        }
      ]
    },
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is a React?',
          answer: 'One of the modern JS Front-end Frameworks.'
        },
        {
          question: 'React is maintained and supported by which company?',
          answer: 'Facebook'
        },
        {
          question: 'Difference React and Redux.',
          answer:'React is a JS framework for building user interfaces, while is latter is for managing application state.'
        }
      ]
    },
    HongKong: {
      title: 'HongKong',
      questions: [
        {
          question: 'What is a Hong Kong ?',
          answer: 'Part of China.'
        }
      ]
    }
};

const decks = (state = { deckData }, action ) =>{
    const { decks, deckName, question, answer } = action
    let deckData = {
        ...state.deckData
    };
    switch (action.type) {
        case SET_DECKS:
            if(decks){
                return JSON.parse(decks);
            } else {
                return state;
            }
        case ADD_DECK:
            deckData[deckName] = {title: `${deckName}`, questions: []}
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({deckData}));
            return {deckData};
        case ADD_CARD:
            const questions = [
                ...deckData[deckName].questions
            ]
            questions.push({ question, answer })
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({deckData: {...deckData, [deckName]: {...deckData[deckName], questions}}}));
            return {deckData: {...deckData, [deckName]: {...deckData[deckName], questions}}};
        default :
            return state
    }
}

export default decks;