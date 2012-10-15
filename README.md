jquery.tagz
===========

Delicious style tag text box and tag list.

## Usage

Type your tag and press return.

<img src="https://raw.github.com/icodejs/jquery.tagz/master/img/demo.png"/>

## Setup
```html
<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
<script src="js/jquery.tagz.js"></script>
<script type="text/javascript">
  $(function () {
    $('input.tags').tagz({
      tags         : ['bmx', 'flatland', 'bike', 'crazy'],
      tagOuterWrap : 'ul',
      tagInnerWrap : 'li',
      closeImage   : 'img/close.png',
      fadeSpeed    : 250,
      tagClass     : 'tag',
      escapeInput  : false
    });
  });
</script>
```

## Support
Tested with jQuery 1.8.2 and Chrome 22.0.1229.79