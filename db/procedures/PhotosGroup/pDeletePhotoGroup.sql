DROP PROCEDURE IF EXISTS `pDeletePhotoGroup`;

DELIMITER //
CREATE PROCEDURE `pDeletePhotoGroup` (
    IN _pgid int(11)
)
BEGIN
    
    DELETE FROM PhotosGroup
    WHERE `pgid` = _pgid;

    DELETE FROM Photos
    WHERE `pgid` = _pgid;

    -- return number of rows affected
    SELECT ROW_COUNT() as Photos_Deleted; 

END //
DELIMITER ;