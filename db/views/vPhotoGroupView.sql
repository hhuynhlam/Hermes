CREATE OR REPLACE VIEW `vPhotoGroup` 
AS 
    SELECT pg.*,
        fResolvePhotoPath( 'uploaded/images/', p.`pid`, p.`photoExt` ) as filePath
    FROM PhotosGroup pg
    LEFT JOIN Photos p ON p.pid = (SELECT pp.pid FROM Photos pp WHERE pp.pgid = pg.pgid LIMIT 1);