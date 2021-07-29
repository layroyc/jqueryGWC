// $(function() {
//     console.log('js的外部引入')
// })



//1.给 加入购物车 添加一个 点击事件
function add_shoppingcart(dom) {

    var trDom = $(dom).parent().parent();
    //拿到第一个td
    //console.log(trDom.children().eq(0));
    var goodsName = trDom.children().eq(0).text();
    var goodsPrice = trDom.children().eq(1).text();

    //2.把 trDom  放入到  下面的table表格中的goods
    //按需要的  添加
    //编辑一个dom元素
    var downTrDom = $("<tr>"
        + " <td>" + goodsName + "</td>"
        + " <td>" + goodsPrice + "</td>"
        + " <td align='center'>"
        + "  <input type='button' value='-' onclick='sign(this)'/>"
        + "  <input type='text' size='3' readonly value='1'/>"
        + "  <input type='button' value='+' onclick='plus(this)'/>"
        + " </td>"
        + "  <td>" + goodsPrice + "</td>"
        + " <td align='center'><input type='button' value='x' onclick='deleteGoods(this)'/></td>"
        + " </tr>"
    );


    //1.1 遍历购物车
    var goodsTrDom = $("#goods tr");
    //创建一个数组，用来 装  产品名称
    var namesArr = new Array();

    $.each(goodsTrDom, function (index, value) {
        //在遍历的循环里面 去看 下面的内容和上面的内容是否有一样的
        //console.log($(this));
        //拿 $(this)的下面的 td
        //把拿到的名字  装到 数组当中去
        namesArr.push($(this).children('td').eq(0).text());

    })
    console.log(namesArr);
    // 做数组 是否 有 name 的判断
    var isHasName = namesArr.indexOf(goodsName);
    //console.log(isHasName)
    if (isHasName >= 0) {  //证明下面有了
        //1.找出 下面的数量 进行+1， 上面的库存 -1， 找出金额 +单价
        //1.定位 出来  选择的这个购物车的 tr
        //console.log(goodsName);
        //console.log(isHasName)
        //拿取  goods tr 对象的下面的数量
        var goodsCount = goodsTrDom.eq(isHasName).children().eq(2).children('input').eq(1).val();
        //转换数据类型
        var num = Number.parseInt(goodsCount);
        var newGoodsCount = num + 1;
        goodsTrDom.eq(isHasName).children('td').eq(2).children('input').eq(1).val(newGoodsCount);
        sum();

    } else {   //下面没有
        $("#goods").append(downTrDom);
        sum();
    }

    //传递过来的btn是dom元素，先全部转为jQuery元素,多次用到tds
    var tds = $(dom).parent().siblings();
    //获取到商品库存信息，string类型
    var stock = tds.eq(3).html();

    //先查看库存是否为0，为0不允许点击事件的发生
    if (stock <= 0) {
        return;
    }

    //当点击了放入购物车后，库存减掉1
    tds.eq(3).html(--stock);


}

//删除
function deleteGoods(obj) {
    //获取当前行 删除
    var tr = $(obj).parent().parent().remove();
    console.log(tr)

    sum();
}

//减号
function sign(btn) {
    //获取按钮的哥哥的值(数量)
    var amount = $(btn).next().val();
    if (amount >= 2) {
        //数量-1，再写回文本框
        $(btn).next().val(--amount);
        var price = $(btn).parent().prev().html();
        //计算金额，再写入按钮的父亲的弟弟内
        $(btn).parent().next().html(amount * price);
        sum();
    }
}


//加号
function plus(btn) {
    //获取按钮的哥哥的值(数量)
    var amount = $(btn).prev().val();
    //数量+1，再写回文本框
    $(btn).prev().val(++amount);
    var price = $(btn).parent().prev().html();
    //计算金额，再写入按钮的父亲的弟弟内
    $(btn).parent().next().html(amount * price);
    sum();
}


//求和
function sum() {
    var trs = $("#goods tr");
    var wy = 0;
    for (var i = 0; i < trs.length; i++) {
        var money =trs.eq(i).children().eq(3).html();
        wy += parseFloat(money);
    }
    //将结果写入合计列
    $("#total").html(wy);
}








