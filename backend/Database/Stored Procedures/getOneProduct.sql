CREATE OR ALTER PROCEDURE getOneProduct (@Product_id VARCHAR(100))
	
	AS
BEGIN
SELECT * FROM Products WHERE Product_id=@Product_id AND isDelete=0
END
