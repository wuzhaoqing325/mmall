
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex   = require('./index.string');


// page逻辑部分
var page = {
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		// 初始化左侧菜单
		navSide.init({
			name:'user-center'
		});
		// 加载用户信息
		this.loadUserInfo();
	},
	// 加载用户信息
	loadUserInfo:function(){
		var userHtlm = '';
		_user.getUserInfo(function(res){
			userHtlm = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtlm);
		}, function(errMsg){
			_mm.errorTips(errMsg);
		})
	},
	bindEvent:function(){
		var _this = this;
		// 点击提交按钮后的动作
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				phone: $.trim($('#phone').val()),
				email: $.trim($('#email').val()),
				qusetion: $.trim($('#qusetion').val()),
				answer: $.trim($('#answer').val())
			},
			validateResult = _this.validateForm(userInfo);
			// 验证通过
			if(validateResult.status){
				// 更改用户信息
				_user.updateUserInfo(userInfo, function(res, msg){
					_mm.successTips(msg);
					window.location.href = './user-center.html';
				}, function(errMsg){
					_mm.errorTips(errMsg);
				})
			}
			// 验证不通过
			else {
				_mm.errorTips(validateResult.msg);
			}
		})
	},
	validateForm:function(formData){
		var result = {
			status: false,
			msg: ''
		};
		// 验证手机号
		if(!_mm.validate(formData.phone, 'phone')){
			result.msg = '手机号格式不正确';
			return result;
		}
		// 验证邮箱
		if(!_mm.validate(formData.email, 'email')){
			result.msg = '邮箱格式不正确';
			return result;
		}
		// 验证问题
		if(!_mm.validate(formData.qusetion, 'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		// 验证答案
		if(!_mm.validate(formData.answer, 'answer')){
			result.msg = '密码提示问题答案不能为空';
			return result;
		}
		// 通过验证，返回正确提示
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};
$(function(){
	page.init();
});

