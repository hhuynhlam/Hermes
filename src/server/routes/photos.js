'use strict';

var db = require('../helpers/db_connector');
var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
var queryBuilder = require('../helpers/query_builder');
var express = require('express');
var multer  = require('multer');
var path = require('path');
var router = express.Router();

var uploader = multer({ dest: path.join(__dirname, '../public/uploaded') });

//======================================
// Photos
//======================================

    // Upload a Photo
    // router.get('/', passport.authenticate('local', { session: false }),
    router.post('/upload',  uploader.single('photo'),
    function (req, res) {
        res.set('Content-Type', 'text/plain');

        // fill out photo meta
        req.body.photoName = req.file.originalname.slice(0, req.file.originalname.length - 4);
        req.body.photoExt = req.file.originalname.slice(-3).toLowerCase();
        req.body.uid = JSON.parse(req.cookies._user).uid;
        // req.body.pgid set in request via client

        // insert into db
        var queryParams = queryBuilder.params([
                'photoName',
                'photoExt',
                'pgid',
                'uid'
            ], req.body ),
            queryString = 'CALL pUploadPhoto(' + queryParams + ');';

        // get pid of inserted photo
        db.query(queryString, function (data) {
            var _photo = data[0][0],
                _photoDir = _photo.pid.toString().slice(-2),
                _photoName = _photo.pid.toString() + '.' + _photo.photoExt,
                _resolvedDir = path.join(__dirname, '../public/uploaded/images/', _photoDir),
                _resolvedName = _resolvedDir + '/' + _photoName,
                _returnPath = path.join('uploaded/images/', _photoDir, '/', _photoName);

            // check if photo directory exists
            if (!fs.existsSync(_resolvedDir)) { fs.mkdirSync(_resolvedDir); }

            // write file to disk
            fs.readFile(req.file.path, function (err, data) {
                if (err) { return res.status(500).send('Could not read incoming file.'); }

                fs.writeFile(_resolvedName, data, function (err) {
                    if (err) { return res.status(500).send('Could not write new file.'); }
                    fs.unlink(req.file.path);
                    return res.json({ 
                        pid: _photo.pid,
                        path: _returnPath });
                });
            });

        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // Remove uploaded Photo
    // router.get('/', passport.authenticate('local', { session: false }),
    router.delete('/upload',
    function () {
        // placeholder
    });

    // Update a Photo by id
    // router.get('/', passport.authenticate('local', { session: false }),
    router.put('/update/:id',
    function (req, res) {
        var queryParams = queryBuilder.params([
                'photoName',
                'photoExt',
                'pgid',
                'uid'
            ], req.body ),
            queryString = 'CALL pUpdatePhoto(\'' + req.params.id + '\', ' + queryParams + ');';
        
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // Get a Photo by id
    // router.get('/', passport.authenticate('local', { session: false }),
    router.post('/:id',
    function (req, res) {
        var queryString = queryBuilder.select({ 
            route: 'vPhoto', 
            where: [
                { 'key': 'pid', 'operator': '=', 'value': req.params.id }
            ]
        });
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // Get Photo thumbnail
    // router.get('/', passport.authenticate('local', { session: false }),
    router.get('/',
    function (req, res) {
        var _public = path.join(__dirname, '../public'),

            filePath = _public + '/' + req.query.filePath,
            noFilePath = _public + '/images/404.png',
            _filePath = (fs.existsSync(filePath)) ? filePath : noFilePath,
            
            extent = req.query.extent,
            reqHeight = req.query.height,
            reqWidth = req.query.width,
            thumb = req.query.thumb,
            _img, _width, _height;

        // set image content-type
        res.set('Content-Type', 'image/jpg');

        // read image
        _img = gm(_filePath);

        // get size of image
        _img.size(function(err, value){
            _width = value.width;
            _height = value.height;
            
            // resize and crop accordingly
            if (thumb) {
                if (_width > _height) {
                    _img = _img
                        .resize(null, reqWidth||reqHeight)
                        .gravity('Center')
                        .crop(reqWidth||reqHeight, reqWidth||reqHeight, 0, 0);
                } else {
                    _img = _img
                        .resize(reqWidth||reqHeight, null)
                        .gravity('Center')
                        .crop(reqWidth||reqHeight, reqWidth||reqHeight, 0, 0);
                }
            } else {
                _img.resize(reqWidth, reqHeight).gravity('Center');
            }

            // extent
            if (extent) { 
                _img = _img
                    .background('#CCC')
                    .extent( reqWidth||reqHeight ); 
            }

            _img.stream(function (err, stdout) {
                if (err) { res.status(500).send('Image Error: ' + err); }
                else { stdout.pipe(res); }
            }); 
        });
    });

//======================================


//======================================
// Albums
//======================================

    // List all albums
    // router.get('/', passport.authenticate('local', { session: false }),
    router.get('/albums',
    function (req, res) {
        var queryString = queryBuilder.select({ route: 'vPhotoGroup' });
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // List all photos in album, if no photos get album name
    // router.get('/', passport.authenticate('local', { session: false }),
    router.post('/albums/:albumId',
    function (req, res) {
        var queryString = queryBuilder.select({ 
            route: 'vPhoto', 
            where: [
                { 'key': 'pgid', 'operator': '=', 'value': req.params.albumId }
            ]
        });
        db.query(queryString, function (data) {
            var _data = data;

            if (!_data.length) {
                db.query('SELECT groupName FROM vPhotoGroup \
                          WHERE pgid = ' + req.params.albumId, 
                function (data) {
                    _data = data;
                    return res.status(200).json( _data ); 
                });
                
            } else {
               return res.status(200).json( _data ); 
            }
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // Create a new album
    // router.get('/', passport.authenticate('local', { session: false }),
    router.put('/albums',
    function (req, res) {
        var queryParams = queryBuilder.params([
                'groupName'
            ], req.body ),
            queryString = 'CALL pCreatePhotoGroup(' + queryParams + ');';
        
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // Update an album
    // router.get('/', passport.authenticate('local', { session: false }),
    router.put('/albums/:id',
    function (req, res) {
        var queryParams = queryBuilder.params([
                'groupName'
            ], req.body ),
            queryString = 'CALL pUpdatePhotoGroup(\'' + req.params.id + '\', ' + queryParams + ');';
        
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

    // Delete a User by id
    router.delete('/albums/:id',
    function (req, res) {
        var queryString = 'CALL pDeletePhotoGroup(\'' + req.params.id + '\'' + ');';
        db.query(queryString, function (data) {
            return res.status(200).json( data );
        }, function (err) { res.status(500).send('SQL Error: ' + err); });
    });

//======================================

module.exports = router;
