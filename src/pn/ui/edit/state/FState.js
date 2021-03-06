﻿;
goog.provide('pn.ui.edit.state.FState');

goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');
goog.require('pn.ui.edit.state.Provider');



/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {!Array.<string>} ids The field ids in this Edit control.
 * @param {!pn.ui.edit.state.Provider} provider The control value evaluator.
 */
pn.ui.edit.state.FState = function(ids, provider) {
  pn.assArr(ids, 'ids should be an array of strings');
  pn.assInst(provider, pn.ui.edit.state.Provider);

  goog.events.EventTarget.call(this);

  /**
   * @const
   * @private
   * @type {!pn.ui.edit.state.Provider}
   */
  this.provider_ = provider;

  /**
   * @private
   * @type {!Object.<pn.ui.edit.state.FState.Field>}
   */
  this.fields_ = ids.pntoMap(undefined,
      pn.ui.edit.state.FState.FieldDefault_.clone);

  /**
   * @private
   * @type {!Object.<pn.ui.edit.state.FState.Field>}
   */
  this.last_ = /** @type {!Object.<pn.ui.edit.state.FState.Field>} */ (
      goog.object.unsafeClone(this.fields_));
};
goog.inherits(pn.ui.edit.state.FState, goog.events.EventTarget);


/**
 * @typedef {{
 *    readonly:boolean,
 *    required:boolean,
 *    enabled: boolean,
 *    visible: boolean,
 *    value: *
 * }} */
pn.ui.edit.state.FState.Field;


/**
 * @private
 * @type {pn.ui.edit.state.FState.Field}
 */
pn.ui.edit.state.FState.FieldDefault_ = {
  required: false,
  readonly: false,
  enabled: true,
  visible: true,
  value: null,
  /** @return {!pn.ui.edit.state.FState.Field} A clone of the defaults. */
  clone: function() {
    return {
      required: false,
      readonly: false,
      enabled: true,
      visible: true,
      value: null
    };
  }
};


/** @type {string} The event fired on change */
pn.ui.edit.state.FState.CHANGED = 'fields-state-changed';

////////////////////////////////////////////////////////////////////////////////
// READONLY
////////////////////////////////////////////////////////////////////////////////


/** @return {!Array.<string>} The ids in this state manager. */
pn.ui.edit.state.FState.prototype.getIds = function() {
  return goog.object.getKeys(this.fields_);
};


/**
 * @param {string} id The ID of the field.
 * @return {boolean} Wether the specified field is readonly.
 */
pn.ui.edit.state.FState.prototype.isReadOnly = function(id) {
  return this.field_(id).readonly;
};


/**
 * @param {string} id The ID of the field.
 * @param {boolean} value The readonly state of the field.
 */
pn.ui.edit.state.FState.prototype.setReadOnly = function(id, value) {
  pn.assBool(value);
  this.field_(id).readonly = value;

  this.fire_();
};


////////////////////////////////////////////////////////////////////////////////
// REQUIRED
////////////////////////////////////////////////////////////////////////////////


/**
 * @param {string} id The ID of the field.
 * @return {boolean} Wether the specified field is required.
 */
pn.ui.edit.state.FState.prototype.isRequired = function(id) {
  return this.field_(id).required;
};


/**
 * @param {string} id The ID of the field.
 * @param {boolean} value The required state of the field.
 */
pn.ui.edit.state.FState.prototype.setRequired = function(id, value) {
  pn.assStr(id);
  pn.assBool(value);
  this.field_(id).required = value;

  this.fire_();
};

////////////////////////////////////////////////////////////////////////////////
// ENABLED
////////////////////////////////////////////////////////////////////////////////


/**
 * @param {string} id The ID of the field.
 * @return {boolean} Wether the specified field is enabled.
 */
pn.ui.edit.state.FState.prototype.isEnabled = function(id) {
  return this.field_(id).enabled;
};


/**
 * @param {string} id The ID of the field.
 * @param {boolean} value The enabled state of the field.
 */
pn.ui.edit.state.FState.prototype.setEnabled = function(id, value) {
  pn.assBool(value);
  this.field_(id).enabled = value;

  this.fire_();
};

////////////////////////////////////////////////////////////////////////////////
// VISIBLE
////////////////////////////////////////////////////////////////////////////////


/**
 * @param {string} id The ID of the field.
 * @return {boolean} Wether the specified field is visible.
 */
pn.ui.edit.state.FState.prototype.isVisible = function(id) {
  return this.field_(id).visible;
};


/**
 * @param {string} id The ID of the field.
 * @param {boolean} value The visible state of the field.
 */
pn.ui.edit.state.FState.prototype.setVisible = function(id, value) {
  pn.assBool(value);
  this.field_(id).visible = value;

  this.fire_();
};

////////////////////////////////////////////////////////////////////////////////
// VALUE
////////////////////////////////////////////////////////////////////////////////


/**
 * @param {string} id The ID of the field.
 * @return {*} The value of the specified field.
 */
pn.ui.edit.state.FState.prototype.getValue = function(id) {
  return this.provider_.getValue(id);
};


/**
 * @param {string} id The ID of the field.
 * @param {*} value The value of the specified field to set.
 */
pn.ui.edit.state.FState.prototype.setValue = function(id, value) {
  pn.assStr(id);
  pn.assObj(this.field_(id), 'Could not find field: ' + id);

  this.provider_.setValue(id, value);
  this.fire_();
};


/**
 * @param {string} id The ID of the field.
 * @return {!(Element|Text|goog.ui.Component)} The control representing the
 *    specified field.
 */
pn.ui.edit.state.FState.prototype.getControl = function(id) {
  pn.assStr(id);
  pn.assObj(this.field_(id), 'Could not find field: ' + id);

  return this.provider_.getControl(id);
};


/**
 * @param {string} id The ID of the field.
 * @return {!pn.ui.edit.FieldCtx} The field context for the specified field.
 */
pn.ui.edit.state.FState.prototype.getCtx = function(id) {
  pn.assStr(id);
  pn.assObj(this.field_(id), 'Could not find field: ' + id);

  return this.provider_.getCtx(id);
};

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPERS
////////////////////////////////////////////////////////////////////////////////


/**
 * @private
 * @param {string} id The ID of the field.
 * @return {!pn.ui.edit.state.FState.Field} The field specified.
 */
pn.ui.edit.state.FState.prototype.field_ = function(id) {
  pn.assStr(id);
  pn.assObj(this.fields_[id], 'Could not find field: ' + id);
  return this.fields_[id];
};


/** @private */
pn.ui.edit.state.FState.prototype.fire_ = function() {
  var changes = this.diff_();
  if (!changes) return;
  var event = new goog.events.Event(pn.ui.edit.state.FState.CHANGED);
  event.changes = changes;
  this.last_ = /** @type {!Object.<pn.ui.edit.state.FState.Field>} */ (
      goog.object.unsafeClone(this.fields_));
  this.dispatchEvent(event);
};


/**
 * @private
 * @return {Object.<pn.ui.edit.state.FState.Field>}
 *    Any changes since last fire.  Null if no changes.
 */
pn.ui.edit.state.FState.prototype.diff_ = function() {
  var diff = null;
  goog.object.forEach(this.fields_, function(v, id) {
    var old = this.last_[id];
    if (!old) throw new Error('Could not find field: ' + id);
    if (old.readonly !== v.readonly ||
        old.required !== v.required ||
        old.enabled !== v.enabled ||
        old.visible !== v.visible ||
        old.value !== v.value) {
      if (!diff) diff = {};
      diff[id] = v;
    }
  }, this);
  return diff;
};
