DROP PROCEDURE IF EXISTS `pCreateNotification`;

DELIMITER //
CREATE PROCEDURE `pCreateNotification` (
    IN _uid int(11),
    IN _nType   varchar(12),
    IN _nTarget int(11)
)
BEGIN
    
    INSERT INTO Notifications VALUES ( 
        NULL,
        _uid,
        _nType,
        _nTarget,
        NOW()
    );

    -- return new photos comment 
    SELECT nid,uid,nType,nTarget,nUpdateDate FROM Notifications
        ORDER BY nid DESC LIMIT 1;
        

END //
DELIMITER ;
