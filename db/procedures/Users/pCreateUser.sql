DROP PROCEDURE IF EXISTS `pCreateUser`;

DELIMITER //
CREATE PROCEDURE `pCreateUser` (
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
    
    INSERT INTO Users VALUES ( 
        NULL,
        _firstName,
        _lastName,
        _streetAddress,
        _country,
        _state,
        _city,
        _zip,
        _homePhone,
        _mobilePhone,
        _email,
        _password
    );

    -- return updated user info
    SELECT  _firstName,
            _lastName,
            _streetAddress,
            _country,
            _state,
            _city,
            _zip,
            _homePhone,
            _mobilePhone,
            _email,
            _password;

END //
DELIMITER ;
