const request=require("request")
const cheerio=require("cheerio")
//var item=0;
var url='http://www.cwl.gov.cn//c/';
var date=['2019-12-03/','2019-12-01/','2019-11-28/','2019-11-26/','2019-11-24/','2019-11-21/','2019-11-19/','2019-11-17/','2019-11-14/','2019-11-12/']
var periods=['460865','460756','460643','460533','460423','460410','460300','460290','460177','460067']
for(const i in date){
   const recordDate = date[i]
   const recordPeriods = periods[i]
    const recordUrl = url+recordDate+recordPeriods+'.shtml'
    console.log('see',recordUrl)
    request(url+recordDate+recordPeriods+'.shtml',function(err,res){
        if(err)
        {
            console.log('请求出错');
        }
        else
        {
            var $ = cheerio.load(res.body, {decodeEntities: false});
            var element =  $('.zjqk table').toString();
            //console.log(element)
            var arrData = []
            $('.zjqk').children('table').children('tbody').children('tr').each(function(){
                var currentRow=$(this);
                var col1_value=currentRow.find("td").eq(0).text();
                var col2_value=currentRow.find("td").eq(1).text();
                var col3_value=currentRow.find("td").eq(2).text();
                var obj={};
                obj.奖等 = col1_value;
                obj.中奖注数 =col2_value;
                obj.金额 = col3_value;
                arrData.push(obj);
                // $(this).children('td').each(function (j) {
                // var tr1 = $(this).text();
                // item++;
                // console.log("已爬取"+item+"条记录");
                // console.log("第"+(i+1)+"行，第"+(j+1)+"个td的值："+$(this).text()+"。");
                // })
            });
            console.log(arrData)
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
        }
    });
}

