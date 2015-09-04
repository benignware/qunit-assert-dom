(function() {
  
  var QUnit = window.QUnit;
  
  if (!QUnit) {
    throw 'QUnit needs to loaded before qunit-assert-dom';
  }
  
  var 
    parse = (function() {
      if (typeof window.DOMParser !== "undefined") {
        return function(xmlStr) {
          var doc = ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
          return doc;
        };
      } else if (typeof window.ActiveXObject !== "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
        return function(xmlStr) {
          var doc = new window.ActiveXObject("Microsoft.XMLDOM");
          doc.async = "false";
          doc.loadXML(xmlStr);
          return doc;
        };
      } else {
        throw new Error("No XML parser found");
      }
    })(), 
    
    clean = function(node) {
      for (var n = 0; n < node.childNodes.length; n ++) {
        var child = node.childNodes[n];
        if ( child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue)) ) {
          node.removeChild(child);
          n --;
        } else if ( child.nodeType === 1 ) {
          clean(child);
        }
      }
    },
    
    serialize = (function() {
      function toArray(obj) {
        var l = obj.length, i, out = [];
        for (i = 0; i < l; i++) {
          out[i] = obj[i];
        }
        return out;
      }
      return function(el, opts) {
        if (typeof el === 'string') {
          el = parse(el);
          el = el.documentElement;
        }
        el = el instanceof Array || el.toArray ? el[0] : el;
        el = !el.ownerDocument ? el.documentElement : el;
        opts = opts || {};
        var
          prettify = typeof opts.prettify === 'boolean' ? opts.prettify : true,
          lineSeparator = prettify ? opts.lineSeparator || "\n" : "",
          tabSpace = prettify ? opts.tabSpace || "  " : "",
          level = arguments[2] || 0, tabs = (new Array((level) + 1)).join(tabSpace);
        prettify && clean(el);
        return (level > 0 ? lineSeparator : "") + tabs + (el.nodeType === 1 ? "<" + el.tagName.toLowerCase() + toArray(el.attributes).sort(function(a, b) {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        }).map(function(node) {
          var
            name = node.name.toLowerCase(),
            value = node.value;
          if (name === 'style') {
            value = value.split(/\s*;\s*/).sort().join("; ");
          }
          return " " + name + "=\"" + value + "\"";
        }).join("") + ">" + toArray((el = el[0] || el).childNodes).map(function(elem, index) {
          return serialize(elem, opts, level + 1);
        }).join("") + lineSeparator + tabs + "</" + el.tagName.toLowerCase() + ">" : 
          el.nodeType === 3 ? el.nodeValue : "");
        };
    })();
  
  QUnit.extend( QUnit.assert, {
    domEqual: function( actual, expected, message ) {
      actual = serialize(actual);
      expected = serialize(expected);
      this.equal(actual, expected, message);
    },
    domNotEqual: function( actual, expected, message ) {
      actual = serialize(actual);
      expected = serialize(expected);
      this.notEqual(actual, expected, message);
    }
  });
  
  
})();


