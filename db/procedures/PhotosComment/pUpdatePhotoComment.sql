DROP PROCEDURE IF EXISTS `pUpdatePhotoComment`;

DELIMITER //
CREATE PROCEDURE `pUpdatePhotoComment` (
    IN _pcid int(11),
    IN _pid int(11),
    IN _uid int(11),
    IN _pComment TEXT
)
BEGIN
    
    UPDATE PhotosComment
    SET `pid` = _pid,
        `uid` = _uid,
        `pComment` = _pComment,
        `pUpdate` = NOW()

    WHERE `pcid` = _pcid;

    -- return updated photos comment
    SELECT  `pid`, 
            `uid`,
            `pComment`
    FROM PhotosComment
    WHERE `pcid` = _pcid;

END //
DELIMITER ;
