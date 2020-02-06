// http://happymmall.com/product/list.do?keyword=1

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var templateBanner = require('./banner.string');
var _mm = require('util/mm.js');

$(function(){
	// 渲染banner的html
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	// 初始化banner
	var $slider = $('.banner').unslider({
		dots:true
	});
	// 前一张和后一张操作的事件绑定
	$('banner-con .banner-arrow').click(function(){
		var forword = $(this).hasClass('prev') ? 'prev' : 'next';
		$slider.data('unslider')[forword]();
	});
});