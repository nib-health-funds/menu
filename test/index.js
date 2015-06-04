var assert = require('assert');
var Menu = require('..');

function createMenu() {
  var el = document.createElement('div');
  el.innerHTML = [
    '<div>Select a language...</div>',
    '<div data-value="c#">C#</div>',
    '<div data-value="go">Go</div>',
    '<div data-value="js">JavaScript</div>',
    '<div data-value="php">PHP</div>',
    '<div data-value="ruby">Ruby</div>',
  ].join('\n');
  return new Menu({el: el});
}

var menu;

describe('Menu', function() {

  beforeEach(function() {
    menu = createMenu();
  });

  afterEach(function() {
    menu = null;
  });

  describe('.item(index)', function() {

    it('should return the first item', function() {

      var item = menu.item(0);

      assert.equal(item.value, null);
      assert.equal(item.label, 'Select a language...');

    });

    it('should return the second item', function() {

      var item = menu.item(1);

      assert.equal(item.value, 'c#');
      assert.equal(item.label, 'C#');

    });

    it('should return the fourth item', function() {

      var item = menu.item(3);

      assert.equal(item.value, 'js');
      assert.equal(item.label, 'JavaScript');

    });

    it('should return the last item', function() {

      var item = menu.item(5);

      assert.equal(item.value, 'ruby');
      assert.equal(item.label, 'Ruby');

    });

  });

  describe('.item(value)', function() {

    it('should return the first item', function() {

      var item = menu.item(null);

      assert.equal(item.value, null);
      assert.equal(item.label, 'Select a language...');

    });

    it('should return the second item', function() {

      var item = menu.item('c#');

      assert.equal(item.value, 'c#');
      assert.equal(item.label, 'C#');

    });

    it('should return the fourth item', function() {

      var item = menu.item('js');

      assert.equal(item.value, 'js');
      assert.equal(item.label, 'JavaScript');

    });

    it('should return the last item', function() {

      var item = menu.item('ruby');

      assert.equal(item.value, 'ruby');
      assert.equal(item.label, 'Ruby');

    });

  });

  describe('.items()', function() {

    it('should return an array of items', function() {

      var items = menu.items();

      assert.equal(items.length, 6);

      assert.equal(items[0].value, null);
      assert.equal(items[0].label, 'Select a language...');

      assert.equal(items[1].value, 'c#');
      assert.equal(items[1].label, 'C#');

      assert.equal(items[3].value, 'js');
      assert.equal(items[3].label, 'JavaScript');

      assert.equal(items[5].value, 'ruby');
      assert.equal(items[5].label, 'Ruby');

    });

  });

  describe('.label(index)', function() {

    it('should return the first label', function() {

      var label = menu.label(0);
      assert.equal(label, 'Select a language...');

    });

    it('should return the second label', function() {

      var label = menu.label(1);
      assert.equal(label, 'C#');

    });

    it('should return the fourth label', function() {

      var label = menu.label(3);
      assert.equal(label, 'JavaScript');

    });

    it('should return the last label', function() {

      var label = menu.label(5);
      assert.equal(label, 'Ruby');

    });

  });

  describe('.label(value)', function() {

    it('should return the first label', function() {

      var label = menu.label(null);
      assert.equal(label, 'Select a language...');

    });

    it('should return the second label', function() {

      var label = menu.label('c#');
      assert.equal(label, 'C#');

    });

    it('should return the fourth label', function() {

      var label = menu.label('js');
      assert.equal(label, 'JavaScript');

    });

    it('should return the last label', function() {

      var label = menu.label('ruby');
      assert.equal(label, 'Ruby');

    });

  });

  describe('.labels()', function() {

    it('should return an array of labels', function() {

      var labels = menu.labels();

      assert.equal(labels.length, 6);
      assert.equal(labels[0], 'Select a language...');
      assert.equal(labels[1], 'C#');
      assert.equal(labels[3], 'JavaScript');
      assert.equal(labels[5], 'Ruby');

    });

  });

  describe('.value(index)', function() {

    it('should return the first value', function() {

      var value = menu.value(0);
      assert.equal(value, null);

    });

    it('should return the second value', function() {

      var value = menu.value(1);
      assert.equal(value, 'c#');

    });

    it('should return the fourth value', function() {

      var value = menu.value(3);
      assert.equal(value, 'js');

    });

    it('should return the last value', function() {

      var value = menu.value(5);
      assert.equal(value, 'ruby');

    });

  });

  describe('.values()', function() {

    it('should return an array of values', function() {

      var values = menu.values();

      assert.equal(values.length, 6);
      assert.equal(values[0], null);
      assert.equal(values[1], 'c#');
      assert.equal(values[3], 'js');
      assert.equal(values[5], 'ruby');

    });

  });

});