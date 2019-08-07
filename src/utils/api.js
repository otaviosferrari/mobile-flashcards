import { AsyncStorage } from 'react-native';
import { setInitialData, FLAHSCARDS_STORAGE_KEY } from './helpers';

export async function getDeck(id) {
    try {
        const results = await AsyncStorage.getItem(FLAHSCARDS_STORAGE_KEY)
        if (results !== null) {
            const data = await JSON.parse(results);
            return data[id];
        } else {
            console.log('AsyncStorage getItem() returned null')
        }
    } catch (err) {
        console.log(err.message)
    }
}

export async function getDecks() {
    try {
        await AsyncStorage.removeItem(FLAHSCARDS_STORAGE_KEY);
        const results = await AsyncStorage.getItem(FLAHSCARDS_STORAGE_KEY);
        console.log('inside getDecks,  results = ', results)
        let data;

        if (results !== null) {
            data = await JSON.parse(results);
        } else {
            data = await setInitialData();
        }
        return data;
    } catch (err) {
        console.log(err.message)
    }
}

export async function saveDeckTitle(title) {
    try {
        await AsyncStorage.mergeItem(FLAHSCARDS_STORAGE_KEY, JSON.stringify({
            [title]: {
                title,
                questions: []
            }
        }));
    } catch (err) {
        console.log(err.message)
    }
}

export async function addCardToDeck(title, card) {
    const deck = await getDeck(title);
    const updatedQuestions = [...deck.questions, card];

    try {
        await AsyncStorage.mergeItem(FLAHSCARDS_STORAGE_KEY, JSON.stringify({
            [title]: {
                title,
                questions: updatedQuestions,
            }
        }));
    } catch (err) {
        console.log(err.message)
    }
}