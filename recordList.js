const request=require("request")
const cheerio=require("cheerio")
var item=0;
    request('http://www.cwl.gov.cn/kjxx/ssq/kjgg/',function(err,res) {
        console.log('in')
        if (err) {
            console.log('请求出错');
        }
        else {
            setTimeout(function () {
                var $ = cheerio.load(res.body, {decodeEntities: false});
                var element = $('.bgzt table').toString();
                console.log(element)
            }, 10000)
        }
    })

