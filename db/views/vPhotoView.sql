CREATE OR REPLACE VIEW `vPhoto` 
AS 
    SELECT 
        p.`pid`,
        p.`photoName`,
        CONCAT( 'uploaded/images/', substring(p.`pid`,-2,2), '/', p.`pid`, '.', p.`photoExt` ) as filePath,
        pg.`pgid`,
        pg.`groupName`,
        p.`uid`,
        CONCAT(u.`firstName`, ' ', u.`lastName`) as username,
        u.filePath as profileImage 
    FROM Photos p
    JOIN PhotosGroup pg ON pg.`pgid` = p.`pgid`
    LEFT JOIN vUser u ON u.`uid` = p.`uid`;