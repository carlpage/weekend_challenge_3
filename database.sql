SELECT * FROM todoTable;

DROP TABLE todoTable;

INSERT INTO todoTable (task, complete)
VALUES ('Study programming', false),
('Go biking', false),
('Eat dinner', false),
('Sleep', false);

CREATE TABLE todoTable (
	id serial PRIMARY KEY,
	task varchar(160),
	complete boolean
);
