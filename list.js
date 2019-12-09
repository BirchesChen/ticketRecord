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
        'Cookie': 'UniqueID=jR6Ds4fOmiccd5xe1575359580234; Sites=_21; _ga=GA1.3.1327797372.1575257036; _gid=GA1.3.1060442932.1575359690; _gat_gtag_UA_113065506_1=1; _Jo0OQK=29441419C557E174EF488B01AB22297F4377E29420309CB67C9A4A5B0AE4EAC21C3A3ECE7839EEB4824D3182CF5B273907E4F2ACBF3CF9459464488E4D63F11C867F1B3C19C5B2FC5F8E6E66EDA7420CD4BE6E66EDA7420CD4B2872A3FC3A4A6DA66011E4DFAAE0DD7EGJ1Z1Rg==; 21_vq=46',
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
