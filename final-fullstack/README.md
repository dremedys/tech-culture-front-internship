Final testing app
Created full stack app using
For front-end:
React Redux, thunk,axios
For back-end:
Django,DRF
DataBase: postgres

Functionalities:
Login/register JWT
Create a post(with an image), view feed, view user profile
Edit user profile,avatar
View/leave comment to a  post, like a comment, etc.

To run the app:
- clone the repo

Go to final_backend and type:
pip install -r requirements.txt

As we use Postgres, you need to create database
Open psql and type:
> CREATE DATABASE final;
> CREATE USER me WITH PASSWORD 'password';
> ALTER ROLE me SET CLIENT_ENCODING 'utf-8';
> ALTER ROLE me SET DEFAULT_TRANSACTION_ISOLATION to 'read committed';
> ALTER ROLE me SET timezone to 'UTC';
> GRANT ALL PRIVILEGES ON final TO me;

Run Django server: 
> python manage.py runserver

Go to final-front folder and type:
> npm install

Run React app:
> npm start
