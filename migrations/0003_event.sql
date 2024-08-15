-- Migration number: 0003 	 2024-08-15T13:07:59.578Z
create table events (
    event_id integer primary key AUTOINCREMENT,
    event_name varchar(255) not null,
    event_description text not null,
    event_date date not null,
    event_time time not null,
    event_location varchar(255),
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

create table events_speaker (
    event_speaker_id integer primary key AUTOINCREMENT,
    event_id integer not null references events(event_id),
    name varchar(255) not null,
    title varchar(255),
    bio text,
    image_url varchar(255),
    type integer,
    enabled boolean not null default true,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

create table events_agenda (
    event_agenda_id integer primary key AUTOINCREMENT,
    event_id integer not null references events(event_id),
    title varchar(255) not null,
    description text,
    start_time time not null,
    end_time time not null,
    enabled boolean not null default true,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

create table events_iframes (
    event_iframe_id integer primary key AUTOINCREMENT,
    event_id integer not null references events(event_id),
    title varchar(255) not null,
    url varchar(255) not null,
    enabled boolean not null default true,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);