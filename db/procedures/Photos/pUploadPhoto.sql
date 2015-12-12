DROP PROCEDURE IF EXISTS `pUploadPhoto`;

DELIMITER //
CREATE PROCEDURE `pUploadPhoto` (
    IN _photoName varchar(255),
    IN _photoExt  varchar(12),
    IN _pgid      int(11),
    IN _uid       varchar(11)
)
BEGIN
    
    INSERT INTO Photos VALUES ( 
        NULL,
        _photoName,
        _photoExt,
        _pgid,
        _uid
    );

    -- return updated photo group
    SELECT  LAST_INSERT_ID() as pid,
            _photoName as photoName,
            _photoExt as photoExt,
            _pgid as pgid,
            _uid as uid;

END //
DELIMITER ;