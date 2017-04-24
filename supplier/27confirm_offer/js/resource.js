var languageName=['CN','US'];
var langText={
	'US':{
		'title':'Confirm Offer',
		'field1':'Inquiry No',
		'field2':'Inquiry time',
		'field3':'Reply Time',
		'field9':'Inquirer',
		'field10':'Telephone',
		'field11':'Logistics Project',
		'field12':'POL',
		'field13':'POD',
		'field14':'Carrier',
		'field4':'Port of Transshipment',
		'field5':'Journey Time',
		'field6':'Sailing Date',
		'field7':'Closing Date',
		'field8':'Valid',
		'field15':'Freight',
		'field16':'Charges',
		'field17':'Booking Fee',
		'field18':'Cost',
		'field19':'Quote',
		'field20':'Profit',
		'field21':'Confirm',
		'field22':'Sail Information',
		'field23':'(unit：dollar)',
		'field24':'vessel',
		'field25':'voyage',
		'Have_booking':'Have_booking',
		'ticket':'ticket',
		'title2':'Direct Offer',
		'feeName':'FeeName',
		'byorder':'Byorderr',
		'currency':'Currency',
		'BatchAdd':'BatchAdd',
		'feess':'Please enter the modify cost',
	},
	'CN':{
		'title':'确认报价',
		'field1':'询价编号',
		'field2':'询价时间',
		'field3':'回复时间',
		'field9':'询价人',
		'field10':'电话',
		'field11':'物流方案',
		'field12':'起运港',
		'field13':'目的港',
		'field14':'船公司',
		'field4':'中转港',
		'field5':'船程',
		'field6':'开船',
		'field7':'截关',
		'field8':'有效期',
		'field15':'运费',
		'field16':'附加费',
		'field17':'订舱费',
		'field18':'成本',
		'field19':'报价',
		'field20':'利润',
		'field21':'确认此方案',
		'field22':'船期信息',
		'field23':'(单位：美元)',
		'field24':'船名',
		'field25':'航次',
		'Have_booking':'已订舱',
		'ticket':'票',
		'title2':'添加附加费',
		'feeName':'费用名称',
		'byorder':'单票',
		'currency':'币种',
		'BatchAdd':'批量添加',
		'feess':'请输入修改费用',
	}
}
var f1='取消';
var f2='完成';
//币种
var arrHyfCurrency=['(单位：人民币)','(单位：美元)','(单位：泰铢)'];
var arrCurrency=['￥','$','฿'];
var currencys=[
];

var arrCarrys=[
	{'id': '0', 'value': ''}
]


var data=[
		{'id': '0001', 'value': '周一'},
		{'id': '0002', 'value': '周二'},
		{'id': '0003', 'value': '周三'},
		{'id': '0004', 'value': '周四'},
		{'id': '0005', 'value': '周五'},
		{'id': '0006', 'value': '周六'},
		{'id': '0007', 'value': '周日'},
]
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