﻿;
goog.provide('pn.ui.grid.pipe.HandlerPipeline');



/**
 * @constructor
 * @extends {goog.Disposable}
 */
pn.ui.grid.pipe.HandlerPipeline = function() {
  goog.Disposable.call(this);
  /**
   * @private
   * @type {!Array.<!pn.ui.grid.pipe.GridHandler>}
   */
  this.handlers_ = [];

  /**
   * @private
   * @type {boolean}
   */
  this.initialised_ = false;

  /**
   * @private
   * @type {boolean}
   */
  this.eventsRegistered_ = false;
};
goog.inherits(pn.ui.grid.pipe.HandlerPipeline, goog.Disposable);


/**
 * @param {!pn.ui.grid.pipe.GridHandler} handler The handler to add to the end
 *    of the pipeline.
 */
pn.ui.grid.pipe.HandlerPipeline.prototype.add = function(handler) {
  goog.asserts.assert(handler);

  this.registerDisposable(handler);

  this.handlers_.push(handler);
};


/**
 * @param {!pn.ui.grid.pipe.GridHandler} handler The handler to insert at the
 *    specified index in the pipeline.
 * @param {number} index The index to insert the handler at.
 */
pn.ui.grid.pipe.HandlerPipeline.prototype.insertAt = function(handler, index) {
  goog.asserts.assert(handler);
  goog.asserts.assert(index >= 0 && index <= this.handlers_.length);

  this.registerDisposable(handler);

  goog.array.insertAt(this.handlers_, handler, index);
};


/**
 * Initialises all the handlers in this pipeline. This method should only
 *    ever be called once.
 * @param {Slick.Grid} slick The reference to the slick grid being shown.
 * @param {pn.ui.grid.DataView} view The data view being shown.
 * @param {pn.ui.grid.Config} cfg The grid configuration being used.
 * @param {!Array.<!pn.ui.grid.ColumnCtx>} cctxs The column contexts being
 *    displayed.
 */
pn.ui.grid.pipe.HandlerPipeline.prototype.init =
    function(slick, view, cfg, cctxs) {
  goog.asserts.assert(!this.initialised_);
  this.initialised_ = true;
  goog.array.forEach(this.handlers_, function(h) {
    h.setMembers(slick, view, cfg, cctxs, this);
    h.init();
  }, this);
};


/**
 * @param {string} eventType The type of event to fire.
 * @param {*=} opt_data  The optional data object to pass to the event
 *    handlers.
 */
pn.ui.grid.pipe.HandlerPipeline.prototype.fireCustomEvent =
    function(eventType, opt_data) {
  goog.asserts.assert(eventType);

  goog.array.forEach(this.handlers_, function(h) {
    h.onCustomEvent(eventType, opt_data);
  });
};
