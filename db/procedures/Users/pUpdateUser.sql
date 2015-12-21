DROP PROCEDURE IF EXISTS `pUpdateUser`;

DELIMITER //
CREATE PROCEDURE `pUpdateUser` (
    IN _uid int(11),
    IN _firstName varchar(255),
    IN _lastName varchar(255),
    IN _streetAddress varchar(255),
    IN _country varchar(2),
    IN _state varchar(2),
    IN _city varchar(255),
    IN _zip int(5),
    IN _primaryNumber int(10),
    IN _secondaryNumber int(10),
    IN _pid int(11),
    IN _email text,
    IN _password text
)
BEGIN
    
    UPDATE Users
    SET `firstName` = _firstName,
        `lastName` = _lastName,
        `streetAddress` = _streetAddress,
        `country` = _country,
        `state` = _state,
        `city` = _city,
        `zip` = _zip,
        `primaryNumber` = _primaryNumber,
        `secondaryNumber` = _secondaryNumber,
        `pid` = _pid,
        `email` = COALESCE(_email, `email`),
        `password` = COALESCE(_password, `password`)
    WHERE `uid` = _uid;

    -- return updated user info
    SELECT *
    FROM vUser
    WHERE `uid` = _uid;

END //
DELIMITER ;
