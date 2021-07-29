$(function(){
    console.log("js的外部引入")
})

var downTrDom='';
// 1.给 加入购物车 添加一个 点击事件
function add_shoppingcart(dom){
    var trDom= $(dom).parent().parent();
    // 拿第一个 td
   var goodsName=    trDom.children().eq(0).text(); 
   var goodsPrice=   trDom.children().eq(1).text(); 
   var goodskuCun=   trDom.children().eq(3).text(); 
    //下面是库存
    console.log("下面是库存"+goodskuCun);
    //点击购物车是  库存减少
    trDom.children().eq(3).text(--goodskuCun)

  // 2. 把 trDom 放入到 下面的 table表格的 goods中
    // 按需要 添加
    // 编辑一个 dom 元素
    renderTr(goodsName,goodsPrice,goodsPrice,1);

    // 1.1 遍历购物车
    var goodsTrDom= $("#goods tr");
    // 创建一个数组,用来装 产品名称
    var namesArr=new Array();
    $.each(goodsTrDom, function(index, value) {
        // 在遍历的 循环里面 去看 下面的内容和上面的内容是否有一样的.
        console.log(  )
        // 获取 $(this)的下面的 td
        //  把拿到名字 装入到 数组当中去
        namesArr.push($(this).children('td').eq(0).text() );
    })
    console.log(namesArr);
    // 做数组是否有name的判断
    var isHasName=  namesArr.indexOf(goodsName);
   // console.log(isHasName)
    if (isHasName>=0) { // 证明下面有了
        // 1. 找出 下面数量 进行 +1  ,   上面的库存 -1 , 找出金额+单价
        // 1. 定位出来 你选择的这个购物车的 tr 
       // console.log(goodsName);
       // console.log(isHasName);
        // 拿取 goods tr 对象的下面的数量
        var goodsCount= goodsTrDom.eq(isHasName).children('td').eq(2).children().eq(1).val() 
         var num=    Number.parseInt(goodsCount)+1;
     goodsTrDom.eq(isHasName).children('td').eq(2).children().eq(1).val(num); // 数量增加了
      var goodsCount1=Number.parseInt( goodsTrDom.eq(isHasName).children('td').eq(2).children().eq(1).val() );
      // 金额的公式 = 数量 * 单价
      
      console.log("下面是")
      console.log(goodsCount1)
      var tprice= goodsCount1*goodsPrice
      console.log("下面是总价")
      console.log(tprice)
    // 清空之前的, 
    goodsTrDom.eq(isHasName).remove();
      renderTr(goodsName,goodsPrice,tprice,num)
      $("#goods").prepend(downTrDom);

      //总价
        sum();
    } else {          // 下面没有
  
    $("#goods").prepend(downTrDom);
    sum();
    }

   




}
// 提取一个 Tr 
function renderTr(goodsName,goodsPrice,tprice,num){
    console.log(num)
   downTrDom= $( "<tr>" 
    +" <td>"+goodsName+"</td>"
    +" <td>"+goodsPrice+"</td>"
    +" <td align='center'>"
    +"  <input onclick='sub(this)'  type='button' value='-'/>"
    +"  <input type='text' size='3' readonly value="+num+">"
    +"  <input onclick='add(this)'  type='button' value='+'/>"
    +"  </td>"
    +"  <td>"+tprice+"</td>"
    +" <td align='center'><input type='button' onclick='del(this)' value='x'/></td>"
    +" </tr>"
    );
}

function sub(dom){
    var trDom= $(dom).parent().parent();
    console.log(trDom)
       // 拿第一个 td
   var goodsName=    trDom.children().eq(0).text(); 
   var goodsPrice=   trDom.children().eq(1).text(); 
   var goodsCount=   trDom.children().eq(2).children().eq(1).val();
   var subCount= Number.parseInt( goodsCount  )-1; 
   if(subCount==0){
       // 等于0 remove这个行,数组删除 名字
       trDom.remove();
       // 把数组中的名字删除
      // namesArr.pop(goodsName)
        //console.log(namesArr)

   }
   trDom.children().eq(2).children().eq(1).val(subCount);
 
   console.log(goodsName)
   console.log(goodsPrice)
   console.log(goodsCount)
   console.log(subCount)
    var  tprice=subCount  * goodsPrice;
    // 把tprice 输入到 金额中
    trDom.children().eq(3).text(tprice); 
   
    //数量的 减少   库存进行增加
    $.each($("#upGoods tr"), function(index, value) {
        var goodsNameUp = $(this).children().eq(0).text();
        var isTrue = goodsNameUp == goodsName;
        if(isTrue){
            //找到了就让库存增加
            var kucunCount = $(this).children().eq(3).text();
            var newKucun = Number.parseInt(kucunCount)+1;
            $(this).children().eq(3).text(newKucun);
        }
        
    });

    sum();

}


function add(dom){
    var trDom= $(dom).parent().parent();
    console.log(trDom)
       // 拿第一个 td
   var goodsName=    trDom.children().eq(0).text(); 
   var goodsPrice=   trDom.children().eq(1).text(); 
   var goodsCount=   trDom.children().eq(2).children().eq(1).val();
   var subCount= Number.parseInt( goodsCount  )+1; 
   if(subCount==0){
       // 等于0 remove这个行,数组删除 名字
       trDom.remove();
       // 把数组中的名字删除
      // namesArr.pop(goodsName)
        //console.log(namesArr)

   }
   trDom.children().eq(2).children().eq(1).val(subCount);
 
   console.log(goodsName)
   console.log(goodsPrice)
   console.log(goodsCount)
   console.log(subCount)
    var  tprice=subCount  * goodsPrice;
    // 把tprice 输入到 金额中
    trDom.children().eq(3).text(tprice); 
   
    //数量的 增加   库存进行减少
    $.each($("#upGoods tr"), function(index, value) {
        var goodsNameUp = $(this).children().eq(0).text();
        var isTrue = goodsNameUp == goodsName;
        if(isTrue){
            //找到了就让库存增加
            var kucunCount = $(this).children().eq(3).text();
            var newKucun = Number.parseInt(kucunCount)-1;
            $(this).children().eq(3).text(newKucun);
        }
        
    });

    sum();

}

//总计
var allMoney = 0;
function sum(){
    allMoney = 0;
    var trDom = $("#goods tr")
    $.each(trDom, function(index, value) {
        var newMoney = Number.parseInt($(this).children().eq(3).text());
        allMoney = newMoney+allMoney;
    })

    console.log("这是总价"+allMoney)
    //存入到表格中
    $('#total').text(allMoney)
}


function del(dom){
    var trDom = $(dom).parent().parent();
    var goodsName = trDom.children().eq(0).text()
    var count = Number.parseInt(trDom.children().eq(2).children().eq(1).val());

    console.log(count)

    //删除的话  把删除的数量归还到库存中
    $.each($("#upGoods tr"), function(index, value) {
        var goodsNameUp = $(this).children().eq(0).text();
        var isTrue = goodsNameUp == goodsName;
        if(isTrue){
            //找到了就让库存减少
            var kucunCount = $(this).children().eq(3).text();
            var newKucun = Number.parseInt(kucunCount)+count;
            $(this).children().eq(3).text(newKucun);
        }
    });


    trDom.remove();
    sum();
}