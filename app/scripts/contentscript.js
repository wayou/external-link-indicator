// http://mcgivery.com/htmlelement-pseudostyle-settingmodifying-before-and-after-in-javascript/
var UID = {
  _current: 0,
  getNew: function() {
    this._current++;
    return this._current;
  }
};

HTMLElement.prototype.pseudoStyle = function(element, prop, value) {
  var _this = this;
  var _sheetId = 'pseudoStyles';
  var _head = document.head || document.getElementsByTagName('head')[0];
  var _sheet = document.getElementById(_sheetId) || document.createElement('style');
  _sheet.id = _sheetId;
  var className = 'pseudoStyle' + UID.getNew();

  _this.className += ' ' + className;

  _sheet.innerHTML += ' .' + className + ':' + element + '{' + prop + ':' + value + '}';
  _head.appendChild(_sheet);
  return this;
};

var links = document.evaluate('//a[contains(@target, "_blank")]',
  document.documentElement,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; i++) {
  console.log(links.snapshotItem(i));
  links.snapshotItem(i).pseudoStyle('after', 'content', '"\\2197"');
  links.snapshotItem(i).pseudoStyle('after', 'font-size', '.7em');
  // links.snapshotItem(i).style.borderBottom = '1px solid red';
}
