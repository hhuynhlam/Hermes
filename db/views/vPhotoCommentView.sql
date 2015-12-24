CREATE OR REPLACE VIEW `vPhotoComment` 
AS 
    SELECT
        pc.*,
        CONCAT(u.`firstName`, ' ', u.`lastName`) as username, 
        CONCAT( 'uploaded/images/', substring(p.`pid`,-2,2), '/', p.`pid`, '.', p.`photoExt` ) as userImage
    FROM PhotosComment pc
    JOIN Users u ON u.`uid` = pc.`uid`
    LEFT JOIN Photos p ON u.`pid` = p.`pid`
    ORDER BY pc.`pUpdate` ASC;