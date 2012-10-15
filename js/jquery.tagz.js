// Delicious style tag text box with tag list.

(function($) {
  'use strict';

  $.fn.tagz = function(options) {

    if (!this.length) return this;

    var
    opts           = $.extend(true, {}, $.fn.tagz.defaults, options),
    $tagzWrap      = $('<div />').addClass('tagz-wraps clearfix'),
    $tagzContainer = $('<' + opts.tagOuterWrap + ' />').addClass('tagz'),
    $tagzArr       = $('<input type="hidden" />').addClass('savedTags'),
    tagzArr        = [];


    return this.each(function() {
      var $this = $(this);

      if ($this.is('.applied')) return this;

      $this
        .addClass('applied')
        .wrap($tagzWrap)
        .after($tagzArr)
        .after($tagzContainer)
        .on('keydown', function (e) {
          var keycode = e.keyCode || e.which, tag = '';

          if (keycode === 13) {
            e.preventDefault();
            tag = cleanTag($this);

            if (tag.length > 1 || !contains(tagzArr, tag)) {
              setupRemoveClickHandler([tag], $tagzContainer, removeTag);
              $this.val('');
            }
          }
        });

      if (opts.tags.length) {
        setupRemoveClickHandler(opts.tags, $tagzContainer, removeTag);
      }
    });


    function removeTag(e) {
      e.preventDefault();

      var $container = $(e.currentTarget).closest(opts.tagInnerWrap);
      $container.fadeOut(opts.fadeSpeed, function () {
        var $this = $(this).remove(), t = $.trim($this.find('span').text());
        removeItem(tagzArr, t);
        $tagzArr.val(JSON.stringify(tagzArr.sort()));
      });
    }


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


    function setupRemoveClickHandler(tags, $container, fn) {
      var i, len = tags.length, tag = '';

      for (i = 0; i < len; i += 1) {
        tag = tags[i];
        $('<' + opts.tagInnerWrap +  '/>')
          .html('<span><a href="#" title="close"><img src="' + opts.closeImage + '" class="close" /></a></span>')
          .addClass(opts.tagClass)
          .hide()
            .find('a')
              .on('click', fn)
          .end()
            .find('span')
              .prepend(tag)
          .end()
          .appendTo($container)
          .fadeIn(opts.fadeSpeed);

        tagzArr.push(tag);
        $tagzArr.val(JSON.stringify(tagzArr.sort()));
      }
    }

  }; // end plugin


  $.fn.tagz.defaults = {
    tags         : ['bmx', 'flatland', 'bike', 'crazy'],
    tagOuterWrap : 'ul',
    tagInnerWrap : 'li',
    closeImage   : 'img/glyphicons_207_remove_2.png',
    fadeSpeed    : 250,
    tagClass     : 'tag'
  };

} (jQuery));
