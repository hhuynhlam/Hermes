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
    IN _homePhone int(10),
    IN _mobilePhone int(10),
    IN _email text,
    IN _password text
)
BEGIN
    
    UPDATE Users
    SET `firstName` = COALESCE(_firstName, `firstName`),
        `lastName` = COALESCE(_lastName, `lastName`),
        `streetAddress` = COALESCE(_streetAddress, `streetAddress`),
        `country` = COALESCE(_country, `country`),
        `state` = COALESCE(_state, `state`),
        `city` = COALESCE(_city, `city`),
        `zip` = COALESCE(_zip, `zip`),
        `homePhone` = COALESCE(_homePhone, `homePhone`),
        `mobilePhone` = COALESCE(_mobilePhone, `mobilePhone`),
        `email` = COALESCE(_email, `email`),
        `password` = COALESCE(_password, `password`)
    WHERE `uid` = _uid;

    -- return updated user info
    SELECT  `firstName`, 
            `lastName`, 
            `streetAddress`, 
            `country`, 
            `state`, 
            `city`, 
            `zip`,
            `homePhone`,
            `mobilePhone`,
            `email`
    FROM Users
    WHERE `uid` = _uid;

END //
DELIMITER ;
