CREATE TABLE INSULIN_RECORDS (
    id bigint primary key generated always as identity,
    user_id bigint NOT NULL,
    insulin_type text NOT NULL,
    dosage_units float NOT NULL,
    timestamp timestamp with time zone DEFAULT now(),
    notes text,
    createdAt timestamp with time zone DEFAULT now(),
    updatedAt timestamp with time zone DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE INDEX idx_insulin_user_id ON INSULIN_RECORDS(user_id);

ALTER TABLE INSULIN_RECORDS ENABLE ROW LEVEL SECURITY;