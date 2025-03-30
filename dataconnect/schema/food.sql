CREATE TABLE FOOD_RECORDS (
    id bigint primary key generated always as identity,
    user_id bigint NOT NULL,
    timestamp timestamp with time zone DEFAULT now(),
    description text NOT NULL,
    carbs float,
    proteins float,
    fats float,
    createdAt timestamp with time zone DEFAULT now(),
    updatedAt timestamp with time zone DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE INDEX idx_food_records_user_id ON FOOD_RECORDS(user_id);

ALTER TABLE FOOD_RECORDS ENABLE ROW LEVEL SECURITY;