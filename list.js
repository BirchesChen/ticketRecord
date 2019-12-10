var request = require('request');
var cheerio=require("cheerio")
var linkArr=[]

var options = {
    url: 'http://www.cwl.gov.cn/cwl_admin/kjxx/findDrawNotice?name=ssq&issueCount=30',
    headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': 'UniqueID=3UMFqaJcjAxxa4u41575957870993; Sites=_21; _ga=GA1.3.1327797372.1575257036; _gid=GA1.3.1670746829.1575879207; _Jo0OQK=ED6F11ED243EF3442EE6E2177A8B416AA4789F4DDD5F1D4B0A2BE6A332114AF77290B04778C5C3FE930480D9FF433B0281EF7D457645E32E67D6F051D01BCDF0770F1B3C19C5B2FC5F8E6E66EDA7420CD4BE6E66EDA7420CD4B502BECCDA3A41CB1CA255D2BC3746F78GJ1Z1fQ==; 21_vq=51',
        'Host': 'www.cwl.gov.cn',
        'Pragma': 'no-cache',
        'Referer': 'http://www.cwl.gov.cn/kjxx/ssq/kjgg/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        var result = info.result;
        for(const i in result){
            linkArr.push(result[i].detailsLink);
        }
        console.log(linkArr);
        for(const j in linkArr){
            const urls = 'http://www.cwl.gov.cn/'
            const linkDetail = linkArr[j]
            const recordUrl = urls+linkDetail
            console.log('see',recordUrl)
            request(recordUrl,function(err,res){
                if(err)
                {
                    console.log('请求出错');
                }
                else
                {
                    var $ = cheerio.load(res.body, {decodeEntities: false});
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
                    });
                    console.log(arrData)
                }
            });
        }
    }
}

request(options, callback);
