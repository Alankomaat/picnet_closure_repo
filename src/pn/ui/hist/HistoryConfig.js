﻿;
goog.provide('pn.ui.hist.HistoryConfig');

goog.require('pn.ui.edit.soy.history');



/**
 * @constructor
 * @extends {goog.Disposable}
 * @param {!pn.ui.UiSpec} spec The entity spec being shown.
 * @param {!pn.lrs.dal.DalCache} cache The current context cache.
 * @param {!Array.<!pn.lrs.dal.ChangeLogEntry>} changes The changes (audit
 *    entries) to display.
 */
pn.ui.hist.HistoryConfig = function(spec, cache, changes) {
  goog.Disposable.call(this);

  pn.assInst(spec, pn.ui.UiSpec);
  pn.assInst(cache, pn.lrs.dal.DalCache);
  pn.assArr(changes);

  /**
   * @const
   * @type {!pn.ui.UiSpec}
   */
  this.spec = spec;
  this.registerDisposable(this.spec);

  /**
   * @const
   * @type {!pn.lrs.dal.DalCache}
   */
  this.cache = cache;

  /**
   * @const
   * @type {!Array.<!pn.lrs.dal.ChangeLogEntry>}
   */
  this.changes = changes;

};
goog.inherits(pn.ui.hist.HistoryConfig, goog.Disposable);


/**
 * @param {pn.data.Entity} e The entity being displayed.
 * @return {string} The heading for the specified entity.  The default
 *    implementation returns the EntityType + Name field or simply the 'ID'.
 *    Override to change.
 */
pn.ui.hist.HistoryConfig.prototype.getHeading = function(e) {
  pn.assInst(e, pn.data.Entity);

  if (!e) { return ''; }
  if (e[this.spec.type + 'Name']) {
    return 'History - ' + e[this.spec.type + 'Name'];
  }
  return 'History - ID: ' + e['ID'];
};


/** @return {!Array.<pn.ui.edit.FieldCtx>} The fields to display in the history
 *   display. */
pn.ui.hist.HistoryConfig.prototype.getFields = function() {
  var ctor = pn.data.TypeRegister.fromName(this.spec.type);
  var c = this.spec.getEditConfig(new ctor({'ID': 0}), this.cache);
  var fields = c.fCtxs;
  goog.dispose(c);
  return fields;
};


/** @return {string} The html for the HistoryViewer control.  See
 *    HistoryViewer.js for details on what is expected of this template. */
pn.ui.hist.HistoryConfig.prototype.getTemplate = function() {
  return pn.ui.edit.soy.history.page();
};