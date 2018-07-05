function login(username,password,did){ 
	$.post("login.php",{ajax:1,username:username,password:password},function(data){   
		if(data==''){//0 
		}else{      
			$(did).html(data);
		}    
	});
}
function redirect(){ 
	window.location.href=decodeURIComponent($("#url").val());
}
$(function(){
	$("#form").submit(function(e) {
		login($("#username").val(),$("#password").val(),"#output");
		return false;
	});
});