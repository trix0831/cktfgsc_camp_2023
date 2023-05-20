$(".imgLiquid").imgLiquid({
    fill: true
});
$(".dropdown .menu-twocolum ").css({ "display": "none" });
$(document).ready(function () {
    $(".fontlevel li span,#btn_img").attr("tabindex", "0");
    var viewport = $('meta[name="viewport"]');

    $("#pc_btn").click(function () {
        $("#viewport").attr("content", " ");
        $("#pc_btn").css({
            "display": "none"
        });
        $("#mobile_btn").css({
            "display": "inline-block"
        });
        $(".wrapper").addClass('pcbox');
        $(".index_style").removeClass('side-right');
        createCookie("IsNoRWD", "true", 0.2);
    });
    $("#mobile_btn").click(function () {
        $("#viewport").attr("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
        $("#mobile_btn").css({
            "display": "none"
        });
        $("#pc_btn").css({
            "display": "inline-block"
        });
        $(".wrapper").removeClass('pcbox');
        $(".navbar-collapse").removeClass('in');
        createCookie("IsNoRWD", "false", 0.2);
    });

    $('.font').addClass('ative');
    $('.bigfont').click(function () {
        $('.wrapper').css({
            "font-size": "110%"
        });
        $('.bigfont').addClass('ative');
        $('.font').removeClass("ative");
        $('.smallfont').removeClass("ative");
    });
    $('.bigfont').keypress(function (e) {
        if (e.which == 13) {
            $('.wrapper').css({
                "font-size": "110%"
            });
            $('.bigfont').addClass('ative');
            $('.font').removeClass("ative");
            $('.smallfont').removeClass("ative");
        }
    });
    $('.font').click(function () {
        $('.wrapper').css({
            "font-size": "100%"
        });
        $('.font').addClass('ative');
        $('.bigfont').removeClass("ative");
        $('.smallfont').removeClass("ative");
    });
    $('.font').keypress(function (e) {
        if (e.which == 13) {
            $('.wrapper').css({
                "font-size": "100%"
            });
            $('.font').addClass('ative');
            $('.bigfont').removeClass("ative");
            $('.smallfont').removeClass("ative");
        }
    });
    $('.smallfont').click(function () {
        $('.wrapper').css({
            "font-size": "90%"
        });
        $('.smallfont').addClass('ative');
        $('.bigfont').removeClass("ative");
        $('.font').removeClass("ative");
    });
    $('.smallfont').keypress(function (e) {
        if (e.which == 13) {
            $('.wrapper').css({
                "font-size": "90%"
            });
            $('.smallfont').addClass('ative');
            $('.bigfont').removeClass("ative");
            $('.font').removeClass("ative");
        }
    });
    $(".back").click(function () {
			$(".leftBtn .Mainnews").hide();
			$(".rightnavWrap").hide();
		})
		$(".back2").click(function () {
			$(".leftBtn .Mainnews2").hide();
		})
		$(".back3").click(function () {
			$(".leftBtn .Mainnews3").hide();
		})
	$(".back4").click(function () {
			$(".rightBtn .Mainnews").hide();
			$(".rightnavWrap").hide();
		})
		$(".back5").click(function () {
			$(".rightBtn .Mainnews2").hide();
		})
		$(".back6").click(function () {
			$(".rightBtn .Mainnews3").hide();
		})
    $(function () {
        var len = 26; // è¶…é?26?‹å?ä»?..."?–ä»£
        var len2 = 40;
        $(".wordless").each(function (i) {
            if ($(this).text().length > len) {
                $(this).attr("title", $(this).text());
                var text = $(this).text().substring(0, len - 1) + "...";
                $(this).text(text);
            }
        });
        $(".wordless2").each(function (i) {
            var j = 0;
            if ($(this)[j].innerHTML.length > len2) {
                $(this).attr("title", $(this).text());
                var text = $(this)[j].innerHTML.substring(0, len2 - 1) + "...";
                $(this).html(text);
            }
            j++;
        });
    });
    $('.list_btn').click(function () {
        $(this).addClass('list-active');
        $('.grid_btn').removeClass('list-active');
        $('#grid').addClass('list-group-item');
        $('.news_box').removeClass('hvr-outline-in');
        $('.video_box').removeClass('hvr-outline-in');
        $('.title').removeClass('wordless2');
    });
    $('.grid_btn').click(function () {
        $(this).addClass('list-active');
        $('.list_btn').removeClass('list-active');
        $('#grid').removeClass('list-group-item');
        $('.news_box').addClass('hvr-outline-in');
        $('.video_box').addClass('hvr-outline-in');
        $('.title').addClass('wordless2');
        new AnimOnScroll(document.getElementById('grid'), {
            minDuration: 0.4,
            maxDuration: 0.7,
            viewportFactor: 0.2
        });
    });

    var timelineBlocks = $('.timeline_block'),
        offset = 0.8;

    hideBlocks(timelineBlocks, offset);

    $(window).on('scroll', function () {
        (!window.requestAnimationFrame) ?
            setTimeout(function () {
                showBlocks(timelineBlocks, offset);
            }, 100) : window.requestAnimationFrame(function () {
                showBlocks(timelineBlocks, offset);
            });
    });

    function hideBlocks(blocks, offset) {
        blocks.each(function () {
            ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.timeline-date, .timeline-content').addClass('is-hidden');
        });
    }

    function showBlocks(blocks, offset) {
        blocks.each(function () {
            ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.timeline-date').hasClass('is-hidden')) && $(this).find('.timeline-date, .timeline-content').removeClass('is-hidden').addClass('bounce-in');
        });
    }

    $(document).on('keypress', 'input[type="text"]', function (evt) {
        if (evt.keyCode == 13 && evt.target.id.indexOf("search") <= 0) {
            evt.preventDefault();
        }
    });
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 180) {
        var windowWidth = $(window).width();
        if (windowWidth > 992) {
            $(".bootsnav").stop(true, true).animate({
                'top': 0
            }, 200).addClass('NavFixed');
        } else {
            $(".navwrap").stop(true, true).animate({
                'top': 0
            }, 200).addClass('NavFixed');
        }
    } else {
        $(".bootsnav,.navwrap").removeClass('NavFixed');
    }
    return false;
});
$(document).ready(function () {
    var navHeight = 70;
    $(".btn_footer").click(function () {
        $("#btn_img").toggleClass("img02");
        $(".footerAll").toggleClass('add');
        $(".siteItem ul").slideToggle();
        $("html,body").stop().animate({
            scrollTop: $("footer").offset().top - navHeight
        }, 800);
        return false;
    });
    $('.btn_footer').keypress(function (e) {
        if (e.which == 13) {
            $("#btn_img").toggleClass("img02");
            $(".footerAll").toggleClass('add');
            $(".siteItem ul").slideToggle();
            $("html,body").stop().animate({
                scrollTop: $("footer").offset().top - navHeight
            }, 800);
            return false;
        }
    });
    $(".top_menu").click(function () {
        $("#btn_img2").toggleClass("images02");
        $(".top_menu_main ol").slideToggle();
        $("html,body").stop().animate({
            scrollTop: 0
        }, 800); return false;
    });
	$(".icon_bg").click(function () {"use strict";
	$(".important_message_main").addClass("hide_space");
	 return false;
})
 $('.icon_bg').keypress(function(e){"use strict";
        if(e.which == 13){
	$(".important_message_main").addClass("hide_space");
	 return false;
		}});
})

