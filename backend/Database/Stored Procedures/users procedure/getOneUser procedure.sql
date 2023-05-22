CREATE OR ALTER PROCEDURE getOneUser(@user_email varchar(100))
AS
BEGIN
SELECT * FROM Users  WHERE user_email=@user_email AND is_deleted=0

END

