DROP PROCEDURE IF EXISTS `pDeleteNotification`;

DELIMITER //
CREATE PROCEDURE `pDeleteNotification` (
    IN _uid int(11),
    IN _nType varchar(12)
)
BEGIN
    
    IF (_nType IS NULL) THEN 
        DELETE FROM Notifications WHERE uid=_uid;
    ELSE
        DELETE FROM Notifications WHERE uid=_uid AND nType=_nType;
    END IF;

END //
DELIMITER ;
