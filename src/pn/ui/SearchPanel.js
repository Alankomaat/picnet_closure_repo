﻿;
goog.provide('pn.ui.SearchPanel');

goog.require('goog.dom');
goog.require('goog.events.Event');
goog.require('goog.events.EventHandler');
goog.require('goog.fx.dom.ResizeHeight');
goog.require('goog.net.cookies');
goog.require('goog.ui.Button');
goog.require('goog.ui.Component');
goog.require('goog.ui.Component.EventType');
goog.require('pn.ui.edit.FieldBuilder');
goog.require('pn.ui.grid.Column');
goog.require('pn.ui.grid.Config');
goog.require('pn.ui.grid.Grid');
goog.require('pn.ui.grid.Grid.EventType');



/**
 *
 * @constructor
 * @extends {goog.ui.Component}
 * @param {!Object.<string>} filters The id/caption map to show in the filter
 *    list.
 * @param {!Object.<Array>} cache The entities cache used for showin parental
 *    properties in the filters.
 */
pn.ui.SearchPanel = function(filters, cache) {
  goog.asserts.assert(filters);
  goog.asserts.assert(cache);

  goog.ui.Component.call(this);

  /**
   * @private
   * @type {!Object.<string>}
   */
  this.filters_ = filters;

  /**
   * @private
   * @type {!Object.<Array>}
   */
  this.cache_ = cache;

  /**
   * @private
   * @type {Element}
   */
  this.select_ = null;

  /**
   * @private
   * @type {Element}
   */
  this.clear_ = null;

  /**
   * @private
   * @type {Element}
   */
  this.go_ = null;

  /**
   * @private
   * @type {Element}
   */
  this.searchPanel_ = null;

  /**
   * @private
   * @type {Element}
   */
  this.controlsPanel_ = null;

  /**
   * @private
   * @type {Element}
   */
  this.filtersPanel_ = null;

  /**
   * @private
   * @type {Element}
   */
  this.toggle_ = null;

  /**
   * @private
   * @type {goog.fx.dom.ResizeHeight}
   */
  this.resizeShow_ = null;

  /**
   * @private
   * @type {goog.fx.dom.ResizeHeight}
   */
  this.resizeHide_ = null;

  /**
   * @private
   * @type {number}
   */
  this.panelHeight_ = 170;

  /**
   * @private
   * @type {!Object.<string, !Array.<!(Element|goog.ui.Component)>>}
   */
  this.filtersControls_ = {};

  /**
   * @private
   * @type {!goog.events.EventHandler}
   */
  this.eh_ = new goog.events.EventHandler(this);

  /**
   * @private
   * @type {goog.debug.Logger}
   */
  this.log_ = pn.LogUtils.getLogger('pn.ui.SearchPanel');
};
goog.inherits(pn.ui.SearchPanel, goog.ui.Component);


/** @type {string} */
pn.ui.SearchPanel.SEARCH = 'search';


/** @inheritDoc */
pn.ui.SearchPanel.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('div'));
};


/** @inheritDoc */
pn.ui.SearchPanel.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);

  var visible = goog.net.cookies.get('search-panel-visible') !== 'false';
  var msg = visible ? 'Hide Filters' : 'Show Filters';
  this.toggle_ = goog.dom.createDom('a', 'search-toggle', msg);
  this.searchPanel_ = goog.dom.createDom('div', 'search-panel');
  goog.style.setHeight(this.searchPanel_, visible ? 'auto' : 0);

  this.createActionControls_(this.searchPanel_);
  this.createFieldValueEdit_(this.searchPanel_);
  goog.dom.appendChild(element, this.searchPanel_);
  goog.dom.appendChild(element, this.toggle_);
};


/**
 * @private
 * @param {!Element} parent The parent for this panel.
 */
pn.ui.SearchPanel.prototype.createActionControls_ = function(parent) {
  this.controlsPanel_ = goog.dom.createDom('div', 'controls-panel');
  goog.dom.appendChild(parent, this.controlsPanel_);

  this.select_ = goog.dom.createDom('select', 'search-select');
  goog.dom.appendChild(this.controlsPanel_, this.select_);

  this.populateFieldSelect_();
  this.clear_ = goog.dom.createDom('div', 'button clear-filters', 'Clear');
  goog.dom.appendChild(this.controlsPanel_, this.clear_);

  this.go_ = goog.dom.createDom('div', 'button go-filters', 'Go!');
  goog.dom.appendChild(this.controlsPanel_, this.go_);
};


