CREATE OR REPLACE VIEW `vUser` 
AS 
    SELECT
        u.*, 
        CONCAT( 'uploaded/images/', substring(p.`pid`,-2,2), '/', p.`pid`, '.', p.`photoExt` ) as filePath
    FROM Users u
    LEFT JOIN Photos p ON u.`pid` = p.`pid`;