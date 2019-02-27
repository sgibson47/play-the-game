# Play The Game

### React & Redux Portfolio Project

## About 

This app was created to practice using React, Redux and Rails to develop web applications.

It uses a Rails API backend and a React frontend to let you play rounds of The Game. You can create a new game to play or play a previously started game. 

## Demo

Check out a short demo [here](https://www.youtube.com/watch?v=My73HaJEukI).

## Usage

### download this entire directory

`git clone git@github.com:sgibson47/play-the-game.git`

### get backend up & running

From the play-the-game directory:
run `bundle install`

run `rake db:migrate`

run `rails s -p 3001`

`rails s` launches a web server and will give you access to the application through a web browser. `-p 3001` tells the web server to serve up the application at the 3001 port instead of the default 3000.  

Make sure to add the -p option because this application relies on the backend being ported to 3001 while the frontend uses the default 3000. 

### get the frontend up and running

Move into the frontend:
run `cd ../play-the-game-client`

get it running:
run `npm install`

run `npm start`

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser and start playing The Game.

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/sgibson47/play-the-game](https://github.com/sgibson47/play-the-game).


## License

The app is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT)

