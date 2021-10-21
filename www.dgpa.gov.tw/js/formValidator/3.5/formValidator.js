
var jQuery_formValidator_initConfig;
(function($) {

$.formValidator = 
{
	sustainType : function(id,setting)
	{
		var elem = $("#"+id).get(0);
		var srcTag = elem.tagName;
		var stype = elem.type;
		switch(setting.validatetype)
		{
			case "InitValidator":
				return true;
			case "InputValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA" || srcTag == "SELECT"){
					return true;
				}else{
					return false;
				}
			case "CompareValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA")
				{
					if (stype == "checkbox" || stype == "radio"){
						return false;
					}else{
						return true;
					}
				}
				return false;
			case "AjaxValidator":
				if (stype == "text" || stype == "textarea" || stype == "file" || stype == "password" || stype == "select-one"){
					return true;
				}else{
					return false;
				}
			case "RegexValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA")
				{
					if (stype == "checkbox" || stype == "radio"){
						return false;
					}else{
						return true;
					}
				}
				return false;
			case "FunctionValidator":
			    return true;
		}
	},
    
	initConfig : function(controlOptions)
	{
		var settings = 
		{
			debug:false,
			validatorgroup : "1",
			alertmessage:false,
			validobjectids:"",
			forcevalid:false,
			onsuccess: function() {return true;},
			onerror:function() {},
			submitonce:false,
			formid:"",
			autotip: false,
			tidymode:false,
			errorfocus:true,
			wideword:true
		};
		controlOptions = controlOptions || {};
		
		$.extend(settings, controlOptions);
		//如果是精簡模式，發生錯誤的時候，第一個錯誤的控件就不獲得焦點
		if(settings.tidymode){settings.errorfocus=false};
		if(settings.formid!=""){$("#"+settings.formid).submit(function(){return $.formValidator.pageIsValid("1");})};
		
		if (jQuery_formValidator_initConfig == null ){jQuery_formValidator_initConfig = new Array();}
		jQuery_formValidator_initConfig.push( settings );
	},
	
	//如果validator對象對應的element對象的validator屬性追加要進行的校驗。
	appendValid : function(id, setting )
	{
		//如果是各種校驗不支持的類型，就不追加到。返回-1表示沒有追加成功
		if(!$.formValidator.sustainType(id,setting)) return -1;
		var srcjo = $("#"+id).get(0);   
		//重新初始化
		if (setting.validatetype=="InitValidator" || srcjo.settings == undefined ){srcjo.settings = new Array();}   
		var len = srcjo.settings.push( setting );
		srcjo.settings[len - 1].index = len - 1;
		return len - 1;
	},
	
	//如果validator對象對應的element對象的validator屬性追加要進行的校驗。
	getInitConfig : function( validatorgroup )
	{
		if(jQuery_formValidator_initConfig!=null)
		{
		    for(i=0;i<jQuery_formValidator_initConfig.length;i++)
		    {
		        if(validatorgroup==jQuery_formValidator_initConfig[i].validatorgroup)
				{
					return jQuery_formValidator_initConfig[i];
				}
		    }
		}
		return null;
	},

	//觸發每個控件上的各種校驗
	triggerValidate : function(returnObj)
	{
		switch(returnObj.setting.validatetype)
		{
			case "InputValidator":
				$.formValidator.inputValid(returnObj);
				break;
			case "CompareValidator":
				$.formValidator.compareValid(returnObj);
				break;
			case "AjaxValidator":
				$.formValidator.ajaxValid(returnObj);
				break;
			case "RegexValidator":
				$.formValidator.regexValid(returnObj);
				break;
			case "FunctionValidator":
				$.formValidator.functionValid(returnObj);
				break;
		}
	},
	
	//設置顯示資訊
	setTipState : function(elem,showclass,showmsg)
	{
		var setting0 = elem.settings[0];
		var initConfig = $.formValidator.getInitConfig(setting0.validatorgroup);
	    var tip = $("#"+setting0.tipid);
		if(showmsg==null || showmsg=="")
		{
			tip.hide();
		}
		else
		{
			if(initConfig.tidymode)
			{
				//顯示和保存提示資訊
				$("#fv_content").html(showmsg);
				elem.Tooltip = showmsg;
				if(showclass!="onError"){tip.hide();}
			}
			tip.removeClass();
			tip.addClass( showclass );
			tip.html( showmsg );
		}
	},
		
	resetTipState : function(validatorgroup)
	{
		var initConfig = $.formValidator.getInitConfig(validatorgroup);
		$(initConfig.validobjectids).each(function(){
			$.formValidator.setTipState(this,"onShow",this.settings[0].onshow);	
		});
	},
	
	//設置錯誤的顯示資訊
	setFailState : function(tipid,showmsg)
	{
	    var tip = $("#"+tipid);
	    tip.removeClass();
	    tip.addClass("onError");
	    tip.html(showmsg);
	},

	//根據單個對象,正確:正確提示,錯誤:錯誤提示
	showMessage : function(returnObj)
	{
	    var id = returnObj.id;
		var elem = $("#"+id).get(0);
		var isvalid = returnObj.isvalid;
		var setting = returnObj.setting;//正確:setting[0],錯誤:對應的setting[i]
		var showmsg = "",showclass = "";
		var settings = $("#"+id).get(0).settings;
		var intiConfig = $.formValidator.getInitConfig(settings[0].validatorgroup);
		if (!isvalid)
		{		
			showclass = "onError";
			if(setting.validatetype=="AjaxValidator")
			{
				if(setting.lastValid=="")
				{
				    showclass = "onLoad";
				    showmsg = setting.onwait;
				}
				else
				{
				    showmsg = setting.onerror;
				}
			}
			else
			{
				showmsg = (returnObj.errormsg==""? setting.onerror : returnObj.errormsg);
				
			}
			if(intiConfig.alertmessage)		
			{
				var elem = $("#"+id).get(0);
				if(elem.validoldvalue!=$(elem).val()){alert(showmsg);}   
			}
			else
			{
				$.formValidator.setTipState(elem,showclass,showmsg);
			}
		}
		else
		{		
			//驗證成功后,如果沒有設置成功提示資訊,則給出默認提示,否則給出自定義提示;允許為空,值為空的提示
			showmsg = $.formValidator.isEmpty(id) ? setting.onempty : setting.oncorrect;
			$.formValidator.setTipState(elem,"onCorrect",showmsg);
		}
		return showmsg;
	},

	showAjaxMessage : function(returnObj)
	{
		var setting = returnObj.setting;
		var elem = $("#"+returnObj.id).get(0);
		if(elem.validoldvalue!=$(elem).val())
		{
			$.formValidator.ajaxValid(returnObj);
		}
		else
		{
			if(setting.isvalid!=undefined && !setting.isvalid){
				elem.lastshowclass = "onError"; 
				elem.lastshowmsg = setting.onerror;
			}
			$.formValidator.setTipState(elem,elem.lastshowclass,elem.lastshowmsg);
		}
	},

	//獲取指定字符串的長度
    getLength : function(id)
    {
        var srcjo = $("#"+id);
		var elem = srcjo.get(0);
        sType = elem.type;
        var len = 0;
        switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
		        var val = srcjo.val();
				var initConfig = $.formValidator.getInitConfig(elem.settings[0].validatorgroup);
				if (initConfig.wideword)
				{
					for (var i = 0; i < val.length; i++) 
					{
						if (val.charCodeAt(i) >= 0x4e00 && val.charCodeAt(i) <= 0x9fa5){ 
							len += 2;
						}else {
							len++;
						}
					}
				}
				else{
					len = val.length;
				}
		        break;
			case "checkbox":
			case "radio": 
				len = $("input[type='"+sType+"'][name='"+srcjo.attr("name")+"']:checked").length;
				break;
		    case "select-one":
		        len = elem.options ? elem.options.selectedIndex : -1;
				break;
			case "select-multiple":
				len = $("select[name="+elem.name+"] option:selected").length;
				break;
	    }
		return len;
    },
    
	//結合empty這個屬性，判斷僅僅是否為空的校驗情況。
    isEmpty : function(id)
    {
        if($("#"+id).get(0).settings[0].empty && $.formValidator.getLength(id)==0){
            return true;
        }else{
            return false;
		}
    },
    
	//對外調用：判斷單個表單元素是否驗證通過，不帶回調函數
    isOneValid : function(id)
    {
	    return $.formValidator.oneIsValid(id,1).isvalid;
    },
    
	//驗證單個是否驗證通過,正確返回settings[0],錯誤返回對應的settings[i]
	oneIsValid : function (id,index)
	{
		var returnObj = new Object();
		returnObj.id = id;
		returnObj.ajax = -1;
		returnObj.errormsg = "";       //自定義錯誤資訊
		var elem = $("#"+id).get(0);
	    var settings = elem.settings;
	    var settingslen = settings.length;
		//只有一個formValidator的時候不檢驗
		if (settingslen==1){settings[0].bind=false;}
		if(!settings[0].bind){return null;}
		for ( var i = 0 ; i < settingslen ; i ++ )
		{   
			if(i==0){
				if($.formValidator.isEmpty(id)){
					returnObj.isvalid = true;
					returnObj.setting = settings[0];
					break;
				}
				continue;
			}
			returnObj.setting = settings[i];
			if(settings[i].validatetype!="AjaxValidator") {
				$.formValidator.triggerValidate(returnObj);
			}else{
				returnObj.ajax = i;
			}
			if(!settings[i].isvalid) {
				returnObj.isvalid = false;
				returnObj.setting = settings[i];
				break;
			}else{
				returnObj.isvalid = true;
				returnObj.setting = settings[0];
				if(settings[i].validatetype=="AjaxValidator") break;
			}
		}
		return returnObj;
	},

	//驗證所有需要驗證的對象，并返回是否驗證成功。
	pageIsValid : function (validatorgroup)
	{
	    if(validatorgroup == null || validatorgroup == undefined){validatorgroup = "1"};
		var isvalid = true;
		var thefirstid = "",thefirsterrmsg;
		var returnObj,setting;
		var error_tip = "^"; 	

		var initConfig = $.formValidator.getInitConfig(validatorgroup);
		var jqObjs = $(initConfig.validobjectids);
		jqObjs.each(function(i,elem)
		{
			if(elem.settings[0].bind){
				returnObj = $.formValidator.oneIsValid(elem.id,1);
				if(returnObj)
				{
					var tipid = elem.settings[0].tipid;
					//校驗失敗,獲取第一個發生錯誤的資訊和ID
					if (!returnObj.isvalid) {
						isvalid = false;
						if (thefirstid == ""){
							thefirstid = returnObj.id;
							thefirsterrmsg = (returnObj.errormsg==""?returnObj.setting.onerror:returnObj.errormsg)
						}
					}
					//為了解決使用同個TIP提示問題:后面的成功或失敗都不覆蓋前面的失敗 
					if (!initConfig.alertmessage){
						if (error_tip.indexOf("^" + tipid + "^") == -1) {
							if (!returnObj.isvalid) {
								error_tip = error_tip + tipid + "^";
							}
							$.formValidator.showMessage(returnObj);
						}
					}
				}
			}
		});
		//成功或失敗后，進行回調函數的處理，以及成功后的灰掉提交按鈕的功能
		if(isvalid)
		{
            isvalid = initConfig.onsuccess();
			if(initConfig.submitonce){$(":submit").attr("disabled",true);}
		}
		else
		{
			var obj = $("#"+thefirstid).get(0);
			initConfig.onerror(thefirsterrmsg,obj);
			if(thefirstid!="" && initConfig.errorfocus){$("#"+thefirstid).focus();}
		}
		return !initConfig.debug && isvalid;
	},

	//ajax校驗
	ajaxValid : function(returnObj)
	{
		var id = returnObj.id;
	    var srcjo = $("#"+id);
		var elem = srcjo.get(0);
		var settings = elem.settings;
		var setting = settings[returnObj.ajax];
		var ls_url = setting.url;
	    if (srcjo.size() == 0 && settings[0].empty) {
			returnObj.setting = settings[0];
			returnObj.isvalid = true;
			$.formValidator.showMessage(returnObj);
			setting.isvalid = true;
			return;
		}
		if(setting.addidvalue)
		{
			var parm = "clientid="+id+"&"+id+"="+encodeURIComponent(srcjo.val());
			ls_url = ls_url + (ls_url.indexOf("?")>0?("&"+ parm) : ("?"+parm));
		}
		$.ajax(
		{	
			mode : "abort",
			type : setting.type, 
			url : ls_url, 
			cache : setting.cache,
			data : setting.data, 
			async : setting.async, 
			dataType : setting.datatype, 
			success : function(data){
			    if(setting.success(data))
			    {
			        $.formValidator.setTipState(elem,"onCorrect",settings[0].oncorrect);
			        setting.isvalid = true;
			    }
			    else
			    {
			        $.formValidator.setTipState(elem,"onError",setting.onerror);
			        setting.isvalid = false;
			    }
			},
			complete : function(){
				if(setting.buttons && setting.buttons.length > 0){setting.buttons.attr({"disabled":false})};
				setting.complete;
			}, 
			beforeSend : function(xhr){
				//再服務器沒有返回數據之前，先回調提交按鈕
				if(setting.buttons && setting.buttons.length > 0){setting.buttons.attr({"disabled":true})};
				var isvalid = setting.beforesend(xhr);
				if(isvalid)
				{
					setting.isvalid = false;		//如果前面ajax請求成功了，再次請求之前先當作錯誤處理
					$.formValidator.setTipState(elem,"onLoad",settings[returnObj.ajax].onwait);
				}
				setting.lastValid = "-1";
				return isvalid;
			}, 
			error : function(){
			    $.formValidator.setTipState(elem,"onError",setting.onerror);
			    setting.isvalid = false;
				setting.error();
			},
			processData : setting.processdata 
		});
	},

	//對正則表達式進行校驗（目前只針對input和textarea）
	regexValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcTag = $("#"+id).get(0).tagName;
		var elem = $("#"+id).get(0);
		//如果有輸入正則表達式，就進行表達式校驗
		if(elem.settings[0].empty && elem.value==""){
			setting.isvalid = true;
		}
		else 
		{
			var regexpress = setting.regexp;
			if(setting.datatype=="enum"){regexpress = eval("regexEnum."+regexpress);}
			if(regexpress==undefined || regexpress==""){
				setting.isvalid = false;
				return;
			}
			setting.isvalid = (new RegExp(regexpress, setting.param)).test($("#"+id).val());
		}
	},
	
	//函數校驗。返回true/false表示校驗是否成功;返回字符串表示錯誤資訊，校驗失敗;如果沒有返回值表示處理函數，校驗成功
	functionValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
	    var srcjo = $("#"+id);
		var lb_ret = setting.fun(srcjo.val(),srcjo.get(0));
		if(lb_ret != undefined) 
		{
			if(typeof lb_ret == "string"){
				setting.isvalid = false;
				returnObj.errormsg = lb_ret;
			}else{
				setting.isvalid = lb_ret;
			}
		}
	},
	
	//對input和select類型控件進行校驗
	inputValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcjo = $("#"+id);
		var elem = srcjo.get(0);
		var val = srcjo.val();
		var sType = elem.type;
		var len = $.formValidator.getLength(id);
		var empty = setting.empty,emptyerror = false;
		switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
				if (setting.type == "size") {
					empty = setting.empty;
					if(!empty.leftempty){
						emptyerror = (val.replace(/^[ \s]+/, '').length != val.length);
					}
					if(!emptyerror && !empty.rightempty){
						emptyerror = (val.replace(/[ \s]+$/, '').length != val.length);
					}
					if(emptyerror && empty.emptyerror){returnObj.errormsg= empty.emptyerror}
				}
			case "checkbox":
			case "select-one":
			case "select-multiple":
			case "radio":
				var lb_go_on = false;
				if(sType=="select-one" || sType=="select-multiple"){setting.type = "size";}
				var type = setting.type;
				if (type == "size") {		//獲得輸入的字符長度，并進行校驗
					if(!emptyerror){lb_go_on = true}
					if(lb_go_on){val = len}
				}
				else if (type =="date" || type =="datetime")
				{
					var isok = false;
					if(type=="date"){lb_go_on = isDate(val)};
					if(type=="datetime"){lb_go_on = isDate(val)};
					if(lb_go_on){val = new Date(val);setting.min=new Date(setting.min);setting.max=new Date(setting.max);};
				}else{
					stype = (typeof setting.min);
					if(stype =="number")
					{
						val = (new Number(val)).valueOf();
						if(!isNaN(val)){lb_go_on = true;}
					}
					if(stype =="string"){lb_go_on = true;}
				}
				setting.isvalid = false;
				if(lb_go_on)
				{
					if(val < setting.min || val > setting.max){
						if(val < setting.min && setting.onerrormin){
							returnObj.errormsg= setting.onerrormin;
						}
						if(val > setting.min && setting.onerrormax){
							returnObj.errormsg= setting.onerrormax;
						}
					}
					else{
						setting.isvalid = true;
					}
				}
				break;
		}
	},
	
	compareValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcjo = $("#"+id);
	    var desjo = $("#"+setting.desid );
		var ls_datatype = setting.datatype;
	    setting.isvalid = false;
		curvalue = srcjo.val();
		ls_data = desjo.val();
		if(ls_datatype=="number")
        {
            if(!isNaN(curvalue) && !isNaN(ls_data)){
				curvalue = parseFloat(curvalue);
                ls_data = parseFloat(ls_data);
			}
			else{
			    return;
			}
        }
		if(ls_datatype=="date" || ls_datatype=="datetime")
		{
			var isok = false;
			if(ls_datatype=="date"){isok = (isDate(curvalue) && isDate(ls_data))};
			if(ls_datatype=="datetime"){isok = (isDateTime(curvalue) && isDateTime(ls_data))};
			if(isok){
				curvalue = new Date(curvalue);
				ls_data = new Date(ls_data)
			}
			else{
				return;
			}
		}
		
	    switch(setting.operateor)
	    {
	        case "=":
	            if(curvalue == ls_data){setting.isvalid = true;}
	            break;
	        case "!=":
	            if(curvalue != ls_data){setting.isvalid = true;}
	            break;
	        case ">":
	            if(curvalue > ls_data){setting.isvalid = true;}
	            break;
	        case ">=":
	            if(curvalue >= ls_data){setting.isvalid = true;}
	            break;
	        case "<": 
	            if(curvalue < ls_data){setting.isvalid = true;}
	            break;
	        case "<=":
	            if(curvalue <= ls_data){setting.isvalid = true;}
	            break;
	    }
	},
	
	localTooltip : function(e)
	{
		e = e || window.event;
		var mouseX = e.pageX || (e.clientX ? e.clientX + document.body.scrollLeft : 0);
		var mouseY = e.pageY || (e.clientY ? e.clientY + document.body.scrollTop : 0);
		$("#fvtt").css({"top":(mouseY+2)+"px","left":(mouseX-40)+"px"});
	}
};

