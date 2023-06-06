insert into public.game_participant_types(description) values
('Contestant'),
('Presenter'),
('Spectator');

insert into public.game_types(description) values
('Who Wants To Be A Millionaire'),
('Fastest Finger First');

insert into public.lifelines(description) values
('50/50'),
('Ask the audience'),
('Phone a friend');

insert into public.question_difficulty_types(description, value) values
('Easy', 1),
('Medium', 2),
('Hard', 3),
('Very Hard', 4);


insert into public.game_lifeline_statuses(description, value) values
('Available', 1),
('Unavailable', 2);
