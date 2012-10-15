
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


    function contains(arr, tag) {
      var i, len = arr.length;
      if (len) {
        for (i = 0; i < len; i += 1) {
          if (arr[i] === tag) return true;
        }
      }
      return false;
    }


    function escapeHTML(str) {
      var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
      };
      return String(str).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
      });
    }


    function cleanTag($dirty) {
      var clean;
      clean = $dirty.val();
      clean = $.trim(clean);
      clean = clean.toLowerCase();
      clean = escapeHTML(clean);
      return clean;
    }


    function removeItem(arr, tag) {
      var i, len = arr.length;
      for (i = 0; i < len; i += 1) {
        if (arr[i] === tag) {
          arr.splice(i, 1);
        }
      }
    }


    return this.each(function() {
      var
      $this          = $(this),
      $tagzWrap      = $('<div class="tagz-wraps clearfix" />'),
      $tagzContainer = $('<ul class="tagz" />'),
      $tagzArr       = $('<input type="hidden" />'),
      tagzArr        = [],
      fadeSpeed      = 250;

      if ($this.is('.applied')) return this;

      // 1. set applied class
      $this
        .addClass('applied')
        .wrap($tagzWrap) // 2. wrap text box in a container
        .after($tagzArr) // 3. add tag container
        .after($tagzContainer);


      $this.on('keydown', function (e) { // 4. Detect enter click
        var keycode = e.keyCode || e.which, tag = '', $tagTmp;

        if (keycode !== 13) return; // 5. only interested in enter click

        e.preventDefault();

        tag = cleanTag($this);

        if (tag.length <= 1 || contains(tagzArr, tag)) return;

        tagzArr.push(tag);

        $tagTmp = $('<li class="tag"><span><a href="#" title="close">x</a></span></li>')
          .hide()
          .find('a')
            .on('click', function (e) {
              e.preventDefault();

              $tagTmp.fadeOut(250, function () {
                var t = $.trim($tagTmp.find('span').text().split('x')[0]); // x will be replaced with an image
                removeItem(tagzArr, t);
                $tagTmp.remove();
                console.log(JSON.stringify(tagzArr.sort()));
              });

            })
          .end();



        // 6. Create an array of tags in a hidden input control to be
        // accessed on save.
        $tagzArr.val(JSON.stringify(tagzArr.sort()));

        // refactor when done as you a recreating  JQ objects for every
        // newly added tag.

        $tagTmp
          .find('span')
            .prepend(tag)
          .end()
          .appendTo($tagzContainer)
          .fadeIn(250);

        console.log('enter was clicked. Value is: ' + tag);
        console.log(JSON.stringify(tagzArr.sort()));
        console.log('====================================================');

        $this.val('');
      });


    }); // end plugin

  };

  $.fn.tagz.defaults = {
    wrapTextBox : true,
    tags        : []
  };

} (jQuery));
