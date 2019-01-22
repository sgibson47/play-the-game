# Play The Game

## How to get Play The Game up & running

### download this entire directory

`git clone git@github.com:sgibson47/play-the-game.git`

### get backend up & running

The backend for Play The Game is held in a folder called 'play-the-game-api' in the directory you just downloaded.

#### open a terminal window & navigate to /play-the-game/play-the-game-api

run `cd <wherever you stored the app>/play-the-game/play-the-game-api`

#### create a local database

run `rake db:migrate`

#### start up backend

run `rails s -p 3001`

`rails s` launches a web server and will give you access to the application through a web browser. `-p 3001` tells the web server to serve up the application at the 3001 port instead of the default 3000.  

Make sure to add the -p option because this application relies on the backend being ported to 3001 while the frontent uses the default 3000. 

### get the frontend up and running

#### open a terminal window & navigate to /play-the-game/play-the-game-client

run `cd <wherever you stored the app>/play-the-game/play-the-game-client`

#### run the app

run `npm start`

This will run the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the app in the browser and start playing The Game.


If you've got 

