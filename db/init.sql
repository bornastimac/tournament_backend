create table users(
    id serial primary key,
    name varchar (50) not null, 
    surname varchar (50) not null,
    gender varchar (50) not null,
    date_of_birth date not null,
    country varchar(50),
    region varchar(255),
    address varchar(50),
    zipcode varchar(255),
    email varchar (355) unique not null,
    phone varchar(255),
    category varchar(2),
    licence varchar(255),
    statistics varchar(255),
    created_at date not null default current_date,
    user_type varchar(255),
    nickname varchar(255)
);

create table teams(
    id serial primary key,
    type integer not null,
    name varchar(255),
    players integer[],
    captain integer references users(id)
);

create table clubs(
    id serial primary key,
    name varchar(255),
    players integer[],
    teams text[],
    country varchar(255),
    address varchar(255),
    location varchar(255),
    contact varchar(255),
    phone  varchar(255),
    email varchar(255),
    number_of_machines integer,
    time_of_start date,
    time_of_end date
);

create table events(
    id serial primary key,
    name varchar(255),
    organizer varchar(255),
    type varchar(255),
    point_system varchar(255)
);

create table tournaments(
    id integer primary key unique,
    challonge_tournament jsonb not null default '{}'::jsonb,
    participants integer[],
    match_sheet_type varchar(255),
    matchmaking_type varchar(255),
    event_id integer references events(id),
    owner_id varchar(255)
);

insert into events(name, organizer, type, point_system) values('demo', 'organizer1', 'tipeventa', 'pointsystem');

create table team_matches(
    id serial primary key,
    created_at date,
    team1_id integer references teams(id),
    team2_id integer references teams(id),
    state varchar(255),
    tournament_id integer references tournaments(id),
    winner_id integer references teams(id),
    machine_id integer,
    round varchar(255)
);

create table matches(
    id serial primary key,
    created_at date,
    player1_id integer references users(id),
    player2_id integer references users(id),
    state varchar(255),
    tournament_id integer references tournaments(id),
    winner_id integer references users(id),
    machine_id integer,
    round varchar(255)
);