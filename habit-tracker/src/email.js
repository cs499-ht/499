import fetch from "node-fetch";
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: "827408e284bacaf39ae28cd44bab68b5-us1", 
  server: "us1",
});

// async function run() {
//   try{
//     const response = await mailchimp.ping.get();
//     console.log(response);
//   }
//   catch(e) {
//     console.log(e)
//   }
// }
const run = async () => {
  try {
    const response = await mailchimp.lists.getListMembersInfo("f90547ca4b");
    let memberListFromResponse = response['members']
    let emailList = []
    memberListFromResponse.forEach(member => {
      emailList.push(member['email_address'])
    });
    console.log(emailList);
    return emailList
  } catch (e) {
    console.log(e)
  }
};

let emailList = await run();

const fetchHabits = async () => {
  const res = await fetch("http://localhost:5000/habits");
  const data = await res.json();
  return data;
};

let habits = await fetchHabits()
const filtered = habits.reduce(
  (result, { _id, username, email, description, totalCount, completed }) =>
    email.toLowerCase() === emailList[0].toLowerCase()
      ? result.concat({
          _id,
          username,
          email,
          description,
          totalCount,
          completed,
        })
      : result,
  []
);

let descriptionList = []
filtered.forEach(habit => {
  descriptionList.push(habit['description'])
}); 

console.log("personal habits", descriptionList);