/** @private */
pn.ui.SearchPanel.prototype.populateFieldSelect_ = function() {
  goog.dom.removeChildren(this.select_);
  goog.dom.appendChild(this.select_, goog.dom.createDom('option',
      {'value': ''}, 'Select a field to filter by'));

  var options = [];
  for (var fid in this.filters_) {
    var name = this.filters_[fid];
    options.push(goog.dom.createDom('option', {'value': fid}, name));
  }

  goog.array.sortObjectsByKey(options, 'innerHTML');
  goog.array.forEach(options, function(o) {
    goog.dom.appendChild(this.select_, o);
  }, this);
};


/**
 * @private
 * @param {!Element} parent The parent for this panel.
 */
pn.ui.SearchPanel.prototype.createFieldValueEdit_ = function(parent) {
  this.filtersPanel_ = goog.dom.createDom('div', 'filters-panel');
  goog.dom.appendChild(parent, this.filtersPanel_);
};


/** @inheritDoc */
pn.ui.SearchPanel.prototype.enterDocument = function() {
  pn.ui.SearchPanel.superClass_.enterDocument.call(this);

  var et = goog.events.EventType;
  this.eh_.listen(this.toggle_, et.CLICK, this.toggleFiltersPanel_);
  this.eh_.listen(this.go_, et.CLICK, this.doSearch_);
  this.eh_.listen(this.clear_, et.CLICK, this.doClear_);
  this.eh_.listen(this.select_, et.CHANGE, this.filterSelected_);
};


/** @private */
pn.ui.SearchPanel.prototype.toggleFiltersPanel_ = function() {
  var showing = this.toggle_.innerHTML === 'Show Filters';
  if (!showing) {
    this.panelHeight_ = goog.style.getSize(this.searchPanel_).height;
  }
  goog.net.cookies.set('search-panel-visible', showing.toString());
  if (!this.resizeShow_) {
    var dur = 175;
    var rh = goog.fx.dom.ResizeHeight;
    this.resizeShow_ = new rh(this.searchPanel_, 0, this.panelHeight_, dur);
    this.resizeHide_ = new rh(this.searchPanel_, this.panelHeight_, 0, dur);
    var endEventType = goog.fx.Transition.EventType.END;
    this.eh_.listen(this.resizeShow_, endEventType, goog.bind(function() {
      goog.style.setHeight(this.searchPanel_, 'auto');
    }, this));
  } else {
    this.resizeHide_.start = this.panelHeight_;
    this.resizeShow_.end = this.panelHeight_;
  }
  this.toggle_.innerHTML = showing ? 'Hide Filters' : 'Show Filters';
  (!showing ? this.resizeShow_ : this.resizeHide_).stop(true);
  (showing ? this.resizeShow_ : this.resizeHide_).play(true);
};


/** @private */
pn.ui.SearchPanel.prototype.doSearch_ = function() {
  var filters = {};
  for (var cid in this.filtersControls_) {
    var control = this.filtersControls_[cid][0];
    var val = pn.ui.edit.FieldBuilder.getFieldValue(control);

    // Ensure that all parent lists select whole text field (not just part)
    if (control.options && goog.isString(val)) val = [val];

    if (!goog.isDefAndNotNull(val) ||
        val === '' ||
        val === '0') continue;
    if (goog.isArray(val)) {
      if (val.length === 0) continue;
      if (val.length === 1 && val[0] === '0') continue;
    }
    filters[cid] = goog.isString(val) ? val.toString() : val;
  }
  var event = new goog.events.Event(pn.ui.SearchPanel.SEARCH, this);
  event.filters = filters;
  this.dispatchEvent(event);
};


/** @private */
pn.ui.SearchPanel.prototype.doClear_ = function() {
  goog.dom.removeChildren(this.filtersPanel_);
  goog.object.forEach(this.filtersControls_, function(arr) {
    goog.array.forEach(arr, function(c) { this.eh_.unlisten(c, null); }, this);
    goog.array.forEach(arr, goog.dispose);
  }, this);
  this.filtersControls_ = {};
  this.populateFieldSelect_();
  this.doSearch_();
};


