CREATE TABLE `Notifications` (
  `nid` int(11) NOT NULL AUTO_INCREMENT,
  `nType` varchar(12) DEFAULT NULL,
  `nTarget` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `nUpdateDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`nid`)
)
