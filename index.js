var View = require('view');

module.exports = View.extend({

  events: {
    'blur':                     'emit:cancel',
    'keydown':                  'onKeyDown',
    'mousemove':                'onMouseMove',
    'mouseup':                  'onMouseUp'
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
    this.itemEls = Array.prototype.slice.call(this.el.children, 0);

  },

  /**
   * Get whether the menu is open
   * @returns {boolean}
   */
  isOpen: function() {
    return this.el.classList.contains('is-open');
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
    var self = this;
    setTimeout(function() { //HACK: solves bugs with blur issues
      self.el.focus();
    }, 0);

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
    this.focused = null;

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
   * Get a single menu item by index or value
   * @param   {Number|string}  value
   * @return  {Object|null}
   */
  item: function(value) {

    if (typeof(value) === 'number') {

      var itemEl = this.itemEls[value];
      return {
        label: itemEl.innerHTML,
        value: itemEl.getAttribute('data-value')
      };

    } else {

      for (var i=0; i<this.itemEls.length; ++i) {
        var itemEl = this.itemEls[i];
        if (itemEl.getAttribute('data-value') === value) {
          return {
            label: itemEl.innerHTML,
            value: itemEl.getAttribute('data-value')
          };
        }
      }

      return null;
    }

  },

  /**
   * Get all the menu items
   * @return  {Array.<Object>}
   */
  items: function(value) {
    return this.itemEls.map(function(itemEl) {
      return {
        label: itemEl.innerHTML,
        value: itemEl.getAttribute('data-value')
      };
    });
  },

  /**
   * Get all the menu item labels
   * @return  {Array.<string>}
   */
  labels: function() {
    return this.itemEls.map(function(itemEl) {
      return itemEl.innerHTML;
    });
  },

  /**
   * Get a single menu item label by index or value
   * @param   {Number}  index
   * @return  {string|null}
   */
  label: function(value) {
    if (typeof(value) === 'number') {
      return this.itemEls[value].innerHTML;
    } else {

      for (var i=0; i<this.itemEls.length; ++i) {
        var itemEl = this.itemEls[i];
        if (itemEl.getAttribute('data-value') === value) {
          return itemEl.innerHTML;
        }
      }

      return null;
    }
  },

  /**
   * Get all the menu item values
   * @return  {Array.<string>}
   */
  values: function() {
    return this.itemEls.map(function(itemEl) {
      return itemEl.getAttribute('data-value');
    });
  },

  /**
   * Get a single menu item value by index
   * @param   {Number}  index
   * @return  {string|null}
   */
  value: function(index) {
    if (this.itemEls[index]) {
      return this.itemEls[index].getAttribute('data-value');
    }
    return null;
  },

  onMouseMove: function(event) {
    if (this.itemEls.indexOf(event.target) !== -1) {
      var item = event.target;
      if (!item.classList.contains('is-focused')) { //only emit if the item is not already focused
        this.emit('focus-item', {label: item.innerHTML, value: item.getAttribute('data-value')}, this.itemEls.indexOf(item));
      }
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

    } else if (key === 27) { //esc
      this.emit('cancel');
    }

  }

});
