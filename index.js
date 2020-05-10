const queries = require('./queries')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express();

process.on('unhandledRejection', (reason, p) => {//REMOVE from prod
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
})

app.get('/users/userId', (req, res) => {
  return res.send('Received a GET HTTP method');
});
 
app.post('/users/register', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.post('/users/updateUser/userID', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.post('/teams/register', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.get('/teams/teamID', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/teams/updateTeam/teamId', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.post('/users/joinTeam', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.post('/clubs/register', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.get('/clubs/clubID', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/clubs/updateClub/clubID', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.post('/teams/joinClub', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.post('/events/create', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.post('/events/createTournament/eventID', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.get('/events/tournaments/tournamentID', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/events/updateTournament/tournament', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.get('/events/tournaments/matchID', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/events/tournaments/updateMatch', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/events/tournaments/startTournament', (req, res) => {
    return res.send('Received a GET HTTP method');
});


app.listen(process.env.PORT, () =>
console.log(`Server listening on port ${process.env.PORT}!`),
);