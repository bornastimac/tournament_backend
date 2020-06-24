const { Pool } = require(`pg`)
const pool = new Pool({
    host: `localhost`,
    user: `postgres`,
    password: 'postgres',
    database: 'goldendarts',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})
class Queries {
    async getAll() {
        pool
            .query(`select * from test`)
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async getUser(userId) {
        pool
            .query(`select * from users where id=$1`, [userId])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async registerUser(data) {
        pool
            .query(`insert into users(
                name, surname, gender, date_of_birth, country, region, address, zipcode, email, phone, category, licence, statistics, created_at, user_type, nickname) 
                values($1, $2, $3, $4, $5, $5, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
                [data.name, data.surname, data.gender, data.date_of_birth, data.country, data.region, data.address, data.zipcode, data.email, data.phone, data.category, data.licence, data.statistics, data.created_at, data.user_type, data.nickname])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async updateUser(data, id) {
        pool
            .query(`update users set name=$1, surname=$2, gender=$3, date_of_birth=$4, country=$5, region=$6, address=$7, zipcode=$8, email=$9, phone=$10, category=$11, licence=$12, statistics=$13, created_at=$14, user_type=$15, nickname=$16 where id=$17`,
                [data.name, data.surname, data.gender, data.date_of_birth, data.country, data.region, data.address, data.zipcode, data.email, data.phone, data.category, data.licence, data.statistics, data.created_at, data.user_type, data.nickname, id])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async registerTeam(data) {
        pool
            .query(`insert into teams(type, name, players, captain) values($1, $2, $3, $4)`, [data.type, data.name, data.players, data.captain])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async getTeam(id) {
        pool
            .query(`select * from teams where id=$1`, [id])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async updateTeam(data, id) {
        pool
            .query(`update teams set type=$1, name=$2, players=$3, captain=$4 where id=$5`, [data.type, data.name, data.players, data.captain, id])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async joinTeam(userId, teamId) {
        pool
            .query(`update teams set players=array_append(players, $1) where id=$2`, [userId, teamId])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async registerClub(data) {
        pool
            .query(`insert into clubs(
                    name, players, teams, country, address, location, contact, phone, email, number_of_machines, time_of_start, time_of_end) 
                    values ($1, $2, $3, $4, $5, $5, $7, $8, $9, $10, $11, $12)`, [data.name, data.players, data.teams, data.country, data.address, data.location, data.contact, data.phone, data.email, data.number_of_machines, data.time_of_start, data.time_of_end])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async getClub(id) {
        pool
            .query(`select * clubs where id=$1`, [id])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async updateClub(data, id) {
        pool
            .query(`update clubs set name=$1, players=$2, teams=$3, country=$4, address=$5, location=$6, contact=$7, phone=$8, email=$9, number_of_machines=$10, time_of_start=$11, time_of_end=$12 where id=$13`,
                [data.name, data.players, data.teams, data.country, data.address, data.location, data.contact, data.phone, data.email, data.number_of_machines, data.time_of_start, data.time_of_end, id])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async joinClub(teamId, clubId) {
        pool
            .query(`update clubs set teams=array_append(teams, $1) where id=$2`, [teamId, clubId])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    //TODO: maybe point system is not part of event, rather it should be a part of tournament
    async createEvent(data) {
        pool
            .query(`insert into events(name, organizer, type, point_system) values($1, $2, $3, $4)`)
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async getMatch(matchId, tournamentId) {
        pool
            .query(`select * from matches where match_id=$1 and tournament_id=$2`, [matchId, tournamentId])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async getTeamMatch(matchId, tournamentId) {
        pool
            .query(`select * team_matches where match_id=$1 and tournament_id=$2`, [matchId, tournamentId])
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    async createTournament(chBody, eventId, ownerId) {
        try{
            let res = pool.query(`insert into tournaments(id, challonge_tournament, event_id, owner_id) values($1, $2, $3, $4)`,[chBody.id, chBody, eventId, ownerId ])
            return res
        }
        catch(e){
            console.log(e);
            throw new Error(e)
        }
    }

    //TODO
    async updateMatch(matchId, tournamentId) {
        pool
            .query(`update matches set $`)
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }
    //TODO
    async updateTeamMatch(matchId, tournamentId) {
        pool
            .query(`select * from test`)
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }
    //TODO
    async getTournament(id) {
        
    }

    //TODO
    async startTournament(tournamentId) {
        pool
            .query(`select * from test`)
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }

    //TODO
    async updateTournament(data, tournamentId) {
        pool
            .query(`select * from test`)
            .then(res => { return res.rows[0] })
            .catch(e => { console.log(e); return e })
    }
}

module.exports = Queries