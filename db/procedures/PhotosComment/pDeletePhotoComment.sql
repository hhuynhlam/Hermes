DROP PROCEDURE IF EXISTS `pDeletePhotoComment`;

DELIMITER //
CREATE PROCEDURE `pDeletePhotoComment` (
    IN _pcid int(11)
)
BEGIN
    
    DELETE FROM PhotosComment
    WHERE `pcid` = _pcid;

    -- return number of rows affected
    SELECT ROW_COUNT() as Comments_Deleted; 

END //
DELIMITER ;