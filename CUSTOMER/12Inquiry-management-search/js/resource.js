var languageName=['CN','US'];
var langText={
	'US':{
		'title':'Search',
		'field1':'Time Interval',
		'field2':'Begin Time',
		'field3':'End Time',
		'field9':'Quotation Status',
		'field10':'not offer',
		'field11':'has offer',
		'field12':'POL',
		'field13':'POD',
	},
	'CN':{
		'title':'搜索',
		'field1':'时间区间',
		'field2':'起始时间',
		'field3':'结束时间',
		'field9':'报价状态',
		'field10':'未报价',
		'field11':'已报价',
		'field12':'起运港',
		'field13':'目的港',
	}
}
var f1='取消';
var f2='完成';
var data=[
	[
		{'id': 'CNNGB', 'value': 'NINGBO'},
    	{'id': 'THBKK', 'value': 'BANGKOK'},
    	{'id': 'THLCB', 'value': 'LAEM CHABANG'},
	],
];
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