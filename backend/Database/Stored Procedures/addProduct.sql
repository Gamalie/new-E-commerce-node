CREATE PROCEDURE addProducts (@Product_id VARCHAR(100),@Product_name VARCHAR(100),@Product_description VARCHAR(1000),@Product_price INT,@Product_image VARCHAR(300),@isDelete INT) AS
BEGIN
INSERT INTO Products(
			Product_id,
			Product_name,
			Product_description,
			Product_price,
			Product_image)

	VALUES(
		@Product_id,
		@Product_name,
		@Product_description,
		@Product_price,
		@Product_image)


END