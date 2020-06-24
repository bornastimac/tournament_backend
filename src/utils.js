const fetch = require('node-fetch')

class Utils {

    async destroyTournament(tournamentId){
        let res = await fetch(`${process.env.CHALLONGE}/tournaments/${tournamentId}.json`,
        { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body:JSON.stringify({api_key: process.env.CHALLONGE_API_KEY})})
        .catch(e => console.log(e))
        console.log(res)
    }

    async destroyAllTournaments(tournamentIds){
        tournamentIds.forEach(id => {
            this.destroyTournament(id)
        });
    }
}

module.exports = Utils