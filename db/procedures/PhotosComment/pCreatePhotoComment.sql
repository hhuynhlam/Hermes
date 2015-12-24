DROP PROCEDURE IF EXISTS `pCreatePhotoComment`;

DELIMITER //
CREATE PROCEDURE `pCreatePhotoComment` (
    IN _pid int(11),
    IN _uid int(11),
    IN _pComment TEXT
)
BEGIN
    
    INSERT INTO PhotosComment VALUES ( 
        NULL,
        _pid,
        _uid,
        _pComment,
        NULL
    );

    -- return updated photo comment
    SELECT  LAST_INSERT_ID() as pcid,  
            _pid as pid,
            _uid as uid,
            _pComment as pComment;

END //
DELIMITER ;
