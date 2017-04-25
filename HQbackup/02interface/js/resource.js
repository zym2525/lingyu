//语言配置
var languageName=['CN','US'];
var langText={
	'US':{
		'title1':'Quotation system',
		'title2':'Inquiry management',
		'title3':'Inquiry',
		'title4':'Order management',
		'start':'POL',
		'end':'POD',
		'company':'CARRIER',
		'company2':'Carrier:',
		'search':'Search',
		'inquiry':'Phone supplier directly',
		'hot':'Inquiry Hotline: 400-8888-888 ',
		'Freight query':'Freight',
		'Inquiry management':'Enquiry',
		'logistics':'Logistics',
		'account':'order',
		'current_inquiry':'Current_enquiry',
		'Box_type_Num':'Box_Type_Num:',
		'Completed':'Completed',
		'canceled':'Canceled',
		'cancel':'Cancel',
		'Inquiry_time':'Inquiry time:',
		'delivery_time':'Delivery time:',
		'remark':'Remark:',
		'current_order':'current_inquiry',
		'order_history':'completed',
		'order_history2':'canceled',
		'order_number':'ORDERNO:',
		'B/L_NO':'B/L NO:',
		'VOYAGE':'VOYAGE',
		'State':'State',
		'Enterprise_name':'Enterprise name',
		'email':'Email',
		'language':'Language',
		'change_password':'Change_password',
		'exit':'Exit',
		'language_name':'English',
		'Time':'operateTime',
		'f1':'Customer fist',
		'f2':'State fist',
		'f3':'Time fist',
		'customer':'customer',
		'booking':'booking',
		'inquirer':'inquirer',
		'phone':'phone',
		'Inquiry_party':'Inquiry_party',
		'direct_offer':'Direct_offer',
		'Post_inquiry':'Post_inquiry',
		'exit':'Exit',
	},
	'CN':{
		'title1':'报价系统',
		'title2':'询盘管理',
		'title3':'询价管理',
		'title4':'订单管理',
		'start':'起运港',
		'end':'目的港',
		'company':'选择船公司',
		'company2':'船公司：',
		'search':'搜索',
		'inquiry':'直接电话供应商',
		'hot':'询价热线：400-8888-888',
		'Freight query':'运价查询',
		'Inquiry management':'询盘管理',
		'logistics':'全程跟踪',
		'account':'订单管理',
		'current_inquiry':'当前询盘',
		'Box_type_Num':'箱型箱量：',
		'Completed':'已完成',
		'canceled':'已取消',
		'cancel':'取消',
		'Inquiry_time':'询价时间：',
		'delivery_time':'预计出货时间：',
		'remark':'备     注：',
		'current_order':'当前询价',
		'order_history':'已完成',
		'order_history2':'已取消',
		'order_number':'订单编号：',
		'B/L_NO':'提单号',
		'VOYAGE':'航次',
		'State':'状态名字',
		'Enterprise_name':'企业名称',
		'email':'邮箱',
		'language':'语言选择',
		'change_password':'修改密码',
		'exit':'退出',
		'language_name':'中文',
		'Time':'操作时间',
		'f1':'客户优先',
		'f2':'报价状态优先',
		'f3':'询价时间优先',
		'customer':'客户：',
		'booking':'已订舱：',
		'inquirer':'询价人：',
		'phone':'联系电话：',
		'Inquiry_party':'询价方：',
		'direct_offer':'直接报价',
		'Post_inquiry':'发布询价',
		'exit':'退出',
	}
}
var f1='取消';
var f2='完成';
//select配置
var dataLng=[
    {'id': '0', 'value': '中文'},
    {'id': '1', 'value': 'English'},
];
var data=[
	[
		{'id': 'CNNGB', 'value': 'NINGBO'},
    	{'id': 'THBKK', 'value': 'BANGKOK'},
    	{'id': 'THLCB', 'value': 'LAEM CHABANG'},
	],
	[
		{'id': '0', 'value': ''},
	],
	[
	]
];
//询盘容器
var arrEnquirys1=[];
var arrEnquirys2=[];
var arrEnquirys3=[];
var arrInquirys1=[];
var arrInquirys2=[];
var arrInquirys3=[];

var dataPhone=[
	{'id': '110', 'value': '陈总'},
    {'id': '119', 'value': '万总'},
];



var pageSize=3;
var iNav1Num1=0;
var iNav1Num2=0;
var iNav1Num3=0;
var iNav2Num1=0;
var iNav2Num2=0;
var iNav2Num3=0;

var orderPageSize=5;
var orderNum=0;
var orderNum2=0;


var currentData=[[],[],[]];
var currentScrollT=[0,0,0];

var currentData2=[[],[],[]];
var currentScrollT2=[0,0,0];

var currentData3=[[],[]];
var currentScrollT3=[0,0];