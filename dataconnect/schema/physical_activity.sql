CREATE TABLE PHYSICAL_ACTIVITIES (
    id bigint primary key generated always as identity,
    user_id bigint NOT NULL,
    activity_type text NOT NULL,
    start_time timestamp with time zone,
    end_time timestamp with time zone,
    intensity text,
    notes text,
    createdAt timestamp with time zone DEFAULT now(),
    updatedAt timestamp with time zone DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE INDEX idx_physical_activities_user_id ON PHYSICAL_ACTIVITIES(user_id);

ALTER TABLE PHYSICAL_ACTIVITIES ENABLE ROW LEVEL SECURITY;