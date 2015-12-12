DROP PROCEDURE IF EXISTS `pUpdatePhoto`;

DELIMITER //
CREATE PROCEDURE `pUpdatePhoto` (
    IN _pid int(11),
    IN _photoName varchar(255),
    IN _photoExt varchar(12),
    IN _pgid int(11),
    IN _uid int(11)
)
BEGIN
    
    UPDATE Photos
    SET `photoName` = IFNULL(_photoName, ''),
        `photoExt` = COALESCE(_photoExt, `photoExt`),
        `pgid` = COALESCE(_pgid, `pgid`),
        `uid` = COALESCE(_uid, `uid`)
    WHERE `pid` = _pid;

    -- return updated user info
    SELECT  `pid`, 
            `photoName`,
            `photoExt`,
            `pgid`,
            `uid`
    FROM Photos
    WHERE `pid` = _pid;

END //
DELIMITER ;
