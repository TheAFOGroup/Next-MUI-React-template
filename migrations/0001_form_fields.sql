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

create table responses(
    id serial primary key,
    response text not null
);

INSERT INTO form_fields (form_id, field_name, field_type, field_order)
VALUES 
(1, 'Name', 'text', 1),
(1, 'Email', 'email', 2),
(1, 'Age', 'number', 3);