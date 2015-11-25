CREATE OR REPLACE VIEW `vPhoto` 
AS 
    SELECT 
        p.`pid`,
        p.`photoName`,
        CONCAT(pg.`pgid`, '/', p.`pid`, '.', p.`photoExt`) as filePath,
        pg.`pgid`,
        pg.`groupName`,
        p.`uid` 
    FROM Photos p
    JOIN PhotosGroup pg ON pg.`pgid` = p.`pgid`;