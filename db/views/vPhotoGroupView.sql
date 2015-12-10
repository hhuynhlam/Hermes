CREATE OR REPLACE VIEW `vPhotoGroup` 
AS 
    SELECT pg.*,
        CONCAT( 'uploaded/images/', substring(p.`pid`,-2,2), '/', p.`pid`, '.', p.`photoExt` ) as filePath
    FROM PhotosGroup pg
    JOIN Photos p ON p.pid = (SELECT pp.pid FROM Photos pp WHERE pp.pgid = pg.pgid LIMIT 1);