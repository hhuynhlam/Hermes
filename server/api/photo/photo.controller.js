/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var cloudinary = require('cloudinary');

// Get list of things
exports.index = function(req, res) {
  cloudinary.api.resource('resources/image/upload', function(result) {
    return result;
  });
  //if(err) { return handleError(res, err); }
};

// Get a single thing
exports.show = function(req, res) {

};

// Creates a new thing in the DB.
exports.create = function(req, res) {

};

// Updates an existing thing in the DB.
exports.update = function(req, res) {

};

// Deletes a thing from the DB.
// exports.destroy = function(req, res) {
//   Thing.findById(req.params.id, function (err, thing) {
//     if(err) { return handleError(res, err); }
//     if(!thing) { return res.send(404); }
//     thing.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}