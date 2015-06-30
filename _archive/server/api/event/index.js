'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();

/**
 * @api {get} /event Request a list of events
 * @apiName GetEvent
 * @apiGroup Event
 */
router.get('/', controller.index);

/**
 * @api {get} /event/:id Get a specific event
 * @apiName GetEventID
 * @apiGroup Event
 */
router.get('/:id', controller.show);

/**
 * @api {post} /event Create an event.
 * @apiName PostEvent
 * @apiGroup Event
 */
router.post('/', controller.create);

/**
 * @api {put} /event/:id Updates an event.
 * @apiName PutEvent
 * @apiGroup Event
 */
router.put('/:id', controller.update);

/**
 * @api {delete} /event/:id Remove an event.
 * @apiName DeleteEvent
 * @apiGroup Event
 */
router.delete('/:id', controller.destroy);

module.exports = router;