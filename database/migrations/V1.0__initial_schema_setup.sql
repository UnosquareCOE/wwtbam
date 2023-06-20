CREATE TABLE IF NOT EXISTS public.accounts
(
    id serial constraint accounts_pk primary key,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    active boolean NOT NULL default TRUE,
    created_date timestamp NOT NULL default CURRENT_TIMESTAMP,
    modified_date timestamp NULL,
    password text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.sessions
(
    id serial constraint sessions_pk primary key,
    name text,
    password text,
    created_date timestamp,
    modified_date timestamp,
    owner_id int constraint sessions_accounts_owner_id references public.accounts
);

CREATE TABLE IF NOT EXISTS public.game_participant_types
(
    id serial constraint game_participant_types_pk primary key,
    description text
);

CREATE TABLE IF NOT EXISTS public.participants
(
    id serial constraint participants_pk primary key,
    name text,
    avatar text,
    created_date timestamp,
    session_id int constraint participants_sessions_session_id references public.sessions
);

CREATE TABLE IF NOT EXISTS public.game_types
(
    id serial constraint game_types_pk primary key,
    description text
);

CREATE TABLE IF NOT EXISTS public.games
(
    id serial constraint games_pk primary key,
    created_date timestamp,
    description text,
    session_id int constraint games_sessions_session_id references public.sessions,
    game_type_id int constraint games_game_types_game_type_id references public.game_types
);

CREATE TABLE IF NOT EXISTS public.lifelines
(
    id serial constraint lifelines_pk primary key,
    description text
);

CREATE TABLE IF NOT EXISTS public.game_type_lifelines
(
    id serial constraint game_type_lifelines_pk primary key,
    game_type_id int constraint game_type_lifelines_game_types_game_type_id references public.game_types,
    lifeline_id int constraint game_type_lifelines_lifelines_lifeline_id references public.lifelines
);

CREATE TABLE IF NOT EXISTS public.game_type_milestones
(
    id serial constraint game_type_milestones_pk primary key,
    game_type_id int constraint game_type_lifelines_game_types_game_type_id references public.game_types,
    sequence int
);

CREATE TABLE IF NOT EXISTS public.question_difficulty_types
(
    id serial constraint question_difficulty_types_pk primary key,
    description text,
    value int
);

CREATE TABLE IF NOT EXISTS public.questions
(
    id serial constraint questions_pk primary key,
    title text,
    question_difficulty_type_id int constraint questions_question_difficulty_types_question_difficulty_type_id references public.question_difficulty_types
);

CREATE TABLE IF NOT EXISTS public.game_lifeline_statuses
(
    id serial constraint game_lifeline_statuses_pk primary key,
    description text
);

CREATE TABLE IF NOT EXISTS public.game_lifelines
(
    id serial constraint game_lifelines_pk primary key,
    title text,
    lifeline_id int constraint game_lifelines_lifelines_lifeline_id references public.lifelines,
    game_lineline_status_id int constraint game_lifelines_game_lineline_statuses_game_lineline_status_id references public.game_lifeline_statuses
);

CREATE TABLE IF NOT EXISTS public.game_milestones
(
    id serial constraint game_milestones_pk primary key,
    game_id int constraint game_milestones_games_game_id references public.games,
    sequence int 
);

CREATE TABLE IF NOT EXISTS public.game_participants
(
    id serial constraint game_participants_pk primary key,
    game_id int constraint game_participants_games_game_id references public.games,
    participant_id int constraint game_participants_participants_participant_id references public.participants,
    game_participant_type_id int constraint game_participants_game_participant_types_game_participant_type_id references public.game_participant_types
);

CREATE TABLE IF NOT EXISTS public.game_questions
(
    id serial constraint game_questions_pk primary key,
    sequence int,
    game_id int constraint game_questions_games_game_id references public.games,
    question_id int constraint game_questions_questions_question_id references public.questions
);

CREATE TABLE IF NOT EXISTS public.question_items
(
    id serial constraint question_items_pk primary key,
    value text,
    outcome boolean,
    question_id int constraint question_items_questions_question_id references public.questions
);

CREATE TABLE IF NOT EXISTS public.game_participant_questions
(
    id serial constraint game_participant_questions_pk primary key,
    created_date timestamp,
    game_participant_id int constraint game_participant_questions_game_participants_game_participant_id references public.game_participants
);
