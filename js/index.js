function doyouknow(did){ 
	$.post("doyouknow.php",{ajax:1},function(data){   
		if(data==''){//0 
		}else{      
			$(did).html(data);
		}    
	});
}
$(function(){
	doyouknow("#doyouknow");
	if($("#login").val()=="1"){
		history('historyMass','#historyMass');
		history('historyAcid','#historyAcid');
		history('historyElementmin','#historyElementmin');
		history('historyDeviation','#historyDeviation');
		history('historyExam','#historyExam');
	}else{
		var url=$("#url").val();
		var texlogina='<a href="login.php?url='+url+'">登陆</a>或<a href="signup.php?url='+url+'">注册</a>后，即可查看历史记录，赶快试试吧！';
		var texloginb='<a href="login.php?url='+url+'">登陆</a>或<a href="signup.php?url='+url+'">注册</a>后，即可存储战绩，赶快试试吧！';
		$("#historyMass").html(texlogina);
		$("#historyAcid").html(texlogina);
		$("#historyElementmin").html(texlogina);
		$("#historyDeviation").html(texlogina);
		$("#historyExam").html(texloginb);
	}
});