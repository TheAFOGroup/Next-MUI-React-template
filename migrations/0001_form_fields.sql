-- Migration number: 0001 	 2024-08-12T08:14:43.040Z
create table form_fields (
    id serial primary key,
    form_id integer not null,
    field_name varchar(255) not null,
    field_type varchar(255) not null,
    field_order integer not null,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);