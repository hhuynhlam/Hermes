DROP PROCEDURE IF EXISTS `pUpdatePhotoGroup`;

DELIMITER //
CREATE PROCEDURE `pUpdatePhotoGroup` (
    IN _pgid int(11),
    IN _groupName varchar(255)
)
BEGIN
    
    UPDATE PhotosGroup
    SET `groupName` = _groupName
    WHERE `pgid` = _pgid;

    -- return updated photos group
    SELECT  `pgid`, 
            `groupName`
    FROM PhotosGroup
    WHERE `pgid` = _pgid;

END //
DELIMITER ;
