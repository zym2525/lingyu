/**
 */

function setCookie(name,value,timeout){
    var d=new Date();
    d.setDate(d.getDate()+timeout);
    document.cookie= name+'='+value+'; path=/;  expires='+d;
}
function getCookie(name){
    var str = document.cookie;
    var arr=str.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');
        if(arr2[0]==name){
            return arr2[1];
        }
    }
    return '';
}
function removeCookie(name){
    setCookie(name,1,-1);
}