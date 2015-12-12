DROP FUNCTION IF EXISTS `fResolvePhotoPath`;

DELIMITER //
CREATE FUNCTION `fResolvePhotoPath` (
    _root      varchar(255),
    _pid       varchar(11),
    _ext       varchar(12)
) RETURNS varchar(255)
BEGIN
    IF (_pid IS NULL) THEN
        RETURN CONCAT( _root, '404.png');
    ELSE
        RETURN CONCAT( _root, substring(_pid,-2,2), '/', _pid, '.', _ext );
    END IF;
END //
DELIMITER ;