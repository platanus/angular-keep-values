angular-keep-values [![Bower version][bower-badge]][bower] [![Build Status][travis-badge]][travis]
===============

[travis]: https://travis-ci.org/platanus/angular-keep-values
[travis-badge]: https://travis-ci.org/platanus/angular-keep-values.svg?branch=master
[bower]: http://badge.fury.io/bo/angular-keep-values
[bower-badge]: https://badge.fury.io/bo/angular-keep-values.svg

Use the ```value``` attribute in your inputs to set the value of your ```ngModel```.

## Installation

*Just use [Bower](http://bower.io/)*.

```
bower install angular-keep-values --save
```

Then, inject it into your application:

```javascript
angular.module('MyApp', ['platanus.keep-values']);
```

## Usage

Add the ```keep-current-value``` directive to any input, select or textarea element to automatically set its value as the value of its associated ```ngModel```, without the need for ```ngInit```. 

### Example

```html
<input type="text" ng-model="data.name" value="René Morales" keep-current-value>
<select ng-model="data.city" keep-current-value>
  <option value="1">Santiago</option>
  <option value="2" selected>Concepción</option>
</select>
<textarea ng-model="data.text" keep-current-value>Lorem ipsum</textarea>
```

Will result in:
```javascript
$scope.data = {
  name: 'René Morales',
  city: '2',
  text: 'Lorem ipsum'
}
```

You can also use the ```keep-input-values``` directive in any container element to automatically apply ```keep-current-value``` to any child input, select or textarea tags with that have an associated ```ngModel```, like so:

```html
<div keep-input-values>
  <input type="text" ng-model="data.name" value="René Morales">
</div>
```

Results in ```$scope.data.name == 'René Morales'```.
