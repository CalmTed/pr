//TeddyFrost©
//if you want to use this code please contact me : r2d2f9@gmail.com
//using this code without contact me is a theft!

var start = function() {//main function
	$('#table').css('margin-top',$(window).height());
	$('bg').css('background-image','url(img/bg'+$('bg').attr('i')+'.jpg)');
	$(document).scroll(function(){
		scroll = $(this).scrollTop();
		$('bg').css('top' ,-scroll/2+'px');
	});
}//end main function
$(document).ready(function(){start()});