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

/*
*	 Get all uploaded images from cloudinary server
*	@params req, res
*	@return {String}
*/
exports.index = function(req, res) {
  	
	// get list of uploaded images
  	cloudinary.api.resources(function (results)	{ 
  		var resultArray = [];

  		// if has options, get a version with the passed options
  		if(req.query) {
	  		results.resources.forEach(function (result) {
	  			resultArray.push(cloudinary.image(result.public_id, req.query));
	  		});
  		} else {
  			results.resources.forEach(function (result) {
	  			resultArray.push('<img src="' + result.url + '">');
	  		});
  		}

  		res.send(resultArray);
  	});
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