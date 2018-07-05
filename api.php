<?php
if(isset($_GET["type"])){
	$type=$_GET["type"];
	/*
	$urlinfo = parse_url($url);
	if(!empty($urlinfo)){
		$scheme = '';
		if (isset($urlinfo['scheme']) && $urlinfo['scheme']=='http'){
			$scheme = 'http://';
		}
		elseif (isset($urlinfo['scheme']) && $urlinfo['scheme']=='https'){
			$scheme = 'https://';
		}
		$urlname = $scheme.$urlinfo['host'];
		$urlport = $urlinfo['port'];
	}
	$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
	$url = $protocol.$_SERVER['HTTP_HOST'];*/
	$url="https://chemapp.njzjz.win";
	header("Content-type: text/html; charset=utf-8"); 
	if($type=="element"||$type=="mass"||$type=="deviation"){
		$content=file_get_contents($url."/".$_GET["type"].".php?ajax=1&html=no&input=".$_GET["input"]);
	}elseif($type=="acid"){
		$content=file_get_contents($url."/".$_GET["type"].".php?ajax=1&html=no&pKa=".$_GET["pKa"]."&c=".$_GET["c"]."&AorB=".$_GET["AorB"]."&acidName=".$_GET["acidName"]);
	}elseif($type=="gas"){
		$content=file_get_contents($url."/".$_GET["type"].".php?ajax=1&html=no&type=".$_GET["mode"]."&p=".$_GET["p"]."&V=".$_GET["V"]."&n=".$_GET["n"]."&T=".$_GET["T"]);
	}elseif($type=="exam"){
		$content=file_get_contents($url."/".$_GET["type"].".php?ajax=1&html=no&mode=".$_GET["mode"]."&question=".$_GET["question"]."&answer=".$_GET["answer"]);
	}else{
		echo "输入有误！";
		exit;
	}
	if($_GET["method"]=="1")echo nl2br($content);else echo $content;
}else{
	echo "输入有误！";
}