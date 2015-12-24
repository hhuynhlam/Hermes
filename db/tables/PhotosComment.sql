DROP TABLE IF EXISTS `PhotosComment`;

CREATE TABLE `PhotosComment` (
  `pcid` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `pComment` TEXT DEFAULT NULL,
  `pUpdate` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`pcid`)
)
