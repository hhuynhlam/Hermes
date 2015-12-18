DROP PROCEDURE IF EXISTS `pDeletePhoto`;

DELIMITER //
CREATE PROCEDURE `pDeletePhoto` (
    IN _pid       varchar(11)
)
BEGIN
    DECLARE _path varchar(255);
    
    SELECT `filePath` INTO _path
    FROM `vPhoto` 
    WHERE `pid` = _pid;

    DELETE FROM Photos
    WHERE `pid` = _pid;

    -- return number of rows affected
    SELECT  _path as filePath,
            ROW_COUNT() as Photos_Deleted; 

END //
DELIMITER ;