DROP PROCEDURE IF EXISTS `pCreatePhotosComment`;

DELIMITER //
CREATE PROCEDURE `pCreatePhotosComment` (
    IN _uid       varchar(11),
    IN _pComment  text
)
BEGIN
    
    INSERT INTO PhotosComment VALUES ( 
        NULL,
        _uid,
        _pComment,
        NOW()
    );

    -- return new photos comment 
    SELECT pgid,uid,pComment,pUpdate FROM PhotosComment 
        ORDER BY pgid DESC LIMIT 1;
        

END //
DELIMITER ;
