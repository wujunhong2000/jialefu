class Shangpinglist {
    constructor() {
        this.meishiList_box = $('.meishiList_box');
    }
    init() {
        let strhtml = '<ul class="meishiList">';
        $.ajax({
            url: 'http://localhost/jialefu2/php/conn.php',
            type: 'json'
        }).done((data) => {
            $.each($.parseJSON(data), function (index, value) {
                strhtml += `
                    <a href="http://localhost/jialefu2/src/details.html?sid=${value.sid}">
                        <li>
                            <img src="${value.img}"alt="">
                            <p>
                                <span>${value.information}</span>
                                <span>${value.price}</span>
                            </p>
                        </li>
                    </a>
                `;
            })
            strhtml += '</ul>';
            this.meishiList_box.html(strhtml);
        });
        this.yincan_top();
    }
    yincan_top(){
        $(window).on('scroll', function () {
            let $top = $(window).scrollTop();
            if ($top >= 1000) {
                $('#yincan-top').stop(true).animate({
                    top: 0
                });
            } else {
                $('#yincan-top').stop(true).animate({
                    top: -68
                });
            }
        });
    }
}
class Louti {
    constructor() {
        this.louti = $('#louti li');
        this.louceng = $('.louceng');
        this.louti_last = $('.louti_last');
    }
    init() {
        this.louti.not('.last').on('click',this.louti_click);
        this.louti_last.on('click', () => {
            $('html').animate({
                scrollTop: 0
            });
        });
        $('window').on('scroll', this.louceng_scroll);
    }
    louti_click() {
        $(this).addClass('louti_click').siblings('li').removeClass('louti_click');
        let $louceng_top = $('.louceng').eq($(this).index()).offset().top;
        $('html').animate({
            scrollTop: $louceng_top
        });
    }
    louceng_scroll() {
        let $top = $('window').scrollTop();
        if ($top >= 600) {
            $('#louti').show();
        }
        else {
            $('#louti').hide();
        }
    }
}
export {
    Shangpinglist,
    Louti
}

