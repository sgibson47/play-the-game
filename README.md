# Play The Game

### React & Redux Portfolio Project

## About 

This app was created to practice using React, Redux and Rails to develop web applications.

It lets you play rounds of The Game. You can create a new game to play or play a previously started game. 

## Demo

Check out a short demo [here](https://www.youtube.com/watch?v=My73HaJEukI).

## Usage

### download this entire directory

`git clone git@github.com:sgibson47/play-the-game.git`

### get backend up & running

The backend for Play The Game is held in a folder called 'play-the-game-api' in the directory you just downloaded.

run `cd <wherever you stored the app>/play-the-game/play-the-game-api`

run `bundle install`

run `rake db:migrate`

run `rails s -p 3001`

`rails s` launches a web server and will give you access to the application through a web browser. `-p 3001` tells the web server to serve up the application at the 3001 port instead of the default 3000.  

Make sure to add the -p option because this application relies on the backend being ported to 3001 while the frontent uses the default 3000. 

### get the frontend up and running

run `cd <wherever you stored the app>/play-the-game/play-the-game-client`

run `npm install`

run `npm start`

This will run the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the app in the browser and start playing The Game.

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/sgibson47/play-the-game](https://github.com/sgibson47/play-the-game).


## License

The app is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT)

