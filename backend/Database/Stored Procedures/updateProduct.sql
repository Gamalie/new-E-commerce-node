CREATE or ALTER PROCEDURE updateProducts (@Product_id VARCHAR(100),
	@Product_name VARCHAR(100),
	@Product_description VARCHAR(1000),
	@Product_price INT,
	@Product_image VARCHAR(300)) 
	AS
BEGIN
UPDATE Products SET
			Product_id = @Product_id,
			Product_name=@Product_name,
			Product_description=@Product_description,
			Product_price=@Product_price,
			Product_image=@Product_image

			WHERE Product_id  =@Product_id  AND isDelete = 0


END
