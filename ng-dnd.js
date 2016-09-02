var app = angular.module('ngDnd', []);

'drag dragend dragenter dragexit dragleave dragover dragstart drop'.split(' ').forEach(function(eventName) {
  var directiveName = 'ng' + eventName[0].toUpperCase() + eventName.substring(1);
  
  app.directive(directiveName, ['$parse', function($parse) {
    return {
      restrict: 'A',
      compile: function($element, attr) {
        return function(scope, element) {
          if( eventName === 'dragover' && attr['ngDragover'] === 'true' ) {
            return element.on('dragover', function(event) {
              event.preventDefault();
            });
          } else if( eventName === 'drop' && !('ngDragover' in attr) ) {
            element.on('dragover', function(event) {
              event.preventDefault();
            });
          }
          
          element.on(eventName, function(event) {
            scope.$eval(attr[directiveName], {$event:event});
          });
        };
      }
    };
  }]);
});

module.exports = app;