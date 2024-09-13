-- Migration number: 0002 	 2024-08-14T09:02:16.950Z
-- Migration number: 0001 	 2024-08-12T08:14:43.040Z
create table  IF NOT EXISTS forms (
    form_id integer primary key AUTOINCREMENT,
    form_UUID string not null unique,
    form_name varchar(255) not null,
    form_owner varchar(255) not null,
    form_description text not null default '',
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

create table if not exists form_history (
    form_history_id integer primary key AUTOINCREMENT,
    form_id integer not null,
    updated_at timestamp not null default current_timestamp
);

CREATE TABLE IF NOT EXISTS form_history_fields (
    form_history_id INTEGER NOT NULL,
    form_field_id INTEGER NOT NULL,
    field_order integer not null
);

-- Table for storing form fields
create table  IF NOT EXISTS form_fields (
    form_field_id integer primary key AUTOINCREMENT,
    form_id integer not null,
    field_name varchar(255) not null,
    field_type varchar(255) not null,
    field_info varchar(255) not null default '',
    field_order integer not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

-- Table for storing user responses
create table IF NOT EXISTS user_responses (
    response_id integer primary key AUTOINCREMENT,
    form_id integer not null,
    created_at timestamp not null default current_timestamp
);

-- Table for storing individual response entries
create table IF NOT EXISTS response_entries (
    response_entry_id integer primary key AUTOINCREMENT,
    response_id integer not null,
    form_field_id integer not null,
    response text null
);