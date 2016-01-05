exModal.js
===========
Lightweight jQuery modal plugin for imperative coding.

## Features

* For imperative rather than declarative code style
* Works directly on the selected element
* No extra css file
* Optional lock to prevent outside clicks from closing form

## Basic usage

So you've got a div you want to make visible

```html
<div id="modalDiv" style="display:none;">
  <div>
    Hello! Click <a href="#" class="popover-close">here</a> to close.
  </div>
</div>
```

Run this

```javascript
$('#modalDiv').exModal();
```

## Options

Store the returned object so you can lock, unlock or close it later

```javascript
var modal = $('#modalDiv').exModal();

modal.exModal('lock');                  // adds attr modal-locked="true"

modal.exModal('unlock');                // adds attr modal-locked="false"

modal.exModal('close');                 // closes modal
```

You can chain the methods, though only 'lock' makes sense

```javascript
$('#modalDiv').exModal().exModal('lock');
```

exModal can also be called with an object of options. The values in the following example are the defaults

```javascript
var myOptions = {
  top: 100,
  overlayOpacity: 0.5,
  closeButton: ".popover-close",  // A jQuery selector that closes the modal when clicked.
  overlayID: "sex_overlay",       // The id of the overlay created.
  overlayStyle: {                 // A $.css() style object to apply to the overlay background.
    'position':'fixed',
    'z-index':'100',
    'top':'0px',
    'left':'0px',
    'height':'100%',
    'width':'100%',
    'background':'#000'
  },
  fadeInTime: 200,
  fadeOutTime: 200,
  afterLoad: function(){},        // Callback to run after modal fades in.
  afterClose: function(){}        // Callback to run after modal fades out.
}
$('#modalDiv').exModal(myOptions);
```

The modal will close when the overlay is clicked, unless modal-locked="true" is set on the target div. Only the overlay clicks are locked out. Clicking the specified closeButton element or calling the 'close' method will always close modal, regardless of modal-locked="true"

As a final note, running this plugin will add the "modal-open" class to your body element when running. If you have twitter bootstrap's css included, this will hide the scroll bar. If not you can include this style in your stylesheet to do the same thing.

```css
.modal-open {
  overflow: hidden;
}
```
