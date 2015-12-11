DROP TABLE IF EXISTS `Photos`;

CREATE TABLE `Photos` (
    `pid` int(11) NOT NULL AUTO_INCREMENT,
    `photoName` varchar(255) DEFAULT NULL,
    `photoExt` varchar(12) DEFAULT NULL,
    `pgid` int(11) DEFAULT NULL,
    `uid` int(11) DEFAULT NULL,
    PRIMARY KEY (`pid`)
);