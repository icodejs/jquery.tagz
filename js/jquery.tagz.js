
(function($) {

  // Delicious style tag text box with tag list.

  $.fn.tagz = function(options) {
    if (!this.length) return this;

    /**
     * TODO:
     * -----
     * - Detect enter click when textbox is in focus.
     * - Insert container for newly created tags.
     * - Create an array of tags in a hidden input control to be accessed on save.
     * - Wrap both the input and tag container in a wrapper element.
     * - Make all newly added tags deletable. (one by one and all at once)
     * - Make it possible to supply the plugin with an array of tags on init.
     * - Alphabetise tags each time one is entered.
     * - Basic input validation.
     * - Make tag layout fluid.
     * - Allow certain classes to be passed through to the tags so they can be
     *   style by thing like twitter bootstrap
     * - Add applied flag so plugin container or input so that this can be tested
     *   against so that the plugin cannot be applied twice.
     */

    var opts = $.extend(true, {}, $.fn.tagz.defaults, options);

    return this.each(function() {
      var
      $this          = $(this),
      $tagzWrap      = $('<div class="tagz-wraps clearfix" />'),
      $tagzContainer = $('<div class="tagz" />'),
      $tagzArr       = $('<input type="hidden" />'),
      tagzArr        = [];

      // 1. set applied class
      if ($this.is('.applied')) {
        return this;
      }
      else {
        $this.addClass('applied');
      }

      // 2. wrap text box in a container
      $this.wrap($tagzWrap);

      // 3. Add tag container
      $this.after($tagzArr);
      $this.after($tagzContainer);

      // 4. Detect enter click
      $this.on('keydown', function (e) {
        var keycode = e.keyCode || e.which, tag = '';

        if (keycode === 13) {
          e.preventDefault();
          tag = $this.val();

          if (tag.length) { // validate / alphetise / already contains etc
            tagzArr.push(tag);

            // 5. Create an array of tags in a hidden input control to be accessed on save.
            $tagzArr.val(JSON.stringify(tagzArr));


            console.log('enter was clicked. Value is: ' + tag);
            console.log(JSON.stringify(tagzArr));

            $this.val('');
          }
        }
      });
    });

  };

  $.fn.tagz.defaults = {
    wrapTextBox : true,
    tags        : []
  };

} (jQuery));
