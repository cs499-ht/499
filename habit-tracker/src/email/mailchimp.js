import mailchimp from "@mailchimp/mailchimp_marketing";
import './loadEnv.js'

const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
const API_KEY = process.env.MAILCHIMP_API_KEY
const SERVER_ID = process.env.MAILCHIMP_SERVER_ID
mailchimp.setConfig({
  apiKey: API_KEY,
  server: SERVER_ID,
});

const run = async () => {
  try {
    const response = await mailchimp.lists.getListMembersInfo(AUDIENCE_ID);
    let memberListFromResponse = response['members']
    let emailList = []
    memberListFromResponse.forEach(member => {
      emailList.push(member['email_address'])
    });
    return emailList
  } catch (e) {
    console.log(e)
  }
};

export let emailList = await run();