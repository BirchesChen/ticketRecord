const request=require("request")
const cheerio=require("cheerio")
var item=0;
request('http://www.cwl.gov.cn/kjxx/ssq/kjgg/',function(err,res){
    if(err)
    {
        console.log('请求出错');
    }
    else
    {
        var $ = cheerio.load(res.body, {decodeEntities: false});
        var element =  $('.bgzt table').toString();
        console.log(element)
       /* var news = {}, newsList = [];
        for(var i = 0; i < element.length; i++){
            console.log('111')
            news = {
                '期号' : $(element[i]).text(),
            }
            /!*for(var j = 0; j < td[i].length; j++){
             news = {
             '期号' : $(td[j])[0].text(),
             }
             }*!/
            // 返回json数组
            newsList.push(news)
        }
        console.log('newsList:',newsList)*/
        /*console.log('111')
         $('.n_c_021').children('a').each(function(){
         var tr = $(this).text();
         item++;
         console.log("已爬取"+item+"条记录");
         console.log( 'see', tr)
         });*/
        /* var $ = cheerio.load(res.body, {decodeEntities: false});
         $('.bgzt').children('table').children('tbody').children('tr').each(function(i){
         console.log("111");
         $(this).children('td').each(function (j) {
         console.log("222");
         // var tr1 = $(this).text();
         item++;
         console.log("已爬取"+item+"条记录");
         console.log("第"+(i+1)+"行，第"+(j+1)+"个td的值："+$(this).text()+"。");
         })
         });*/
    }
});