//每個校驗控件必須初始化的
$.fn.formValidator = function(cs) 
{
	var setting = 
	{
		validatorgroup : "1",
		empty :false,
		submitonce : false,
		automodify : false,
		onshow :"請輸入內容",
		onfocus: "請輸入內容",
		oncorrect: "輸入正確",
		onempty: "輸入內容為空",
		defaultvalue : null,
		bind : true,
		validatetype : "InitValidator",
		tipcss : 
		{
			"left" : "10px",
			"top" : "1px",
			"height" : "20px",
			"width":"250px"
		},
		triggerevent:"blur",
		forcevalid : false
	};

	//獲取該校驗組的全局配置資訊
	cs = cs || {};
	if(cs.validatorgroup == undefined){cs.validatorgroup = "1"};
	var initConfig = $.formValidator.getInitConfig(cs.validatorgroup);

	//如果為精簡模式，tipcss要重新設置初始值
	if(initConfig.tidymode){setting.tipcss = {"left" : "2px","width":"22px","height":"22px","display":"none"}};
	
	//先合并整個配置(深度拷貝)
	$.extend(true,setting, cs);

	return this.each(function(e)
	{
		var jqobj = $(this);
		var setting_temp = {};
		$.extend(true,setting_temp, setting);
		var tip = setting_temp.tipid ? setting_temp.tipid : this.id+"Tip";
		//自動形成TIP
		if(initConfig.autotip)
		{
			//獲取層的ID、相對定位控件的ID和坐標
			if($("body [id="+tip+"]").length==0)
			{
				aftertip = setting_temp.relativeid ? setting_temp.relativeid : this.id;
				var obj = getTopLeft(aftertip);
				var y = obj.top;
				var x = getElementWidth(aftertip) + obj.left;
				$("<div class='formValidateTip'></div>").appendTo($("body")).css({left: x+"px", top: y+"px"}).prepend($('<div id="'+tip+'"></div>').css(setting_temp.tipcss));
			}
			if(initConfig.tidymode){jqobj.showTooltips()};
		}
		
		//每個控件都要保存這個配置資訊
		setting.tipid = tip;
		$.formValidator.appendValid(this.id,setting);

		//保存控件ID
		var validobjectids = initConfig.validobjectids;
		if(validobjectids.indexOf("#"+this.id+" ")==-1){
			initConfig.validobjectids = (validobjectids=="" ? "#"+this.id : validobjectids + ",#" + this.id);
		}

		//初始化顯示資訊
		if(!initConfig.alertmessage){
			$.formValidator.setTipState(this,"onShow",setting.onshow);
		}

		var srcTag = this.tagName.toLowerCase();
		var stype = this.type;
		var defaultval = setting.defaultvalue;
		//處理默認值
		if(defaultval){
			jqobj.val(defaultval);
		}

		if(srcTag == "input" || srcTag=="textarea")
		{
			//註冊獲得焦點的事件。改變提示對象的文字和樣式，保存原值
			jqobj.focus(function()
			{	
				if(!initConfig.alertmessage){
					//保存原來的狀態
					var tipjq = $("#"+tip);
					this.lastshowclass = tipjq.attr("class");
					this.lastshowmsg = tipjq.html();
					$.formValidator.setTipState(this,"onFocus",setting.onfocus);
				}
				if (stype == "password" || stype == "text" || stype == "textarea" || stype == "file") {
					this.validoldvalue = jqobj.val();
				}
			});
			//註冊失去焦點的事件。進行校驗，改變提示對象的文字和樣式；出錯就提示處理
			jqobj.bind(setting.triggerevent, function(){
				var settings = this.settings;
				var returnObj = $.formValidator.oneIsValid(this.id,1);
				if(returnObj==null){return;}
				if(returnObj.ajax >= 0) 
				{
					$.formValidator.showAjaxMessage(returnObj);
				}
				else
				{
					var showmsg = $.formValidator.showMessage(returnObj);
					if(!returnObj.isvalid)
					{
						//自動修正錯誤
						var auto = setting.automodify && (this.type=="text" || this.type=="textarea" || this.type=="file");
						if(auto && !initConfig.alertmessage)
						{
							alert(showmsg);
							$.formValidator.setTipState(this,"onShow",setting.onshow);
						}
						else
						{
							if(initConfig.forcevalid || setting.forcevalid){
								alert(showmsg);this.focus();
							}
						}
					}
				}
			});
		} 
		else if (srcTag == "select")
		{
			//獲得焦點
			jqobj.bind("focus", function(){	
				if(!initConfig.alertmessage){
					$.formValidator.setTipState(this,"onFocus",setting.onfocus);
				}
			});
			//失去焦點
			jqobj.bind("blur",function(){jqobj.trigger("change")});
			//選擇項目后觸發
			jqobj.bind("change",function()
			{
				var returnObj = $.formValidator.oneIsValid(this.id,1);	
				if(returnObj==null){return;}
				if ( returnObj.ajax >= 0){
					$.formValidator.showAjaxMessage(returnObj);
				}else{
					$.formValidator.showMessage(returnObj); 
				}
			});
		}
	});
}; 

