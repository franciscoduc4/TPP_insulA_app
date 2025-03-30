CREATE TABLE REMINDERS (
    id bigint primary key generated always as identity,
    user_id bigint NOT NULL,
    reminder_type text NOT NULL,
    message text NOT NULL,
    scheduled_time timestamp with time zone,
    status text,
    createdAt timestamp with time zone DEFAULT now(),
    updatedAt timestamp with time zone DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE INDEX idx_reminders_user_id ON REMINDERS(user_id);

ALTER TABLE REMINDERS ENABLE ROW LEVEL SECURITY;