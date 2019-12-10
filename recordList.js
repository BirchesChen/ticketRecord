const request=require("request")
const cheerio=require("cheerio")
var mysql=require('mysql')
var item=0;
var db=mysql.createPool({host:'localhost',user:'root',password:'123456',database:'recordlist',multipleStatements: true});

    /*request(urls,function(err,res){
        if(err)
        {
            console.log('请求出错');
        }
        else
        {
            var $ = cheerio.load(res.body, {decodeEntities: false});
            var arrData = []
            const ele= $('.zjqk').children('table').toString()
            console.log(ele)
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

                /!*db.query("INSERT INTO `record` (`level`, `num`, `amount`) VALUES ('${col1_value}', '${col2_value}','${col3_value}');",function(err,data){
                 if(err)
                 {
                 console.log("数据库连接错误");
                 console.log(err)
                 }

                 })*!/
            });
            console.log(arrData)
            //console.log('0.0',dateArr)
            /!*for(const k in arrData){
                const value1=arrData[k].奖等
                const value2=arrData[k].中奖注数
                const value3=arrData[k].金额
                db.query("CREATE TABLE dateArr[k](level varchar(255),num varchar(255),amount varchar(255))", function(err,result){
                    if(err){console.log(err)}else{
                        console.log("创建表成功")
                    }
                })*!/
                //ALTER TABLE `record1`;ADD COLUMN `level`  varchar(255) NULL FIRST ;ADD COLUMN `num`  int NULL AFTER `level`;ADD COLUMN `amount`  varchar(255) NULL AFTER `num`;
                /!* var addSql = "insert into record1(level,num,amount) values (?,?,?)";
                 var addParmas = [value1, value2,value3];
                 db.query(addSql,addParmas,function(err,data){
                 if(err){
                 console.log("数据库连接错误");
                 console.log(err)
                 }
                 })*!/
                /!*var addSql = "insert into record(level,num,amount) values (?,?,?)";
                 var addParmas = [value1, value2,value3];
                 db.query(addSql,addParmas,function(err,data){
                 if(err){
                 console.log("数据库连接错误");
                 console.log(err)
                 }
                 })*!/
          /!*  }*!/
        }
    });*/
var arrData=[ 'table1', 'table2', 'table3', 'table4', 'table5' ]
for(const k in arrData) {
    var addSql = "CREATE TABLE "+"list"+[k]+" (level varchar(255),num varchar(255),amount varchar(255))";
    db.query(addSql,function(err,data){
        if (err) {
            console.log("数据库连接错误");
            console.log(err)
        } else {
            console.log("创建表成功")
        }
    })
    /*db.query("CREATE TABLE arrData[k](level varchar(255),num varchar(255),amount varchar(255))", function (err, result) {
        if (err) {
            console.log("数据库连接错误");
            console.log(err)
        } else {
            console.log("创建表成功")
        }
    })*/
}

