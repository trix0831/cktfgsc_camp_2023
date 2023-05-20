function LoadFont() {
  //無loacalStorage才宣告
  if (localStorage['font'] == null) {
    localStorage.setItem('font', 'middle');
	$(".font").addClass("ative");
    $('.wrapper').css({ "font-size": "100%" });
  }

  var $storage = localStorage.getItem('font');
  $('.fontlevel .ative').removeClass('ative').removeClass('active');

  switch (true) {
    case $storage == 'big':
      $('.wrapper').css({ "font-size": "110%" });
      $(".bigfont").addClass("ative");
      break;

    case $storage == 'middle':
      $('.wrapper').css({ "font-size": "100%" });
      $(".font").addClass("ative");
      break;

    case $storage == 'small':
      $('.wrapper').css({ "font-size": "90%" });
      $(".smallfont").addClass("ative");
      break;
  }

}

function SetFont(size) {
  $(".fontlevel .ative").removeClass("ative").removeClass('active');

  if (size == "bigfont") {
    $('.wrapper').css({ "font-size": "110%" });
	 $(".bigfont").addClass("ative");
    localStorage.setItem('font', 'big');
  } else if (size == "smallfont") {
    $('.wrapper').css({ "font-size": "90%" });
	$(".smallfont").addClass("ative");
    localStorage.setItem('font', 'small');
  } else {
    $('.wrapper').css({ "font-size": "100%" });
	 $(".font").addClass("ative"); 
    localStorage.setItem('font', 'middle');
  }
  $('.' + level).addClass("ative");
  LoadFont();
}

$(document).ready(function() {

  // 使用者字型大小   
  LoadFont();
  /*setTimeout(function() {
    $('html').addClass('is-loaded');
  }, 500);*/

});
$(window).load(function () {
			$(".is-loaded").hide();
	})