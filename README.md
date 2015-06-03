# menu

A menu written in pure HTML/JS so it can be styled nicely - unlike native ones.

Features:

 - use your own class names
 - keyboard navigable

## Installation

Component:

    component install nib-health-funds/menu
    
Browserify:

    npm install --save @nib/menu

## Usage

HTML:

    <div class="js-menu">
        <div data-value="c#">C#</div>
        <div data-value="go">Go</div>
        <div data-value="js">JavaScript</div>
        <div data-value="php">PHP</div>
        <div data-value="ruby">Ruby</div>
    </div>
    
JavaScript:

    var Menu = require('menu');
    var menu = new Menu({el: document.querySelector('.js-menu')});

    menu.open();

## API

### Methods

#### new Menu(options)

Create a new menu from existing HTML.

#### .open()

Show the menu.

#### .close()

Hide the menu.

#### .toggle()

Toggle whether the menu is visible.

#### .focus(index)

Focus the menu item at the specified index.

#### .focus(value)

Focus the menu item with the specified value.
 
#### .items() : Array

Get all the menu items.
 
#### .values() : Array

Get all the menu item values.

#### .labels() : Array

Get all the menu item labels.

### Events

#### <>blurred

The menu was blurred.

#### <>focused

The menu was focused.

#### <>opening

The menu is opening.

#### <>opened

The menu was opened.

#### <>closing

The menu is closing.

#### <>closed

The menu was closed.

#### <>focus-item

The user focused a menu item. How do you want to handle it?

- item
    - label
    - value
- index

#### <>select-item

The user selected a menu item. How do you want to handle it?

- item
    - label
    - value
- index
