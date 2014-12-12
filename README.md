angular-keep-values
===============

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

Add the ```keep-current-value``` directive to any element with an associated ```value``` attribute to automatically set its contents as the value of your ```ngModel```.

### Example

```html
<input type="text" placeholder="Full name" value="René Morales" ng-model="data.name" keep-current-value>
```

Will set ```$scope.data.name``` to ```René Morales```.