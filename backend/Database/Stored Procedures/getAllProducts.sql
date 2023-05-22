CREATE PROCEDURE getAllProducts (@Product_id VARCHAR(100),
	@Product_name VARCHAR(100),
	@Product_description VARCHAR(1000),
	@Product_price INT,
	@Product_image VARCHAR(300),
	@isDelete INT) 
	
	AS
BEGIN
SELECT * FROM Products WHERE @isDelete =0
END




