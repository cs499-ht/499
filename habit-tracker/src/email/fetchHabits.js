import fetch from "node-fetch";

const fetchHabits = async () => {
  const res = await fetch("http://localhost:5000/habits");
  const data = await res.json();
  return data;
};
const habits = await fetchHabits()

export const fetchFilteredHabits = (emailFromMailchimp) => {
    const filtered = habits.reduce(
    (result, { _id, username, email, description, totalCount, completed }) =>
        email.toLowerCase() === emailFromMailchimp.toLowerCase()
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
    let username = filtered[0]['username']
    username = username[0].toUpperCase() + username.slice(1)
    let habitList = [username]
    filtered.forEach(habit => {
        habitList.push(habit['description'])
    }); 
    return habitList
    //["John", 'Do 3 push-ups", "Fix 3 bugs"....]
}