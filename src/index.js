const express = require('express')
var cors = require('cors')
const dotenv = require('dotenv')
const fetch = require('node-fetch')
const { uuid } = require('uuidv4');
const Queries = require('./queries')
const q = new Queries()
const Utils = require('./utils')
const u = new Utils()
dotenv.config()

const app = express();
app.use(express.json())
app.use(cors())
process.on('unhandledRejection', (reason, p) => {//REMOVE from prod
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
})

app.get('/users/userId', async (req, res) => {
    let pgres = await q.getUser(req.userId)
    return res.send(pgres);
});

app.post('/users/register', async (req, res) => {
    let pgres = await q.registerUser(req.body)
    return res.send(pgres);
});

app.post('/users/updateUser/userID', async (req, res) => {
    let pgres = await q.updateUser(req.body.data, req.body.id)
    return res.send(pgres);
});

app.post('/teams/register', async (req, res) => {
    let pgres = await q.registerTeam(req.body)
    return res.send(pgres);
});

app.get('/teams/teamID', async (req, res) => {
    let pgres = await q.getTeam(req.body)
    return res.send(pgres);
});

app.post('/teams/updateTeam/teamId', async (req, res) => {
    let pgres = await q.updateTeam(req.body.data, req.body.id)
    return res.send(pgres);
});

app.post('/users/joinTeam', async (req, res) => {
    let pgres = await q.joinTeam(req.body.userId, req.body.teamId)
    return res.send(pgres);
});

app.post('/clubs/register', async (req, res) => {
    let pgres = await q.registerClub(req.body)
    return res.send(pgres);
});

app.get('/clubs/clubID', async (req, res) => {
    let pgres = await q.getClub(req.body)
    return res.send(pgres);
});

app.post('/clubs/updateClub/clubID', async (req, res) => {
    let pgres = await q.updateClub(req.body.data, req.body.id)
    return res.send(pgres);
});

app.post('/teams/joinClub', async (req, res) => {
    let pgres = await q.joinClub(req.body.teamId, req.body.clubId)
    return res.send(pgres);
});

app.post('/events/create', async (req, res) => {
    let pgres = await q.createEvent(req.body)
    return res.send(pgres);
});


/*{
 	"event_id": number,
    "owner_id": number,
 	"name": string,
 	"tournament_type":"single elimination" || "double elimination",
 	"hold_third_place_match": boolean,
 	"signup_cap": number
 }*/

app.post('/createTournament', async (req, res) => {
    let chReqBody = {
        api_key: process.env.CHALLONGE_API_KEY,
        tournament: {
            name: req.body.name,
            tournament_type: req.body.tournament_type,
            hold_third_place_match: req.body.hold_third_place_match,
            signup_cap: req.body.signup_cap,
            private: "true",
            url: uuid().replace(/-/gi, "_"),
        }
    }

    let r = await fetch(`${process.env.CHALLONGE}/tournaments.json`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(chReqBody) })
    let chRes = await r.json()
    if (chRes.errors) return res.status(r.status).send(chRes.errors)
    else if (r.status === 200) {
        try {
            await q.createTournament(chRes.tournament, req.body.event_id, req.body.owner_id)
            return res.status(r.status).send(chRes.tournament)
        }
        catch (e) {
            await u.destroyTournament(chRes.tournament.id)
        }
    }
});

app.get('/tournaments', async (req, res) => {
    let r = await fetch(`${process.env.CHALLONGE}/tournaments.json?api_key=${process.env.CHALLONGE_API_KEY}`)
    let tournaments = await r.json()
    return res.send(tournaments)
})

app.post('/bulkAddParticipants', async (req, res) => {
    let body = {
        api_key: process.env.CHALLONGE_API_KEY,
        participants: req.body.participants
    }
    console.log(body)
    let r = await fetch(`${process.env.CHALLONGE}/tournaments/${req.body.tournamentId}/participants/bulk_add.json`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
    let jsonres = await r.json()
    console.log(jsonres)
    return res.send(jsonres)
})

app.get('/showTournament', async (req, res) => {
    let r = await fetch(`${process.env.CHALLONGE}/tournaments/${req.query.id}.json?api_key=${process.env.CHALLONGE_API_KEY}`)
    let tourRes = await r.json()
    return res.send({ link: tourRes.tournament.live_image_url })
})

app.get('/events/tournaments', async (req, res) => {
    let pgres = await q.getTournament(req.body)
    return res.send(pgres);
});

//TODO
app.post('/events/updateTournament/tournament', async (req, res) => {
    let pgres = await q.registerUser(req.body)
    return res.send(pgres);
});

app.get('/events/tournaments/matchID', async (req, res) => {
    let pgres = await q.getMatch(req.body.matchId, req.body.tournamentId)
    return res.send(pgres);
});

//TODO
app.post('/declareWinner', async (req, res) => {
    let body = {
        api_key: process.env.CHALLONGE_API_KEY,
        match: {
            winner_id: req.body.winnerId,
            scores_csv: req.body.score
        }
    }
    let r = await fetch(`${process.env.CHALLONGE}/tournaments/${req.body.tournamentId}/matches/${req.body.matchId}.json`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
    let jsonres = await r.json()
    return res.send(jsonres)
});

app.post('/startTournament', async (req, res) => {
    let body = {
        api_key: process.env.CHALLONGE_API_KEY,
        include_participants: "1",
        include_matches: "1"
    }
    let r = await fetch(`${process.env.CHALLONGE}/tournaments/${req.body.tournamentId}/start.json`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
    let tourRes = await r.json()
    return res.send(tourRes);
    //challonge start tournament
});

app.get('/getMatches', async (req, res) => {
    let res = await fetch(`${process.env.CHALLONGE}/tournaments/${req.body.tournamentId}/matches.json`)
    let matches = await res.json();
    return res.send(matches)
})

app.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}!`),
);