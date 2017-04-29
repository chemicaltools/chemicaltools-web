function admin(id,did){ 
	$.post("admin.php",{ajax:1,id:id},function(data){   
		if(data==''){//0 
		}else{      
			$(did).html(data);
		}    
	});
}
$(function(){
	admin($("#id").val(),"#output");
});