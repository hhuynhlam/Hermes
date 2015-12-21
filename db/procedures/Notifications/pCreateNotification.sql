DROP PROCEDURE IF EXISTS `pCreateNotification`;

DELIMITER //
CREATE PROCEDURE `pCreateNotification` (
    IN _nType   varchar(12),
    IN _nTarget int(11),
    IN _uid int(11)
)
BEGIN
    
    INSERT INTO Notifications VALUES ( 
        NULL,
        _nType,
        _nTarget,
        _uid,
        NOW()
    );

    -- return new photos comment 
    SELECT nid,nType,nTarget,uid,nUpdateDate FROM Notifications
        ORDER BY nid DESC LIMIT 1;
        

END //
DELIMITER ;
