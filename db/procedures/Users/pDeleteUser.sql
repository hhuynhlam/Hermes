DROP PROCEDURE IF EXISTS `pDeleteUser`;

DELIMITER //
CREATE PROCEDURE `pDeleteUser` (
    IN _uid int(11)
)
BEGIN
    
    DELETE FROM Users
    WHERE `uid` = _uid;

    -- return number of rows affected
    SELECT ROW_COUNT() as Users_Deleted; 

END //
DELIMITER ;