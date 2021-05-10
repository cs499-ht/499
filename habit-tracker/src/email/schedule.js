import cron from "node-cron"
import {sendEmail} from './email.js'
import {fetchWeather} from './weather.js'
import {fetchFilteredHabits} from './fetchHabits.js'
import {fetchGeneratedMessage} from './message.js'
import {emailList} from './mailchimp.js'

const SUBJECT = 'Habit Tracker | Your Daily Reminder';
const WEATHER = await fetchWeather();

for (const EMAIL of emailList){
    let HABITS = fetchFilteredHabits(EMAIL)
    let USERNAME = HABITS[0]
    let MESSAGE = await fetchGeneratedMessage(HABITS);
    try {
        sendEmail(USERNAME, HABITS.slice(1), WEATHER, EMAIL, SUBJECT, MESSAGE.slice(5))
    } catch (e) {
        console.log(e)
    }
};

// cron.schedule('* * * * *', () => {
// });