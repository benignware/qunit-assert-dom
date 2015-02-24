qunit-assert-dom
================

> QUnit assertion plugin for comparing dom nodes

Usage
-----


### Assert dom equal
```js
test("Equal", function(assert) {
  assert.domEqual(
    $('<div id="content" class="content">Content</div>'),
    $('<div class="content" id="content">Content</div>'),
    'Dom content should be equal'
  );
});
```

### Assert dom not equal

```js
test("Not Equal", function(assert) {
  assert.domNotEqual(
    $('<div id="content" class="content"></div>'),
    $('<div class="content" id="content">Content</div>'),
    'Dom content should not be equal'
  );
});
```

