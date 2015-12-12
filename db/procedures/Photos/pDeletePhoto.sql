DROP PROCEDURE IF EXISTS `pDeletePhoto`;

DELIMITER //
CREATE PROCEDURE `pDeletePhoto` (
    IN _pid       varchar(11)
)
BEGIN
    
    DELETE FROM Photos
    WHERE `pid` = _pid;

    -- return number of rows affected
    SELECT ROW_COUNT() as Photos_Deleted; 

END //
DELIMITER ;