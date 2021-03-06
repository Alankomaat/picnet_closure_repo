﻿;
goog.provide('pn.ui.MessagePanel');

goog.require('goog.Timer');
goog.require('goog.dom');



/**
 * @constructor
 * @extends {goog.Disposable}
 * @param {!Element} panel The panel to use to display the messages/errors.
 */
pn.ui.MessagePanel = function(panel) {
  goog.Disposable.call(this);

  /**
   * @private
   * @type {!Element}
   */
  this.panel_ = panel;

  /**
   * @private
   * @type {string}
   */
  this.originalClass_ = this.panel_.className;

  /**
   * @private
   * @type {number}
   */
  this.showMessageTimer_ = 0;

  /**
   * @private
   * @type {goog.debug.Logger}
   */
  this.log_ = pn.log.getLogger('pn.ui.MessagePanel');
};
goog.inherits(pn.ui.MessagePanel, goog.Disposable);


/**
 * Clears the message panel and resets to original class.
 */
pn.ui.MessagePanel.prototype.clearMessage = function() {
  this.showMessage_('');
};


/**
 * @param {string} message The error to display.
 */
pn.ui.MessagePanel.prototype.showError = function(message) {
  this.showMessage_('<p>' + message + '</p>', 'error');
};


/**
 * @param {Array.<string>} list The error list to display.
 */
pn.ui.MessagePanel.prototype.showErrors = function(list) {
  this.showList_(list, 'error');
};


/**
 * @param {string} message The error to display.
 */
pn.ui.MessagePanel.prototype.showWarning = function(message) {
  this.showMessage_('<p>' + message + '</p>', 'warning');
};


/**
 * @param {Array.<string>} list The error list to display.
 */
pn.ui.MessagePanel.prototype.showWarnings = function(list) {
  this.showList_(list, 'warning');
};


/**
 * @param {string} message The message to display.
 */
pn.ui.MessagePanel.prototype.showMessage = function(message) {
  this.showMessage_('<p>' + message + '</p>', 'info');
};


/**
 * @param {Array.<string>} list The message list to display.
 */
pn.ui.MessagePanel.prototype.showMessages = function(list) {
  this.showList_(list, 'info');
};


/**
 * @private
 * @param {Array.<string>} list The message list to display.
 * @param {string} cls The class of the messages to displahy (error,
 *    warning, info)
 */
pn.ui.MessagePanel.prototype.showList_ = function(list, cls) {
  pn.ass(list.length);
  pn.assStr(list[0]);

  if (list.length === 1)
    this.showMessage_('<p>' + list[0] + '</p>', cls);
  else
    this.showMessage_('<ul><li>' + list.join('</li><li>') + '</li></ul>', cls);
};


/**
 * @private
 * @param {string} message The message to display.
 * @param {string=} opt_clazz The class to use on the panel.
 */
pn.ui.MessagePanel.prototype.showMessage_ = function(message, opt_clazz) {
  this.log_.finest('showMessage message[' + message + ']');
  if (this.showMessageTimer_) { goog.Timer.clear(this.showMessageTimer_); }
  this.panel_.innerHTML = message;
  var newClass = this.originalClass_;
  if (newClass) newClass += ' ';
  if (opt_clazz) newClass += opt_clazz;
  this.panel_.className = newClass;
  var visible = !!message;
  pn.dom.show(this.panel_, visible);
  if (visible) {
    this.showMessageTimer_ = goog.Timer.callOnce(function() {
      this.showMessage_('');
    }, 3000, this);
  }
};


/** @override */
pn.ui.MessagePanel.prototype.disposeInternal = function() {
  pn.ui.MessagePanel.superClass_.disposeInternal.call(this);
  delete this.panel_;
};
