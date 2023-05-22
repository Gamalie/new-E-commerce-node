CREATE PROCEDURE getAllUser(@user_id varchar(50),@user_name varchar(50),@user_email varchar(50),@user_password varchar(100), @is_deleted INT  )
AS
BEGIN

SELECT * FROM Users;

END

