CREATE TABLE Users
(
    uid int NOT NULL AUTO_INCREMENT,
    firstName  varchar(255),
    lastName  varchar(255),
    streetAddress  varchar(255),
    country  varchar(255),
    state  varchar(255),
    city  varchar(255),
    zip int,
    homePhone int,
    mobilePhone int,
    email text,
    password text,

    PRIMARY KEY (uid)
);


CREATE TABLE `Photos` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `photoName` varchar(255) DEFAULT NULL,
  `photoExt` varchar(12) DEFAULT NULL,
  `pgid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`pid`)
);

CREATE TABLE `PhotosGroup` (
  `pgid` int(11) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pgid`)
);
