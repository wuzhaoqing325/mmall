
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');


// page逻辑部分
var page = {
	init:function(){
		this.onLoad();
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
	}
};
$(function(){
	page.init();
});

