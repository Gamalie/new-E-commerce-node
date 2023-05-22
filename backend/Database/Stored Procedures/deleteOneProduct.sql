CREATE OR ALTER PROCEDURE deleteOneProduct (@Product_id VARCHAR(100))
	AS
	BEGIN
	UPDATE Products SET isDelete =1
		WHERE Product_id =@Product_id AND isDelete=0
	END
