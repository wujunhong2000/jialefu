class Details {
    constructor() {
        this.sid = location.search.substring(1).split('=')[1];
        this.spic = $('#spic');
        this.bpic = $('#bpic');
        this.sf = $('#sf');
        this.bf = $('#bf');
        this.list = $('#list');
        this.list_ul = $('#list ul');
        this.count = $('#count');
    }
    init() {
        $.ajax({
            url: 'http://localhost/jialefu2/php/details.php',
            data: {
                sid: this.sid
            },
            dataType: 'json'
        }).done((objdata) => {
            $('#spic img').attr('src', objdata.img);
            $('.loadtitle').html(objdata.information);
            $('.loadpcp').html(objdata.price);

            let piclist = objdata.detail1.split(',');
            let $strhtml = '';
            $.each(piclist, function (index, value) {
                $strhtml += `<li><img src="${value}" /></li>`;
            });
            this.list_ul.html($strhtml)
        });
        this.addcart();
    }
    //添加购物车操作
    addcart() {
        let goodsnum = []; //商品的数量
        let goodsid = []; //商品的编号
        //cartnum  cartsid:本地存储的key值
        function getcookie() {
            if (localStorage.getItem('cartnum') && localStorage.getItem('cartsid')) {
                goodsnum = localStorage.getItem('cartnum').split(',');
                goodsid = localStorage.getItem('cartsid').split(',');
            }
        }
        $('.p-btn a').on('click', () => {
            getcookie();
            if ($.inArray(this.sid, goodsid) === -1) {
                //第一次点击,将sid传入，取到数量直接传入
                goodsid.push(this.sid);
                localStorage.setItem('cartsid', goodsid); //存入sid
                goodsnum.push(this.count.val());
                localStorage.setItem('cartnum', goodsnum); //存入数量
            } else { //多次点击，取出当前sid对应的数量+当前的数量，再存入本地存储。
                let index = $.inArray(this.sid, goodsid); //当前sid在数组中对应的位置
                let newnum = parseInt(goodsnum[index]) + parseInt(this.count.val());
                goodsnum[index] = newnum; //新的数量
                localStorage.setItem('cartnum', goodsnum); //存入数量
            }
        })
    }
}

export {
    Details
}