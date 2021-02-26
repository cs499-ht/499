make sure you're in the backend directory

create .env file in backend directory with `ATLAS_URI=` remember to change put your password in

`yarn install`

`yarn start` OR `yarn run start`

###
Use Insomnia or Postman to test backend API

### User Routes
Read All Users - GET http://localhost:5000/users/
![all users](./readme_imgs/all_users.png)


Register User - POST http://localhost:5000/users/register
* remember to use JSON body
![add users](./readme_imgs/register_user.png)

### Habit Route
Read All Habits - GET http://localhost:5000/habits/
![all habits](./readme_imgs/all_habits.png)

Read Single Habit - GET http://localhost:5000/habits/{id} 60380bbdb80b6f1fa27c414a
![find habit](./readme_imgs/find_habit.png)

Update Single Habit - POST http://localhost:5000/habits/update/{id} 60380c49c8cf0b2080a746d4
* remember to use JSON body
![update habit](./readme_imgs/update_habit.png)

Delete Single Habit - DELETE http://localhost:5000/habits/{id} (Find one using read all habits first)
![delete habit](./readme_imgs/delete_habit.png)