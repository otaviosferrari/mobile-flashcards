import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export const FLAHSCARDS_STORAGE_KEY = 'Flashcards:decks';
export const NOTIFICATION_KEY = 'Flashcards:notifications';

export async function setInitialData() {
    const initialData = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
    };

    try {
        await AsyncStorage.setItem(FLAHSCARDS_STORAGE_KEY, JSON.stringify(initialData));
        return initialData;
    } catch (error) {
        console.log(err.message)
    }
}

export async function clearLocalNotification() {
    try {
        await AsyncStorage.removeItem(NOTIFICATION_KEY);
    } catch (error) {
        console.log(err.message)
    }
    return Notifications.cancelAllScheduledNotificationsAsync();
}

function createNotification() {
    return {
        title: 'Remember your goals!',
        body: "👋 don't forget to study using Flashcards App today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(18);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            );

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
            }
        })
}