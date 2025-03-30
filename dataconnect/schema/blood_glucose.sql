CREATE TABLE BLOOD_GLUCOSE_RECORDS (
    id bigint primary key generated always as identity,
    user_id bigint NOT NULL,
    glucose_value float NOT NULL,
    timestamp timestamp with time zone DEFAULT now(),
    context text,
    notes text,
    createdAt timestamp with time zone DEFAULT now(),
    updatedAt timestamp with time zone DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE INDEX idx_blood_glucose_user_id ON BLOOD_GLUCOSE_RECORDS(user_id);

ALTER TABLE BLOOD_GLUCOSE_RECORDS ENABLE ROW LEVEL SECURITY;