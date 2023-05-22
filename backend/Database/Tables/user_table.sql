CREATE TABLE users(
	user_id varchar(100),
	user_name varchar(100),
	user_email varchar(100) UNIQUE,
	user_password varchar(100),
	is_deleted INT DEFAULT 0)


	ALTER TABLE users
	ADD user_role


