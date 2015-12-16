DROP PROCEDURE IF EXISTS `pDeleteNotification`;

DELIMITER //
CREATE PROCEDURE `pDeleteNotification` (
    IN _nid int(11)
)
BEGIN
    
    DELETE FROM Notifications
    WHERE `nid` = _nid;

    -- return number of rows affected
    SELECT ROW_COUNT() as Notifications_Deleted; 

END //
DELIMITER ;
