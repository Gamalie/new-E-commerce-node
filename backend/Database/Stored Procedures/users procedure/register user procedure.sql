CREATE PROCEDURE register_user(@user_id varchar(50),@user_name varchar(50),@user_email varchar(50),@user_password varchar(100))

AS
BEGIN
INSERT INTO users(user_id,user_name,user_email,user_password) 
VALUES(@user_id, @user_name,@user_email, @user_password)

END