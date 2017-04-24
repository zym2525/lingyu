var languageName=['CN','US'];
var langText={
	'US':{
		'title':'Freight List',
		'field1':'Carrier:',
		'field2':'Valid:',
		'field3':'POL',
		'field4':'POD',
		'field5':'Journey:',
		'field6':'Sailing:',
		'field7':'Closing:',
		'list1':'Price First',
		'list2':'Sail First',
		'list3':'Clearance First',
	},
	'CN':{
		'title':'运价列表',
		'field1':'船公司：',
		'field2':'有效期：',
		'field3':'起运港',
		'field4':'目的港',
		'field5':'船程：',
		'field6':'开船：',
		'field7':'截关：',
		'list1':'价格优先',
		'list2':'航程优先',
		'list3':'截关日期优先',
	}
}
//询盘容器
var arrSection=[];
var pageSize=3;
var iNum=0;
var week={
	'周日':'0',
	'周一':'1',
	'周二':'2',
	'周三':'3',
	'周四':'4',
	'周五':'5',
	'周六':'6',
};
var currentData=[];
