CREATE TABLE USERS (
    id bigint primary key generated always as identity,
    email text NOT NULL,
    password text NOT NULL,
    firstName text NOT NULL,
    lastName text NOT NULL,
    role text NOT NULL,
    dateOfBirth timestamp with time zone,
    createdAt timestamp with time zone DEFAULT now(),
    updatedAt timestamp with time zone DEFAULT now()
);

ALTER TABLE USERS ENABLE ROW LEVEL SECURITY;
