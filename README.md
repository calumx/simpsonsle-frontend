# Simpsonsle

Simpsonsle is a Wordle-clone guessing game. Name the golden-era Simpsons episode (S3-S9) from a gradually revealed image. You are viewing the README for the frontend.

## Installation

Note: you'll need to run the [backend](https://github.com/calumx/simpsonsle-backend) first.

Create a .env file at the project root with the variable "REACT_APP_EPISODE_ROUTE" set to whatever your local "fetch episode" route, e.g.

```
http://localhost:5001/get-episode
```

Then

```
npm install
npm start
```
