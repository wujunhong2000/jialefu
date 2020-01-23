class Cartlist {
    constructor() {

    }
    init() {
        if (localStorage.getItem('cartnum') && localStorage.getItem('cartsid')) {
            let $csid = localStorage.getItem('cartsid').split(',');
            let $cnum = localStorage.getItem('cartnum').split(',');
            for (let $i = 0; $i < $csid.length; $i++) {
                this.render($csid[$i], $cnum[$i]);
            }
        }
        this.allselect();
        this.valuechange();
        this.delgoods();
    }
    render(sid, num) {
        $.ajax({
            url: 'http://localhost/jialefu2/php/cartlist.php',
            dataType: 'json',
        }).done((data) => {
            $.each(data, (index, value) => {
                if (sid == value.sid) {
                    let $clonebox = $('.goods-item:hidden').clone(true, true);
                    $clonebox.find('.goods-pic img').attr('src', value.img);
                    $clonebox.find('.goods-pic img').attr('sid', value.sid);
                    $clonebox.find('.goods-d-info a').html(value.information);
                    $clonebox.find('.b-price strong').html(value.price);
                    $clonebox.find('.quantity-form input').val(num);
                    $clonebox.find('.b-sum strong').html((value.price * num).toFixed(2));
                    $clonebox.show();
                    $('.item-list').append($clonebox);
                    this.allprice();
                }
            })
        })
    }
    allprice() {
        let $goodsnum = 0;
        let $goodsprice = 0;
        $('.goods-item:visible').each(function (index, element) {
            if ($(element).find('input:checkbox').is(':checked')) {
                $goodsnum += parseInt($(element).find('.quantity-form input').val());
                $goodsprice += parseFloat($(element).find('.b-sum strong').html());
            }
        });
        $('.amount-sum em').html($goodsnum);
        $('.totalprice').html('￥' + $goodsprice);
    }
    //全选
    allselect() {
        $('.allsel').on('change', () => {
            $('.goods-item').find('input:checkbox').prop('checked', $('.allsel').prop('checked'));
            this.allprice();
        })

        let $checkinput = $('.goods-item:visible').find('input:checkbox');
        $('.item-list').on('click', $checkinput, () => {
            let $inputs = $('.goods-item:visible').find('input:checkbox');
            if ($('.goods-item:visible').find('input:checked').length === $inputs.length) {
                $('.allsel').prop('checked', true);
            } else {
                $('.allsel').prop('checked', false);
            }
            this.allprice();
        })
    }
    //文本框的值改变
    valuechange() {
        $('.quantity-add').on('click', function () {
            let $num = $(this).prev('input').val();
            $num++;
            $(this).prev('input').val($num);
            $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));
            local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $num);
        })
        $('.quantity-down').on('click', function () {
            let $num = $(this).next('input').val();
            $num--;
            if ($num < 1) {
                $num = 1;
            }
            $(this).next('input').val($num);
            $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));
            local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $num);
        })
        $('.quantity-form input').on('input', function () {
            let $reg = /^\d+$/;
            let $inputvalue = $(this).val();
            if ($reg.test($(this).val())) {
                if ($inputvalue < 1) {
                    $(this).val(1);
                }
            } else {
                $(this).val(1);
            }
            $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));
            local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $(this).val());
        })
        //封装计算单价
        function singleprice(obj) {
            let $dj = parseFloat(obj.parents('.goods-info').find('.b-price strong').html());
            let $count = parseFloat(obj.parents('.goods-info').find('.quantity-form input').val());
            return (($dj * 10 * $count * 10) / 100).toFixed(2);
        }
        //存储本地存储
        function local(sid, value) {
            if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                let arrsid = localStorage.getItem('cartsid').split(',');
                let arrnum = localStorage.getItem('cartnum').split(',');
                let index = $.inArray(sid, arrsid);
                arrnum[index] = value;
                localStorage.setItem('cartnum', arrnum.toString());
            }
        }
    }
    //删除
    delgoods() {
        let arrsid = [];
        let arrnum = [];
        let _this = this;
        function getstorage() {
            if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                arrsid = localStorage.getItem('cartsid').split(',');
                arrnum = localStorage.getItem('cartnum').split(',');
            }
        }
        //删除本地存储数组项的值
        function delstorage(sid, sidarr) {
            let $index = -1;
            $.each(sidarr, function (index, value) {
                if (sid === value) {
                    $index = index;
                }
            });
            sidarr.splice($index, 1);
            arrnum.splice($index, 1);
            localStorage.setItem('cartsid', arrsid.toString());
            localStorage.setItem('cartnum', arrnum.toString());
        }
        //单条删除
        $('.item-list').on('click', '.b-action a', function () {
            getstorage();//取出本地存储，转换成数组。
            if (window.confirm('你确定要删除吗？')) {
                $(this).parents('.goods-item').remove();
            }
            delstorage($(this).parents('.goods-item').find('.goods-pic img').attr('sid'), arrsid);
            _this.allprice();
        });
        //删除选中
        $('.operation a').on('click', function () {
            getstorage();//取出本地存储，转换成数组。
            if (window.confirm('你确定要删除吗?')) {
                $('.goods-item:visible').each(function (index, element) {
                    if ($(this).find('input:checkbox').is(':checked')) {
                        $(this).remove();
                    }
                    delstorage($(this).find('.goods-pic img').attr('sid'), arrsid);
                });
            }
            _this.allprice();
        });
    }
}

export {
    Cartlist
}