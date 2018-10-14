import {
    SET_DECKS,
    ADD_CARD,
    ADD_DECK
} from './keys';

export const addDeck = deckName => {
    return {
        type: ADD_DECK,
        deckName
    }
}

export const addCard= ({ deckTitle, question, answer }) =>{
    return {
        type: ADD_CARD,
        deckName: deckTitle, 
        question, 
        answer,
    }
}

export const setDecks = decks => {
    return {
        type: SET_DECKS,
        decks
    }
}