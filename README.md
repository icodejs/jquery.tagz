jquery.tagz
===========

Delicious style tag text box and tag list.

## Usage

Type your tag and press return.

<img src="https://raw.github.com/icodejs/jquery.tagz/master/img/demo.png"/>

## Setup
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="js/jquery.tagz.js"></script>
    <script type="text/javascript">
      $(function () {
        $('.tags').tagz({
          tags         : ['bmx', 'flatland', 'bike', 'crazy'],
          tagOuterWrap : 'ul',
          tagInnerWrap : 'li',
          closeImage   : 'img/close.png',
          fadeSpeed    : 250,
          tagClass     : 'tag'
        });
      });
    </script>