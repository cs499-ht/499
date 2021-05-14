import OpenAI from 'openai-api'
import {fetchWeather} from './weather.js'
import './loadEnv.js'

const API_KEY = process.env.OPENAI_API_KEY; 
const OPENAI = new OpenAI(API_KEY);
const WEATHER = await fetchWeather();

export const fetchGeneratedMessage = async (habitList) => {
    let joinedHabits = 'A - ' + habitList.join(', ') + '.' + "Today\'s\' weather include(s)" + WEATHER + '.'
    let seedPrompt = "This is a prediction on what you should do based on the weather\nA - Do 4 push-ups, write 100 words. Today's weather includes(s) rain. \nP - Based on the weather, we think the rain makes some great ambience for writing!\n###\nA - Do 20 planks, meditate for 5 minutes, eat a fruit. Today's weather include(s) clear sky. \nP  - Based on the weather, we think it's a great day outside, why not take your exercise outside?\n###\nA - Eat a vegetable, do 20 sit-ups, write 4 lines of code. Today's weather include(s) rain.\nP - Based on the weather, we think a rainy day is a great time to get off the couch and do something.\n###\nA - Meditate for 10 minutes, write 50 words, write 10 lines of code. Today's weather include(s) clear sky.\nP - Based on the weather, we think it's a great day to be outside.\n###\nA -  Read 2 pages of any book, Write 10 lines of code, Fix 1 bug. Today's weather include(s) rain.\nP - Based on the weather, we think it's a great day to be indoors working.\n###\n" 
    let prompt = seedPrompt + joinedHabits
    const gptResponse = await OPENAI.complete({
        engine: 'curie',
        prompt: prompt,
        maxTokens: 60,
        temperature: 0.75,
        topP: 1,
        presencePenalty: 0.25,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["###"]
    });
            
    return gptResponse.data['choices'][0]['text']
}