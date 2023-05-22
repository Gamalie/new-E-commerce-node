CREATE PROCEDURE delete_user(@user_id varchar(100) )

AS
BEGIN
UPDATE Users SET is_deleted=1 WHERE user_id=@user_id AND is_deleted=0

END