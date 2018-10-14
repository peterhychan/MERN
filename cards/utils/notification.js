import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { NOTIFICATION_KEY } from './helper';

export const clearLocalNotification =()=> {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
            .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const createNotification=()=> {
    return {
        title: 'Quiz Time!',
        body: 'Practice makes perfect. Never forget asking youself questions.',
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
        }, 
        ios: {
            sound: true,
        },

    }
}

export const setLocalNotification =()=>{
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(res => {
            if (res === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status })=>{
                        if(status === 'granted'){
                            Notifications.cancelAllScheduledNotificationsAsync();

                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(21);
                            tomorrow.setMinutes(30);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {time: tomorrow ,repeat: 'day'}
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}