$(".gotop,.rightnavWrap").hide();
$(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $(".gotop").fadeIn();
    } else {
        $(".gotop").fadeOut();
    };
});
$(".gotop").click(function () {
    $("body,html").animate({
        scrollTop: 0
    }, 800);
    return false;
});

function top_menu_main() {
    var winWidth = $(window).width();
    if (winWidth > 993) {
        $(".top_menu_main ol").show()
    } else {
        $(".top_menu_main ol").hide()
    }
}

$(document).ready(function () {
    top_menu_main(); //run when page first loads
    if ($('.embed-vedio>span').length > 0) videoInit();

    $('body').on('click', 'a[href="#"]', function (evt) {
        evt.preventDefault();
    });
});

function videoInit() {
    var thumbSize = 'large',
        imgWidth = '100%',
        imgHeight = 'auto',
        word = '?';
    $('.embed-vedio>span').each(function () {
        var _this = $(this),
            _url = _this.attr('href'),
            _info = _this.text(),
            // _type = (thumbSize == 'large') ? 0 : 2;
            _type = "maxresdefault";
        var vid = _info.split('=')[1];
        if (vid == 'undefined') return false;
        var thumbUrl = "https://img.youtube.com/vi/" + vid + "/" + _type + ".jpg";
        _this.html('<img id="' + vid + '" src="' + thumbUrl + '"  width="' + imgWidth + '" height="' + imgHeight + '" class="print_img" alt="¦C¦L¹Ï¤ù"/>')
        youtubeImgSet(_this.find('.print_img'));
    });
}

function youtubeImgSet($element) {
    var img = $element;
    var pic_real_width, pic_real_height;
    var t = new Image();
    t.src = $element.attr('src');
    $(t).on('load', function () {
        // if the image is 404
        if (t.width == 120) {
            $element.attr('src', $element.attr('src').replace('maxresdefault', 'hqdefault')).addClass('youtube-crop');
        }
        $(t).remove();
    });
}
