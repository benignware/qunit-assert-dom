test("Equal", function(assert) {
  
  assert.domEqual(
    $('<div class="content" id="content" style="background-color: rgb(239, 239, 239); padding: 5px;">   \n   <span>Content</span></div>'),
    $('<div id="content" class="content" style="padding: 5px; background-color: rgb(239, 239, 239);"><span>Content</span></div>'),
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