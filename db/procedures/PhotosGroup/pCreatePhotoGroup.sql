DROP PROCEDURE IF EXISTS `pCreatePhotoGroup`;

DELIMITER //
CREATE PROCEDURE `pCreatePhotoGroup` (
    IN _uid int(11),
    IN _groupName varchar(255)
)
BEGIN
    
    INSERT INTO PhotosGroup VALUES ( 
        NULL,
        _groupName,
        _uid
    );

    -- return updated photo group
    SELECT  LAST_INSERT_ID() as pgid,  
            _groupName as groupName,
            _uid as uid;

END //
DELIMITER ;