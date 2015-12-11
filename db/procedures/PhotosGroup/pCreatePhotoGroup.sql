DROP PROCEDURE IF EXISTS `pCreatePhotoGroup`;

DELIMITER //
CREATE PROCEDURE `pCreatePhotoGroup` (
    IN _groupName varchar(255)
)
BEGIN
    
    INSERT INTO PhotosGroup VALUES ( 
        NULL,
        _groupName
    );

    -- return updated photo group
    SELECT  _groupName;

END //
DELIMITER ;