/** @private */
pn.ui.SearchPanel.prototype.filterSelected_ = function() {
  var option = this.select_.options[this.select_.selectedIndex];
  var val = option.value;
  if (!val) return;
  var specid = val.substring(0, val.indexOf('.'));
  var fieldId = val.substring(val.indexOf('.') + 1);
  var spec = pn.rcdb.Global.getSpec(specid);
  var field = /** @type {pn.ui.edit.Field} */ (goog.array.find(
      spec.getSearchFields(), function(f) {
        return f.id === fieldId;
      }));
  if (!field) throw new Error('Could not find the specified field: ' + fieldId +
      ' in the searcheable fields of the ' + spec.id + ' spec');
  this.select_.selectedIndex = 0;
  this.addFieldToTheFiltersSearch_(spec, field, option);
  goog.style.showElement(option, false);
  this.panelHeight_ = goog.style.getSize(this.searchPanel_).height;
};


/**
 * @private
 * @param {!pn.rcdb.ui.specs.SpecsBase} spec The spec (tab) of the selected
 *    filter.
 * @param {pn.ui.edit.Field} f The field to add to the search.
 * @param {!Element} option The select option element representing this option.
 */
pn.ui.SearchPanel.prototype.addFieldToTheFiltersSearch_ =
    function(spec, f, option) {
  goog.asserts.assert(spec);
  goog.asserts.assert(f);
  goog.asserts.assert(option);

  var remove = goog.dom.createDom('div', { 'class': 'remove' }, 'Remove');
  var name = spec.name + ' - ' + f.name;
  var lbl = goog.dom.createDom('label', { 'for': f.id }, name);
  var dom = goog.dom.createDom('div', { 'class': f.className || 'field' },
      lbl,
      remove);
  goog.dom.appendChild(this.filtersPanel_, dom);
  var input;
  if (f.renderer === pn.ui.edit.FieldRenderers.readOnlyTextField &&
      f.id !== 'ID') {
    input = pn.ui.edit.FieldBuilder.createParentEntitySelect(
        f, -1, this.cache_, true);
    goog.dom.appendChild(dom, input);
  } else {
    input = pn.ui.edit.FieldBuilder.createAndAttach(
        f, dom, null, this.cache_, true);
  }
  this.filtersControls_[f.id] = [input, remove, lbl, dom];

  this.eh_.listen(remove, goog.events.EventType.CLICK, function() {
    goog.dom.removeNode(dom);
    var arr = this.filtersControls_[f.id];
    goog.array.forEach(arr, function(c) { this.eh_.unlisten(c, null); }, this);
    goog.array.forEach(arr, goog.dispose);
    delete this.filtersControls_[f.id];
    goog.style.showElement(option, true);
    this.doSearch_();
  });
};


/** @inheritDoc */
pn.ui.SearchPanel.prototype.disposeInternal = function() {
  pn.ui.SearchPanel.superClass_.disposeInternal.call(this);

  this.eh_.removeAll();
  goog.dispose(this.eh_);
  goog.dispose(this.log_);
  goog.dispose(this.select_);
  goog.dispose(this.clear_);
  goog.dispose(this.go_);
  goog.dispose(this.filtersPanel_);
  goog.dispose(this.controlsPanel_);
  goog.dispose(this.searchPanel_);
  goog.dispose(this.toggle_);
  goog.dispose(this.resizeShow_);
  goog.dispose(this.resizeHide_);

  goog.object.forEach(this.filtersControls_, function(arr) {
    goog.array.forEach(arr, function(c) { this.eh_.unlisten(c, null); }, this);
    goog.array.forEach(arr, goog.dispose);
  }, this);

  delete this.filters_;
  delete this.cache_;
  delete this.filtersControls_;
  delete this.eh_;
  delete this.log_;
  delete this.select_;
  delete this.clear_;
  delete this.go_;
  delete this.filtersPanel_;
  delete this.controlsPanel_;
  delete this.searchPanel_;
  delete this.toggle_;
  delete this.resizeShow_;
  delete this.resizeHide_;
};
