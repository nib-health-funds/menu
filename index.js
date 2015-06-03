var View = require('view');

module.exports = View.extend({

  events: {
    'blur':                     'emit:blurred',
    'focus':                    'emit:focused',
    'keydown':                  'onKeyDown',
    'mouseenter [data-value]':  'onMouseEnter',
    'mouseup [data-value]':     'onMouseUp'
  },

  elements: {
    '[data-value]':             'all:itemEls'
  },

  /**
   * Initialise the menu
   */
  init: function() {

    //make the menu element focusable
    this.el.tabIndex = -1;

    //set the focused menu item
    this.focused = null;

    //TODO: check items are only immediate children to allow nested menus?
    this.itemEls = Array.prototype.slice.call(this.itemEls, 0);

  },

  /**
   * Open the menu
   * @returns {exports}
   */
  open: function() {
    this.emit('opening');

    //show the menu
    this.el.classList.add('is-open');

    //focus the menu
    this.el.focus();

    this.emit('opened');
    return this;
  },

  /**
   * Close the menu
   * @returns {exports}
   */
  close: function() {
    this.emit('closing');

    //hide the menu
    this.el.classList.remove('is-open');

    this.emit('closed');
    return this;
  },

  /**
   * Toggle whether the menu is opened or closed
   * @returns {exports}
   */
  toggle: function() {
    if (this.el.classList.contains('is-open')) {
      this.close();
    } else {
      this.open();
    }
    return this;
  },

  /**
   * Focus a the menu item at the specified index
   * @param   {Number|string|null} index
   * @returns {exports}
   */
  focus: function(index) {

    if (index === null || index === -1) {
      this.focused = null;
    }

    for (var i=0; i<this.itemEls.length; ++i) {
      var item = this.itemEls[i];
      
      if (typeof(index) === 'number') {
        if (index === i) {
          this.focused = item;
          item.classList.add('is-focused');
        } else {
          item.classList.remove('is-focused');
        }
      } else {
        if (index === item.getAttribute('data-value')) {
          this.focused = item;
          item.classList.add('is-focused');
        } else {
          item.classList.remove('is-focused');
        }
      }

    }

    return this
  },

  /**
   * The menu items
   * @return  {Array.<string>}
   */
  items: function() {
    return this.itemEls.map(function(item) {
      return {
        label: item.innerHTML,
        value: item.getAttribute('data-value')
      };
    });
  },

  /**
   * The menu item values
   * @return  {Array.<string>}
   */
  values: function() {
    return this.itemEls.map(function(item) {
      return item.getAttribute('data-value');
    });
  },

  /**
   * The menu item labels
   * @return  {Array.<string>}
   */
  labels: function() {
    return this.itemEls.map(function(item) {
      return item.innerHTML;
    });
  },

  onMouseEnter: function(event) {
    if (this.itemEls.indexOf(event.target) !== -1) {
      var item = event.target;
      this.emit('focus-item', {label: item.innerHTML, value: item.getAttribute('data-value')}, this.itemEls.indexOf(item));
    }
  },

  /**
   * Handle mouse up events
   * @param event
   */
  onMouseUp: function(event) {
    if (this.itemEls.indexOf(event.target) !== -1) {

      if (this.focused) {
        var item = this.focused;
        this.emit('select-item', {label: item.innerHTML, value: item.getAttribute('data-value')}, this.itemEls.indexOf(item));
      }

    }
  },

  /**
   * Handle key events
   * @param event
   */
  onKeyDown: function(event) {
    var key = event.which || event.keyCode;

    if (key === 9 || key === 13) { //tab or enter
      event.preventDefault(); //prevent enter from bubling up to the button or parent element

      //select the focused menu item and close the menu
      if (this.focused) {
        var item = this.focused;
        this.emit('select-item', {label: item.innerHTML, value: item.getAttribute('data-value')}, this.itemEls.indexOf(item));
      }

    } else if (key === 38) { //up arrow

      //focus the prev menu item
      var i = this.itemEls.indexOf(this.focused);
      if (i > 0) {
        var item = this.itemEls[i-1];
        this.emit('focus-item', {label: item.innerHTML, value: item.getAttribute('data-value')}, i-1);
      }

    } else if (key === 40) { //down arrow

      //focus the next menu item
      var i = this.itemEls.indexOf(this.focused);
      if (i >= 0 && i < this.itemEls.length-1) {
        var item = this.itemEls[i+1];
        this.emit('focus-item', {label: item.innerHTML, value: item.getAttribute('data-value')}, i+1);
      }

    }

  }

});
