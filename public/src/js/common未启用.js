

	
//form序列化json
$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [ o[this.name] ];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
}



//验证正则
var RegExpConfig = {
  //可为空,不为空则不能输入特殊字符
  canNullNoSign:"^$|^[0-9a-zA-Z\u4e00-\u9fa5!！，,.。]+$",
  //不为空,可以为任意
  noNull: "^\\s$|.",
  //性别数字判断
  sex: "[^3\\s]+",
  //姓名 ^([\\u4E00-\\u9FA5]{2,7}|[a-zA-Z]+)$|^[A-Za-z][a-zA-Z ]{0,58}[A-Za-z]$
  fullName:"^\\s$|^[0-9a-zA-Z\u4e00-\u9fa5!！，,.。]{1,13}$",
  //编码
  code:"^\\s|^\\w+[0-9A-Za-z]$",
  //备注
  remarks:this.canNullOrMust,
  //url ((http|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?
  url:"^\\s$|.",
  //手机号码
  phone: "^1([3|7][0-9]|4[57]|5[0-9]|7[678]|8[0-9])-?[0-9]{4}-?[0-9]{4}$",
  //email
  email: "^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$",
  //大陆身份证
  identityCard: "^(\\d{15}$|^\\d{18}$|^\\d{17}(\\d|X|x))$",
  //警官证，军官证,士兵证
  officerCard: "^[北边兵部参藏成川大滇电鄂甘赣公广海黑后沪黄吉济疆交金津京警军考科空兰连辽泸鲁蒙闽南炮黔琼蓉叁森陕社沈水苏穗特通退皖文武锡湘消校新学研勇渝豫院粤臧浙证政指驻装总副冀晋贵云青台桂宁港澳蜀秦陇]{1,4}字第[0-9]{6,8}号$",
  //营业执照
  businessLicense: "(^[0-9]{7}[0-2]{1}[0-9]{7}$)|(^[0-9]{7}[1-5]{1}[0-2]{1}[0-9]{6}$)",
  //澳门身份证
  AMidentityCard: "[157]{1}[0-9]{6}\\([0-9]{1}\\)",
  //台湾身份证
  TWidentityCard: "^[a-zA-Z]{1}[0-9]{9}$",
  //香港身份证
  HKidentityCard: "[A-Z]{1}[0-9]{6}\\([0-9]{1}\\)",
  //组织机构代码证
  institutional: "^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$",
  //匹配所有
  all: ".*"
};


//公共ajax
common.ajaxRequest=function(config){
  var _config = {
    contentType: "application/json",
    error:function (response) {
      alert('系统内部处理错误!');
    }
  };
  $.extend(true,_config,config);
  _config.success = function(res){
      if(res.errorDbTip){
        alert(res.errorDbTip)
      }else{
        if(config.success){
          config.success(res);
        }
      }
  };
  $.ajax(_config.url,_config);
};



//未选择提示信息
common.modalDelTip=function(){
  var modalDelData='<div class="containers modal fade" id="del-ModalTip"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><span data-dismiss="modal" class="close">&times;</span><h5 class="modal-title text-danger">提示</h5></div><div class="modal-body"><h5 class="text-danger"><span class="glyphicon glyphicon-alert"></span>&nbsp;请至少选择一行要删除的内容!</h5></div><div class="modal-footer"><button data-dismiss="modal" class="btn btn-default btn-sm" type="button">我知道了</button></div></div></div></div>';
  $("body").append(modalDelData);
  $('#del-ModalTip').modal({keyboard: true})//调用模态框

  $('#del-ModalTip').on('hidden.bs.modal', function () {
    $("#del-ModalTip").remove()
  })
}

//删除确认提示
common.modalDelEnterTip=function(enter){
  var modalDelData='	<div class="containers modal fade" id="del-Modal"> <div class="modal-dialog"><div class="modal-content"><div class="modal-header"><span data-dismiss="modal" class="close">&times;</span> <h5 class="modal-title text-danger">提示</h5></div><div class="modal-body"><h5 class="text-danger"><span class="glyphicon glyphicon-alert"></span>&nbsp;您正在执行删除操作,您确定要删除吗?</h5></div><div class="modal-footer"><a class="btn btn-danger btn-sm" href="javascript:void(0)" id="delRow">删除</a><button data-dismiss="modal" class="btn btn-default btn-sm" type="button">取消</button></div></div></div></div>';
  $("body").append(modalDelData);
  $('#del-Modal').modal({keyboard: true})//调用模态框
  $('#del-Modal').on('hidden.bs.modal', function () {
    $("#del-Modal").remove()
  })
}


