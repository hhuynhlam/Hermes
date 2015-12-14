DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `streetAddress` varchar(255) DEFAULT NULL,
  `country` varchar(2) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zip` int(5) DEFAULT NULL,
  `homePhone` int(10) DEFAULT NULL,
  `mobilePhone` int(10) DEFAULT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`uid`)
);
