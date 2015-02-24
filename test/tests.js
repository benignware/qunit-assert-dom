test("Equal", function(assert) {
  assert.domEqual(
    $('<div id="content" class="content">Content</div>'),
    $('<div class="content" id="content">Content</div>'),
    'Dom content should be equal'
  );
});

test("Not Equal", function(assert) {
  assert.domNotEqual(
    $('<div id="content" class="content"></div>'),
    $('<div class="content" id="content">Content</div>'),
    'Dom content should not be equal'
  );
});