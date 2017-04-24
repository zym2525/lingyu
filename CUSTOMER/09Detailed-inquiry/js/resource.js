var languageName=['CN','US'];
var langText={
	'US':{
		'title':'Detailed Inquiry',
		'field1':'POL',
		'field2':'POD',
		'field3':'Carrier',
		'field4':'Port of Transshipment',
		'field5':'Journey Time',
		'field6':'Sailing Date',
		'field7':'Closing Date',
		'field8':'Valid Date',
		'field9':'Type&Number',
		'field10':'ETD',
		'field11':'Select Time',
		'field12':'Remark',
		'field13':'Inquiry',
		'field14':'Sail Information',
		'field17':'Please enter other matters(15 words most)',
	},
	'CN':{
		'title':'详细询价',
		'field1':'起运港',
		'field2':'目的港',
		'field3':'船公司',
		'field4':'中转港',
		'field5':'船程',
		'field6':'开船',
		'field7':'截关',
		'field8':'有效期',
		'field9':'箱型箱量',
		'field10':'预计出货时间',
		'field11':'选择时间',
		'field12':'备注',
		'field13':'询价',
		'field14':'船期信息',
		'field17':'请输入其他事项(不超过15字)',
	}
}
var f1='取消';
var f2='完成';
var now = new Date();
var nowYear = now.getFullYear();
var nowMonth = now.getMonth() + 1;
var nowDate = now.getDate();
// 数据初始化
function toDou(s){
	return s<10? '0'+s:s;
}
function formatYear (nowYear) {
    var arr = [];
    for (var i = nowYear ; i <= nowYear + 25; i++) {
        arr.push({
            id: i + '',
            value: i + '年'
        });
    }
    return arr;
}
function formatMonth () {
    var arr = [];
    for (var i = 1; i <= 12; i++) {
        arr.push({
            id: i + '',
            value: i + '月'
        });
    }
    return arr;
}
function formatDate (count) {
    var arr = [];
    for (var i = 1; i <= count; i++) {
        arr.push({
            id: i + '',
            value: i + '日'
        });
    }
    return arr;
}
var yearData = function(callback) {
       callback(formatYear(nowYear))
}
var monthData = function (year, callback) {
        callback(formatMonth());
};
var dateData = function (year, month, callback) {
        if (/^1$|3|5|7|8|10|12$/.test(month)) {
            callback(formatDate(31));
        }
        else if (/^4|6|9|11$/.test(month)) {
            callback(formatDate(30));
        }
        else if (/^2$/.test(month)) {
            if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
                callback(formatDate(29));
            }
            else {
                callback(formatDate(28));
            }
        }
        else {
            throw new Error('month is illegal');
        }
}