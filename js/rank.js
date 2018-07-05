function rank(did){ 
	$.post("rank.php",{ajax:1},function(data){   
		if(data==''){//0 
		}else{      
			$(did).html(data);
		}    
	});
}
$(function(){
	rank("#rank");
});