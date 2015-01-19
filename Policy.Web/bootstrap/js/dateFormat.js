
/*
****************  End Example  **********************
*/
var jSelectDate = {

    yearClass: "jselectDate_year",

   
    /**
     
    * 初始化对向
    * @param {Object} el 用于存放日期结果的文本框 jQuery DOM
    */
    init: function (els, isDisabled) {

        els.each(function () {

            
            var el = $(this);
            var nYear;
            var nMonth;
            var nWeek;
            var elDate=new Date();; //记录当前时间
            //取得旧的年龄
            var elValue = el.val();
            var arr = elValue.split("`");
            if (arr.length == 3) {
                nYear = arr[0];
                nMonth = arr[1];
                nWeek = arr[2];
            }
            else {
                nYear = '';
                nMonth = '';
                nWeek = '';
               // alert("输入格式不正确！");
            }

            //隐藏给出的对向
            el.hide();

            //先算出当前共有多少个jSelectDate
            var currentIdx = $(jSelectDate.yearClass).length + 1;

            //            
            /**
            * 创建年input
            */
            var iptYear = document.createElement("input");
            iptYear.id = "iptYear" + currentIdx;
            iptYear.className = jSelectDate.yearClass;
            iptYear.disabled = isDisabled;
            iptYear.setAttribute("type", "text");
            iptYear.style.width = '16px';
            iptYear.style.height = '13px';
            iptYear.value = nYear;

            var lblYear = document.createElement("span");
            lblYear.id = "lblYear" + currentIdx;
            lblYear.className = jSelectDate.yearClass;
            lblYear.disabled = isDisabled;
            lblYear.setAttribute("for", iptYear.id);
            lblYear.innerText = "岁";
            //加入控件到文本框的位置
            el.nextAll().remove();
            el.after(iptYear);
            $(iptYear).after(lblYear);
           // $(lblYear).before(" ");
            /**
            * 创建月input
            */
            var iptMonth = document.createElement("input");
            iptMonth.id = "iptMonth" + currentIdx;
            iptMonth.className = jSelectDate.yearClass;
            iptMonth.disabled = isDisabled;
            iptMonth.setAttribute("type", "text");
            iptMonth.style.width = '16px';
            iptMonth.style.height = '13px';
            iptMonth.value = nMonth;
            var lblMonth = document.createElement("span");
            lblMonth.id = "lblMonth" + currentIdx;
            lblMonth.className = jSelectDate.yearClass;
            lblMonth.disabled = isDisabled;
            lblMonth.setAttribute("for", iptYear.id);
            lblMonth.innerText = "月";
            //加入控件到文本框的位置
            $(lblYear).after(iptMonth);
            $(iptMonth).after(lblMonth);
           // $(iptMonth).before(" ");
           // $(lblMonth).before(" ");
            /**
            * 创建周input
            */
            var iptWeek = document.createElement("input");
            iptWeek.id = "iptWeek" + currentIdx;
            iptWeek.className = jSelectDate.yearClass;
            iptWeek.disabled = isDisabled;
            iptWeek.setAttribute("type", "text");
            iptWeek.style.width = '16px';
            iptWeek.style.height = '13px';
            iptWeek.value = nWeek;
            var lblWeek = document.createElement("span");
            lblWeek.id = "lblWeek" + currentIdx;
            lblWeek.className = jSelectDate.yearClass;
            lblWeek.disabled = isDisabled;
            lblWeek.setAttribute("for", iptYear.id);
            lblWeek.innerText = "周";
            //加入控件到文本框的位置
            $(lblMonth).after(iptWeek);
            $(iptWeek).after(lblWeek);
           // $(iptWeek).before(" ");
          //  $(lblWeek).before(" ");

            var getAge = function () {
                elDate = new Date();
                var year = $(iptYear).val();
                var month = $(iptMonth).val();
                var week = $(iptWeek).val();
                if(month=="")
                month=0;
                if(year=="")
                year=0;
                if(week=="")
                week=0;
                el.val(year + "`" + month + "`" + week);
                elDate.setDate(elDate.getDate() - (7 * week));
                elDate.setMonth(elDate.getMonth() - month);
                elDate.setFullYear(elDate.getFullYear() - year);
                setBirthday();

            }

            var setBirthday = function () {
                $("#rBirthday").val(elDate.format('yyyy-MM-dd'));
            }
            /**
            * 给几个下拉列表加入更改后的事件
            */
            $(iptWeek).blur(function () {
                var week = $(iptWeek).val();
                if (isNaN(week)) {
                    alert("请输入正确的年龄周数！");
                    return;
                }
                return getAge();
            });

            $(iptMonth).blur(function () {
                var month = $(iptMonth).val();
                if (isNaN(month)) {
                    alert("请输入正确的年龄月份！");
                    return;
                }
                return getAge();
            });

            $(iptYear).blur(function () {
                var year = $(iptYear).val();
                if (isNaN(year)) {
                    alert("请输入正确的年龄岁数！");
                    return;
                }
                return getAge();
            });
        })


    },


}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

jQuery.fn.jSelectDate = function (s) {

    var getNowYear = function () {
        //得到现在的年
        var date = new Date();
        return date.getFullYear();
    }

    defaults = {
        css: "",
        disabled: false,
        yearBegin: 1950,
        yearEnd: getNowYear()
    }


    $.extend(defaults, s);

    jSelectDate.yearBegin = defaults.yearBeign;
    jSelectDate.yearEnd = defaults.yearEnd;
    jSelectDate.init($(this), defaults.disabled);

    return $(this);

}


//+---------------------------------------------------  
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd   
//+---------------------------------------------------  
function daysBetween(DateOne, DateTwo) {
    var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
    var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
    var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

    var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
    var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
    var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

    var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
    return Math.abs(cha);
}



  