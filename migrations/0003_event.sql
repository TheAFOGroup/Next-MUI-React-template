-- Migration number: 0003 	 2024-08-15T13:07:59.578Z
create table if not exists  events (
    event_id integer primary key AUTOINCREMENT,
    event_UUID string not null unique,
    event_name varchar(255) not null,
    event_description text not null,
    event_date date not null,
    event_time time not null,
    event_location varchar(255),
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

create table if not exists events_speaker (
    events_speaker_id integer primary key AUTOINCREMENT,
    events_speaker_name varchar(255) not null,
    events_speaker_title varchar(255),
    events_speaker_bio text,
    events_speaker_image_url varchar(255),
    events_speaker_type integer not null default 1,
    events_speaker_enabled boolean not null default true,
    events_speaker_owner varchar(255) not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

create table if not exists  events_agenda (
    event_agenda_id integer primary key AUTOINCREMENT,
    events_agenda_event_id integer not null references events(event_id),
    events_agenda_title varchar(255) not null,
    events_agenda_description text,
    events_agenda_start_time time not null,
    events_agenda_end_time time not null,
    events_agenda_enabled boolean not null default true,
    events_agenda_created_at timestamp not null default current_timestamp,
    events_agenda_updated_at timestamp not null default current_timestamp
);

create table if not exists  events_iframes (
    event_iframe_id integer primary key AUTOINCREMENT,
    event_id integer not null references events(event_id),
    title varchar(255) not null,
    url varchar(255) not null,
    enabled boolean not null default true,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

create table if not exists events_html(
    event_html_id integer primary key AUTOINCREMENT,
    event_id integer not null references events(event_id),
    html_content text not null,
    enabled boolean not null default true,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);