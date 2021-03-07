make sure you're in the backend directory

create .env file in backend directory with `ATLAS_URI=` remember to change put your password in

`yarn install`

`yarn start` OR `yarn run start`

###

Use Insomnia or Postman to test backend API

### User Routes

![user schema](./readme_images/user_schema.png)

Read All Users - GET http://localhost:5000/users/
![all users](./readme_images/all_users.png)

Register User - POST http://localhost:5000/users/register

- remember to use JSON body

![register users](./readme_images/register_user.png)

Login User - POST http://localhost:5000/users/Login

- remember to use JSON body

![add users](./readme_images/login_user.png)

Delete User - DELETE http://localhost:5000/users/register

- remember to use JSON body

![delete users](./readme_images/delete_user.png)

### Habit Routes

![habit schema](./readme_images/habit_schema.png)

Read All Habits - GET http://localhost:5000/habits/

![all habits](./readme_images/all_habits.png)

Add Habit - GET http://localhost:5000/habits/add

![add habit](./readme_images/add_habit.png)

Read Single Habit - GET http://localhost:5000/habits/{id}

![find habit](./readme_images/find_habit.png)

Update Single Habit - POST http://localhost:5000/habits/update/{id}

- remember to use JSON body

![update habit](./readme_images/update_habit.png)

Delete Single Habit - DELETE http://localhost:5000/habits/{id} (Find one using read all habits first)

![delete habit](./readme_images/delete_habit.png)
