$(function(){
  $("#header .nav li a").each(function(){
    href = $($(this)[0]).attr("href")
    pathname = window.location.pathname
    if(pathname == '/search'){
      pathname = "/"
    }
    if (href == pathname) {
      $(this).addClass("active")
    };
  })
  $('.dropdown-toggle').parent().hover(function() {
    $(this).find('.dropdown-menu').css('display', 'block');
  }, function() {
    $(this).find('.dropdown-menu').css('display', 'none');
  });
  $('.dropdown-menu').hover(function() {
    $(this).css('display', 'block');
  }, function() {
    $(this).css('display', 'none');
  });
  $(window).click(function(){
    $('.dropdown-menu').css('display', 'none');
  });
})