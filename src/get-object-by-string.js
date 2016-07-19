// via http://stackoverflow.com/a/6491621

function getObjectByString(obj, str) {
  if (!obj) return;
  str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  str = str.replace(/^\./, '');           // strip a leading dot
  var arr = str.split('.');
  for (var i = 0, n = arr.length; i < n; ++i) {
      var key = arr[i];
      if (key in obj) {
          obj = obj[key];
      } else {
          return;
      }
  }
  return obj;
}