//单个表单验证
$('input,select,textarea').bind('input oninput', function() {
//校验表单所有正则表达式
    //fullName 姓名
  if(this.dataset.type){
    if('fullName'===this.dataset.type){
      this.setAttribute("data-pattern",RegExpConfig.fullName);

        if (new RegExp(/^\s+/).test(this.value)) { //不能以空格开始
          this.value = this.value.replace(/^\s+|\s+$/, "");
        }
        if (new RegExp(this.dataset.pattern).test(this.value)) { //验证通过

          //this.removeAttribute("style");
          $(this).parents(".form-group").removeClass("has-error").addClass("has-success has-feedback")
          $(this).next("span").remove();
          if($(this).next("span").length==0){
            var validOK='<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
            $(this).after(validOK);
          }
        } else {

          $(this).parents(".form-group").removeClass("has-success").addClass("has-error has-feedback")
          $(this).next("span").remove();
          if($(this).next("span").length==0){
            var validError='<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
            $(this).after(validError);
          }
          //this.style.border = "solid red 1px";
        }

    }else if('remarks'===this.dataset.type){
      this.setAttribute("data-pattern",RegExpConfig.canNullNoSign);

        if (new RegExp(/^\s+/).test(this.value)) { //不能以空格开始
          this.value = this.value.replace(/^\s+|\s+$/, "");
        }
        if (new RegExp(this.dataset.pattern).test(this.value)) { //验证通过
          //this.removeAttribute("style");
          $(this).parents(".form-group").removeClass("has-error").addClass("has-success has-feedback")
          $(this).next("span").remove();
          if($(this).next("span").length==0){
            var validOK='<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
            $(this).after(validOK);
          }
        } else {
          //this.style.border = "solid red 1px";
          $(this).parents(".form-group").removeClass("has-success").addClass("has-error has-feedback")
          $(this).next("span").remove();
          if($(this).next("span").length==0){
            var validError='<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
            $(this).after(validError);
          }
        }

    }else if('url'===this.dataset.type){
      this.setAttribute("data-pattern",RegExpConfig.url);

        if (new RegExp(/^\s+/).test(this.value)) { //不能以空格开始
          this.value = this.value.replace(/^\s+|\s+$/, "");
        }
        if (new RegExp(this.dataset.pattern).test(this.value)) { //验证通过
          $(this).parents(".form-group").removeClass("has-error").addClass("has-success has-feedback")
          $(this).next("span").remove();
          if($(this).next("span").length==0){
            var validOK='<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
            $(this).after(validOK);
          }
        } else {
          $(this).parents(".form-group").removeClass("has-success").addClass("has-error has-feedback")
          $(this).next("span").remove();
          if($(this).next("span").length==0){
            var validError='<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
            $(this).after(validError);
          }
        }
    }
    else if('code'===this.dataset.type){
      this.setAttribute("data-pattern",RegExpConfig.code);
      if (new RegExp(/^\s+/).test(this.value)) { //不能以空格开始
        this.value = this.value.replace(/^\s+|\s+$/, "");
      }
      if (new RegExp(this.dataset.pattern).test(this.value)) { //验证通过
        $(this).parents(".form-group").removeClass("has-error").addClass("has-success has-feedback")
        $(this).next("span").remove();
        if($(this).next("span").length==0){
          var validOK='<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
          $(this).after(validOK);
        }
      } else {
        $(this).parents(".form-group").removeClass("has-success").addClass("has-error has-feedback")
        $(this).next("span").remove();
        if($(this).next("span").length==0){
          var validError='<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
          $(this).after(validError);
        }
      }
    }
    else if('noNull'===this.dataset.type){
      this.setAttribute("data-pattern",RegExpConfig.noNull);
      if (new RegExp(/^\s+/).test(this.value)) { //不能以空格开始
        this.value = this.value.replace(/^\s+|\s+$/, "");
      }
      if (new RegExp(this.dataset.pattern).test(this.value)) { //验证通过
        $(this).parents(".form-group").removeClass("has-error").addClass("has-success has-feedback")
        $(this).next("span").remove();
        if($(this).next("span").length==0){
          var validOK='<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
          $(this).after(validOK);
        }
      } else {
        $(this).parents(".form-group").removeClass("has-success").addClass("has-error has-feedback")
        $(this).next("span").remove();
        if($(this).next("span").length==0){
          var validError='<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
          $(this).after(validError);
        }
      }
    }
  }


});

//登录遍历验证
common.validate=function(form){
  var result = true;
  if (form != undefined && form != "" && form != "undefined") {

    form.find('input[type="text"],select,textarea').each(function (i, _this) {
      //开始赋值正则
      if("fullName"==_this.dataset.type){
          _this.setAttribute("data-pattern",RegExpConfig.fullName)
      }else if("canNull"==_this.dataset.type){
        _this.setAttribute("data-pattern",RegExpConfig.canNullNoSign)
      }else if("remarks"==_this.dataset.type){
        _this.setAttribute("data-pattern",RegExpConfig.canNullNoSign)
      }else if("url"==_this.dataset.type){
        _this.setAttribute("data-pattern",RegExpConfig.url)
      }else if("code"==_this.dataset.type){
        _this.setAttribute("data-pattern",RegExpConfig.code)
      }else if("noNull"==_this.dataset.type){
        _this.setAttribute("data-pattern",RegExpConfig.noNull)
      }

      //开始验证
      if (new RegExp(_this.dataset.pattern).test(_this.value)) {
        //_this.removeAttribute("style");//验证通过,移除提示
        $(this).parents(".form-group").removeClass("has-error").addClass("has-success has-feedback")
        $(this).next("span").remove();
        if($(this).next("span").length==0){
          var validOK='<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
          $(this).after(validOK);
        }
      } else { //验证不通过
        result=false;
        //_this.style.border = "solid red 1px";
        $(this).parents(".form-group").removeClass("has-success").addClass("has-error has-feedback")
        $(this).next("span").remove();
        if($(this).next("span").length==0){
          var validError='<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
          $(this).after(validError);
        }
      }
    })
  }
  return result;
}