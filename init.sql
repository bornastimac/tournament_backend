CREATE TABLE users(
    id serial PRIMARY KEY,
    name VARCHAR (50) NOT NULL, 
    surname VARCHAR (50) NOT NULL,
    gender VARCHAR (50) NOT NULL,
    date_of_birth DATE NOT NULL,
    country VARCHAR(50),
    region VARCHAR(255),
    address VARCHAR(50),
    zipcode VARCHAR(255),
    email VARCHAR (355) UNIQUE NOT NULL,
    phone varchar(255),
    category varchar(2),
    licence varchar(255),
    statistics varchar(255),
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    user_type VARCHAR(255),
    nickname VARCHAR(255)
)

CREATE TABLE teams(
    id serial PRIMARY KEY,
    type INTEGER NOT NULL,
    name VARCHAR(255),
    players INTEGER[],
    captain INTEGER REFERENCES users(id)
)

CREATE TABLE clubs(
    id serial PRIMARY KEY,
    name VARCHAR(255),
    players INTEGER[],
    teams TEXT[],
    country VARCHAR(255),
    address VARCHAR(255),
    location VARCHAR(255),
    contact VARCHAR(255),
    phone  VARCHAR(255),
    email VARCHAR(255),
    number_of_machines INTEGER,
    time_of_start DATE,
    time_of_end DATE
)

CREATE TABLE events(
    id serial PRIMARY KEY,
    name VARCHAR(255),
    organizer VARCHAR(255),
    type VARCHAR(255),
    point_system VARCHAR(255)
)

CREATE TABLE tournaments(
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    completed_at DATE,
    checkin_start_at DATE NOT NULL,
    checkin_end_at DATE NOT NULL,
    maximum_participants INTEGER,
    private BOOLEAN,
    point_system VARCHAR(255),
    state VARCHAR(255),
    type VARCHAR(255),
    torunament_type VARCHAR(255),
    description VARCHAR(255),
    updated_at DATE,
    participants TEXT[],
    match_sheet_type VARCHAR(255),
    third_place_match BOOLEAN,
    final_modifier VARCHAR(255),
    starts_at DATE,
    matchmaking_type VARCHAR(255),
    event INTEGER REFERENCES event(id),
    owner VARCHAR(255)
)

CREATE TABLE team_matches(
    id serial PRIMARY KEY,
    created_at DATE,
    team1_id INTEGER REFERENCES teams(id),
    team2_id INTEGER REFERENCES teams(id),
    state VARCHAR(255),
    tournament INTEGER REFERENCES tournament,
    winner_id INTEGER REFERENCES teams(id),
    machine_id INTEGER,
    round VARCHAR(255)
)

CREATE TABLE matches(
    id serial PRIMARY KEY,
    created_at DATE,
    player1_id INTEGER REFERENCES users(id),
    player2_id INTEGER REFERENCES users(id),
    state VARCHAR(255),
    tournament INTEGER REFERENCES tournaments(id),
    winner_id INTEGER REFERENCES users(id),
    machine_id INTEGER,
    round VARCHAR(255)
)