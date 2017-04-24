//语言配置
var languageName=['CN','US'];
var langText={
	'US':{
		'title1':'Quotation system',
		'title2':'Enquiry list',
		'title3':'Logistics',
		'title4':'My account',
		'start':'POL',
		'end':'POD',
		'company':'CARRIER',
		'company2':'Carrier:',
		'search':'Search',
		'inquiry':'Direct inquiry',
		'hot':'Inquiry Hotline:',
		'Freight query':'Freight',
		'Inquiry management':'Manage',
		'logistics':'Logistics',
		'account':'My account',
		'current_inquiry':'Current_inquiry',
		'Box_type_Num':'Box_Type_Num:',
		'Completed':'Completed',
		'canceled':'Canceled',
		'cancel':'Cancel',
		'complete':'complete',
		'Inquiry_time':'Inquiry time:',
		'delivery_time':'Delivery time:',
		'remark':'Remark:',
		'current_order':'current_order',
		'order_history':'history_order',
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
		'mouths':'',
		'changeP':'Change password？',
	},
	'CN':{
		'title1':'报价系统',
		'title2':'询盘列表',
		'title3':'物流可视化',
		'title4':'我的账户',
		'start':'起运港',
		'end':'目的港',
		'company':'选择船公司',
		'company2':'船公司：',
		'search':'搜索',
		'inquiry':'直接询价',
		'hot':'询价热线：',
		'Freight query':'运价查询',
		'Inquiry management':'询盘管理',
		'logistics':'全程跟踪',
		'account':'我的账户',
		'current_inquiry':'当前询价',
		'Box_type_Num':'箱型箱量：',
		'Completed':'已完成',
		'canceled':'已取消',
		'cancel':'取消',
		'complete':'完成',
		'Inquiry_time':'询价时间：',
		'delivery_time':'预计出货时间：',
		'remark':'备     注：',
		'current_order':'当前订单',
		'order_history':'历史订单',
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
		'mouths':'（3个月）',
		'changeP':'确认要修改密码？',
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
	]
];
//询盘容器
var arrEnquirys1=[];
var arrEnquirys2=[];
var arrEnquirys3=[];


var pageSize=2;
var iNav1Num1=0;
var iNav1Num2=0;
var iNav1Num3=0;

var orderPageSize=5;
var orderNum=0;
var orderNum2=0;


var currentData=[[],[],[]];
var currentScrollT=[0,0,0];

var currentData2=[[],[]];
var currentScrollT2=[0,0];