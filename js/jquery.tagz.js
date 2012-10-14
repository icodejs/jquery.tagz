
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
      var $this = $(this);

      if ($this.is('.applied')) {
        return this;
      }
      else {
        $this.addClass('applied');
      }

      console.log($this);
    });

  };

  $.fn.tagz.defaults = {
    wrapTextBox : true,
    tags        : []
  };

} (jQuery));
