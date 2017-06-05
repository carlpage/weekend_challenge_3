SELECT * FROM todoTable;

DROP TABLE todoTable;

INSERT INTO todoTable (task, complete)
VALUES ('Study programming', false),
('Go biking', false),
('Eat dinner', false);

CREATE TABLE todoTable (
	task varchar(160),
	complete boolean
);
