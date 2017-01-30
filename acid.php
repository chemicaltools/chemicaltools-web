<?php
require 'load.php';
require 'acid_xml.php';
use \LeanCloud\User;
function calpH($pKa,$c,$pKw) {
	$Ka1=pow(10,-$pKa[0]);
	$Kw=pow(10,-$pKw);
	$cH=(sqrt($Ka1*$Ka1+4*$Ka1*$c+$Kw)-$Ka1)*0.5;
	if($cH>0) return -log10($cH); else return 1024;
}
function calpHtoc($pKa,$c,$pH){
	$D=0;$E=1;
	$G=array();$Ka=array();$pHtoc=array();
	$H=pow(10,-$pH);
	$F=pow($H,count($pKa)+1);
	for($i=0;$i<count($pKa);$i++){
		$Ka[$i]=pow(10,-$pKa[$i]);
	}
	for($i=0;$i<count($pKa)+1;$i++){
		$G[$i]=$F*$E;
		$D=$D+$G[$i];
		$F=$F/$H;
		$E=$E*$Ka[$i];
	}
	for($i=0;$i<count($pKa)+1;$i++){
		$pHtoc[$i]=$c*$G[$i]/$D;
	}
	return $pHtoc;
}
if($_POST['ajax'] =="1"||$_GET['ajax']=="1"){
	if($_POST['pKa']!=""&&$_POST['c']!=""){
		$strpKa=$_POST['pKa'];
		$c=(double)$_POST['c'];
		$liquidpKa=-1.74;
		if ($currentUser != null) {
			if(isset($_COOKIE['pKw'])){
				$pKw=(double)$_COOKIE['pKw'];
			}else{
				$pKw=(double)$currentUser->get("pKw");
				setcookie('pKw',(string)$pKw,time() + 259200);
			}
		}else{
			$pKw=14;
		}
		if($_POST['AorB']=="acid")$AorB=true;else $AorB=false;
		if($_POST['acidName']!=""||$_GET['acidName']!=""){
			if($_POST['acidName']!="")$acidName=$_POST['acidName'];else $acidName=$_GET['acidName'];
		}
		if($AorB){
			$ABname="A";
			$ABnameall="HA";
			if($acidName!=""&&$acidName!="HA"){
				for($i=0;$i<count($acidnameArray);$i++) {
					if ($acidName==(string)$acidnameArray[$i]){
						$ABname=(string)$acidAbbrArray[$i];
						$ABnameall= $acidName;
						break;
					}
				}
			}
		}else{
			$ABname="B";
			$ABnameall="BOH";
			if($acidName!=""&&acidName!="BOH"){
				for($i=0;$i<count($basenameArray);$i++) {
					if ($acidName==(string)$basenameArray[$i]){
						$ABname=(string)$baseAbbrArray[$i];
						$ABnameall= $acidName;
						break;
					}
				}
			}
		}
		for($i=0;$i<strlen($ABname);$i++) {
			if (ord(substr($ABname,$i,1)) >= 48 && ord(substr($ABname,$i,1)) <= 57) {
				$ABnameHtml =$ABnameHtml. "<sub>" . substr($ABname,$i,1) . "</sub>";
			} else {
				$ABnameHtml =$ABnameHtml. substr($ABname,$i,1);
			}
		}
		for($i=0;$i<strlen($ABnameall);$i++) {
			if (ord(substr($ABnameall,$i,1)) >= 48 && ord(substr($ABnameall,$i,1)) <= 57) {
				$ABnameallHtml =$ABnameallHtml. "<sub>" . substr($ABnameall,$i,1) . "</sub>";
			} else {
				$ABnameallHtml =$ABnameallHtml. substr($ABnameall,$i,1);
			}
		}
		$strpKaArray=explode(" ",$strpKa);
		$valpKa=array();
		for($i=0;$i<count($strpKaArray);$i++){
			$valpKa[$i]=(double)$strpKaArray[$i];
			if ($valpKa[$i]<$liquidpKa) $valpKa[$i]=$liquidpKa;
		}
		$pH=calpH($valpKa,$c,$pKw);
		$cAB=calpHtoc($valpKa,$c,$pH);
		if(!$AorB) $pH=$pKw-$pH;
		$H=pow(10,-$pH);
		$acidOutput=$ABnameallHtml." ,c=".$c."mol/L, ";
		for($i=0;$i<count($valpKa);$i++){
			if($AorB)$acidOutput=$acidOutput."pK<sub>a</sub>";else $acidOutput=$acidOutput."pK<sub>b</sub>";
			if(count($valpKa)>1)$acidOutput=$acidOutput."<sub>".($i+1)."</sub>";
			$acidOutput=$acidOutput."=".$strpKaArray[$i].", ";
		}
		$acidOutput=$acidOutput."\n溶液的pH为".sprintf("%.2f",$pH).".";
		$acidOutput=$acidOutput."\n"."c(H<sup>+</sup>)=".sprintf("%1$.2e",$H)."mol/L,";
		for($i=0;$i<count($cAB);$i++){
			$cABoutput="c(";
			if($AorB){
				if($i<count($cAB)-1){
					$cABoutput=$cABoutput."H";
					if(count($cAB)-$i>2) $cABoutput=$cABoutput."<sub>".(count($cAB) - $i-1)."</sub>";
				}
				$cABoutput=$cABoutput.$ABnameHtml;
				if($i>0){
					if($i>1) $cABoutput=$cABoutput."<sup>".($i)."</sup>";
					$cABoutput=$cABoutput."<sup>-</sup>";
				}
			}else{
				$cABoutput=$cABoutput.$ABnameHtml;
				if(count($cAB)-$i>2){
					$cABoutput=$cABoutput."(OH)<sub>".(count($cAB)- $i-1)."</sub>";
				}else if(count($cAB)-$i==2){
					$cABoutput=$cABoutput."OH";
				}
				if($i>0){
					if($i>1) $cABoutput=$cABoutput."<sup>".($i)."</sup>";
					$cABoutput=$cABoutput."<sup>+</sup>";
				}
			}
			$cABoutput=$cABoutput.")=";
			$acidOutput=$acidOutput."\n".$cABoutput.sprintf("%1$.2e",$cAB[$i])."mol/L,";
		}
		$acidOutput=rtrim($acidOutput,",").".";
		echo '<p>'.nl2br($acidOutput).'<p>';
		if ($currentUser != null) {
			?>
			<script type="text/javascript">
				change("historyAcidOutput", "<?=str_replace("\n","\\n",$acidOutput)?>");
			</script>
			<?php
		}
	}
}else{
	if ($currentUser != null) {
		$login=1;
	}else{
		$login=0;
	}
?>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<?php include 'head.php';?>
<script type="text/javascript" src="/js/acid.js"></script>
<title>酸碱计算 -- 化学e+</title>
  </head>
  <body>
<?php include 'header.php';
?>
    <section class="main-content">
	<? 
	include 'title.php';?>
		<h2>酸碱计算</h2>
		<form method='post' action='acid.php' id="form">
		<table><tr><td><input type="hidden" id="login" name="login" value="<?=$login;?>"  />  
		<input type="text" name="pKa" id="pKa" placeholder="pKa或pKb"/></td>
		<td><select name="AorB" id="AorB"><option value ="acid">酸</option><option value ="base">碱</option></select></td></tr>
		<tr><td colspan=2><select name="acidName" id="acidName"><option value="HA">HA</option></select></td></tr>
		<tr><td><input type="text" name="c" id="c" placeholder="分析浓度"/></td><td><input type="submit" value="计算"></td></tr></table></form>
		<tr><div class="output" id="output"><img src="\ico\loading.gif">加载中，请稍后……</div></tr>
<?php include 'foot.php';?>
    </section>
  </body>
</html>
<?php
}