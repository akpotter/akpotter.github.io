/* =========================================================
 * ks-scroll-to.js v1.0.0
 * =========================================================
 * Copyright 2013 Knownsec, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
(function (window, $) {
  if ($('body').height() < 1200) return;
  
  var old = $.fn.scroll_to_clk;

  $.fn.extend({
    scroll_to_clk: function () {
      var $this = $(this);
      var target = $this.attr('data-target');

      if ($this.attr('data-action') === 'backToTop') {
        $('body,html').animate({
          scrollTop: 0
        }, 300);
        return false;
      };

      var offset = $('#' + target).offset().top;
      $('body,html').animate({
        scrollTop: offset - 10
      }, 300);

      return true;
    }
  });

  /* scroll_to_clk NO CONFLICT
   * ==================== */

  $.fn.scroll_to_clk.noConflict = function () {
    $.fn.scroll_to_clk = old;
    return this;
  };

  $(document).on(
    'click.scrollTo',
    '[data-action="scrollTo"], [data-action="backToTop"]',
    function () {
      return $(this).scroll_to_clk();
    }
  );

  //back-top 显示和隐藏设置
  var $window = $(window);
  var lastScrollTop = $window.scrollTop();

  $window.scroll(function (e) {
    var $target = $('[data-action="backToTop"]');
    var scrollTop = $window.scrollTop();
    var isHide = $target.css('display') === 'none';
    var isHorizontal = lastScrollTop === scrollTop;

    if (!isHorizontal) {
      var tmp = isHide && $target.fadeIn();
      tmp = isHide ||
        (scrollTop < 10 ?
        $target.fadeOut() : '');
      // TODO: IE中||和?:运算的优先级跟chrome不一样                             
      lastScrollTop = scrollTop;
    }
  });
})(window, $);