$.fn.inputValidator = function(controlOptions)
{
	var settings = 
	{
		isvalid : false,
		min : 0,
		max : 99999999999999,
		type : "size",
		onerror:"輸入錯誤",
		validatetype:"InputValidator",
		empty:{leftempty:true,rightempty:true,leftemptyerror:null,rightemptyerror:null},
		wideword:true
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.compareValidator = function(controlOptions)
{
	var settings = 
	{
		isvalid : false,
		desid : "",
		operateor :"=",
		onerror:"輸入錯誤",
		validatetype:"CompareValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.regexValidator = function(controlOptions)
{
	var settings = 
	{
		isvalid : false,
		regexp : "",
		param : "i",
		datatype : "string",
		onerror:"輸入的格式不正確",
		validatetype:"RegexValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.functionValidator = function(controlOptions)
{
	var settings = 
	{
		isvalid : true,
		fun : function(){this.isvalid = true;},
		validatetype:"FunctionValidator",
		onerror:"輸入錯誤"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.ajaxValidator = function(controlOptions)
{
	var settings = 
	{
		isvalid : false,
		lastValid : "",
		type : "GET",
		url : "",
		addidvalue : true,
		datatype : "html",
		data : "",
		async : true,
		cache : false,
		beforesend : function(){return true;},
		success : function(){return true;},
		complete : function(){},
		processdata : false,
		error : function(){},
		buttons : null,
		onerror:"服務器校驗沒有通過",
		onwait:"正在等待服務器返回數據",
		validatetype:"AjaxValidator"
	};
	controlOptions = controlOptions || {};
	$.extend(true, settings, controlOptions);
	return this.each(function()
	{
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.defaultPassed = function(onshow)
{
	return this.each(function()
	{
		var settings = this.settings;
		for ( var i = 1 ; i < settings.length ; i ++ )
		{   
			settings[i].isvalid = true;
			if(!$.formValidator.getInitConfig(settings[0].validatorgroup).alertmessage){
				var ls_style = onshow ? "onShow" : "onCorrect";
				$.formValidator.setTipState(this,ls_style,settings[0].oncorrect);
			}
		}
	});
};

$.fn.unFormValidator = function(unbind)
{
	return this.each(function()
	{
		this.settings[0].bind = !unbind;
		if(unbind){
			$("#"+this.settings[0].tipid).hide();
		}else{
			$("#"+this.settings[0].tipid).show();
		}
	});
};

$.fn.showTooltips = function()
{
	if($("body [id=fvtt]").length==0){
		fvtt = $("<div id='fvtt' style='position:absolute;z-index:56002'></div>");
		$("body").append(fvtt);
		fvtt.before("<iframe src='about:blank' class='fv_iframe' scrolling='no' frameborder='0'></iframe>");
		
	}
	return this.each(function()
	{
		jqobj = $(this);
		s = $("<span class='top' id=fv_content style='display:block'></span>");
		b = $("<b class='bottom' style='display:block' />");
		this.tooltip = $("<span class='fv_tooltip' style='display:block'></span>").append(s).append(b).css({"filter":"alpha(opacity:95)","KHTMLOpacity":"0.95","MozOpacity":"0.95","opacity":"0.95"});
		//註冊事件
		jqobj.mouseover(function(e){
			$("#fvtt").append(this.tooltip);
			$("#fv_content").html(this.Tooltip);
			$.formValidator.localTooltip(e);
		});
		jqobj.mouseout(function(){
			$("#fvtt").empty();
		});
		jqobj.mousemove(function(e){
			$("#fv_content").html(this.Tooltip);
			$.formValidator.localTooltip(e);
		});
	});
}

})(jQuery);

function getElementWidth(objectId) {
	x = document.getElementById(objectId);
	return x.offsetWidth;
}

function getTopLeft(objectId) {
	obj = new Object();
	o = document.getElementById(objectId);
	oLeft = o.offsetLeft;
	oTop = o.offsetTop;
	while(o.offsetParent!=null) {
		oParent = o.offsetParent;
		oLeft += oParent.offsetLeft;
		oTop += oParent.offsetTop;
		o = oParent;
	}
	obj.top = oTop;
	obj.left = oLeft;
	return obj;
}