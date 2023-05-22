CREATE OR ALTER PROCEDURE update_user(@user_id varchar(50),@user_name varchar(50),@user_email varchar(50),@user_password varchar(100))

AS
BEGIN

UPDATE Users SET user_id=@user_id, user_name=@user_name,user_email=@user_email, user_password=@user_password WHERE user_id=@user_id AND IS_DELETED=0

END

