<?php
require 'load.php';
require 'element_xml.php';
use \LeanCloud\Query;
use \LeanCloud\User;
function calAsc($x) {
    $c = substr($x,0,1);
    $n = ord($c);
    if ($n > 64 & $n < 91)
        return 1;
    else if ($n > 96 & $n < 123)
        return 2;
    else if ($n > 47 & $n < 58)
        return 3;
    else if ($n == 40 | $n == 91 | $n == -23640)
        return 4;
    else if ($n == 41 | $n == 93 | $n == -23639)
        return 5;
    else
        return 0;
}
function ElementChoose($x) {
    $elementNumber = 0;
	global $elementAbbrArray;
	for($i=0;$i<118;$i++) {
		if($x==($elementAbbrArray[$i])){
			$elementNumber=$i+1;
			break;
		}
	}
    return $elementNumber;
}
if($_POST['ajax'] =="1"||$_GET['ajax']=="1"){
	if($_POST['input']!=""||$_GET['input']!=""){
		if($_POST['input']!="")$input=$_POST['input'];else $input=$_GET['input'];
		$x = $input;
		$l = strlen($x);
		$i = 0;
		$s = 0;
		$m = 0;
		$massPer=array();
		$y1 = "";
		$y2 = "";
		$y3 = "";
		$y4 = "";
		$T = "";
		$AtomNumber = array();
		$MulNumber = array();
		$MulIf = array();
		$MulLeft = array();
		$MulRight = array();
		$MulNum = array();
		if ($l > 0) {
			while ($i <$l) {
				$i++;
				$MulNumber[$i] = 1;
				$y1 = substr($x,$i - 1,1);
				if (calAsc($y1) == 4)
					$MulIf[$i] = 1;
				else if (calAsc($y1) == 5)
					$MulIf[$i] = -1;
				else
					$MulIf[$i] = 0;
				$s = $s + $MulIf[$i];
			}
			if ($s == 0) {
				$i = 1;
				$n = 0;
				while ($i < $l) {
					if ($MulIf[$i] == 1) {
						$n++;
						$c = 1;
						$i2 = $i + 1;
						$MulLeft[$n] = $i;
						while ($c > 0) {
							$c = $c + $MulIf[$i2];
							$i2++;
						}
						$i2 = $i2 - 1;
						$MulRight[$n] = $i2;
						if ($i2 + 1 > $l)
							$y3 = "a";
						else
							$y3 = substr($x,$i2, 1);
						if (calAsc($y3) == 3) {
							if ($i2 + 2 > $l)
								$y4 = "a";
							else
								$y4 = substr($x,$i2 + 1, 1);
								if (calAsc($y4) == 3)
									$MulNum[$n] = (int)($y3.$y4);
								else
									$MulNum[$n] = (int)($y3);
						} else {
							$MulNum[$n] = 1;
						}
					}
					$i++;
				}
				$i = 0;
				while ($i < $n) {
					$i++;
					for ($i2 = $MulLeft[$i]; $i2 <= $MulRight[$i]; $i2++)
						$MulNumber[$i2] = $MulNumber[$i2] * $MulNum[$i];
				}
				$i = 0;
				while ($i <$l) {
					$i++;
					$y1 = substr($x,$i - 1, 1);
					if (calAsc($y1) == 1) {
						if ($i >=$l)
							$y2 = "1";
						else
							$y2 = substr($x,$i, 1);
						if (calAsc($y2) == 2) {
							$T = $y1.$y2;
							$n = ElementChoose($T);
							if ($n > 0) {
								if ($i + 1 >=$l)
									$y3 = "1";
								else
									$y3 = substr($x,$i + 1, 1);
								if (calAsc($y3) == 3) {
									if ($i + 2 >=$l)
										$y4 = "a";
									else
										$y4 = substr($x,$i + 2, 1);
									if (calAsc($y4) == 3) {
										$AtomNumber[$n] = $AtomNumber[$n] + (int)($y3.$y4) * $MulNumber[$i];
										$i = $i + 3;
									} else {
										$AtomNumber[$n] = $AtomNumber[$n] + (int)($y3) * $MulNumber[$i];
										$i = $i + 2;
									}
								} else {
									$AtomNumber[$n] = $AtomNumber[$n] + $MulNumber[$i];
									$i++;
								}
							}
						} else if (calAsc($y2) == 3) {
							$n = ElementChoose($y1);
							if ($n > 0) {
								if ($i + 1 >=$l)
									$y3 = "a";
								else
									$y3 = substr($x,$i + 1, 1);
								if (calAsc($y3) == 3) {
									$AtomNumber[$n] = $AtomNumber[$n] + (int)($y2.$y3) * $MulNumber[$i];
									$i = $i + 2;
								} else {
									$AtomNumber[$n] = $AtomNumber[$n] + (int)($y2) * $MulNumber[$i];
								}
							}
						} else {
							$n = ElementChoose($y1);
							if ($n > 0)
								$AtomNumber[$n] = $AtomNumber[$n] + $MulNumber[$i];
						}
					} else if (calAsc($y1) == 4) {
					} else if (calAsc($y1) == 5) {
						if ($i >=$l)
							$y2 = "a";
						else
							$y2 = substr($x,$i, 1);
						if (calAsc($y2) == 3) {
							if ($i + 1 >=$l)
								$y2 = "a";
							else
								$y3 = substr($x,$i + 1, 1);
							if (calAsc($y3) == 3) $i++;
							$i++;
						}
					}
				}
				for ($i = 0; $i < 118; $i++) {
					if($AtomNumber[$i + 1]>0) {
						$m = $m + $AtomNumber[$i + 1] * (double)($elementMassArray[$i]);
					}
				}
			}
		}
		if ($m > 0) {
			$xHtml="";
			for($i3=0;$i3<$l;$i3++) {
				if (ord(substr($x,$i3,1)) >= 48 && ord(substr($x,$i3,1)) <= 57) {
					$xHtml =$xHtml."<sub>".substr($x,$i3,1)."</sub>";
				} else {
					$xHtml =$xHtml.substr($x,$i3,1);
				}
			}
			$output=$xHtml."\n相对分子质量=".sprintf("%.2f",$m);
			$outputhtml=$output;
			for($i=0;$i<118;$i++){
				if($AtomNumber[$i+1]>0){
					$massPer[$i+1]=(double)$AtomNumber[$i + 1] * ((double)$elementMassArray[$i])/(double)$m*100;
					$output=$output."\n<a href='/element.php?input=".($i+1)."'>".$elementNameArray[$i]."（符号：".$elementAbbrArray[$i]."）</a>，".$AtomNumber[$i+1].
					"个原子，原子量为".$elementMassArray[$i]."，质量分数为".sprintf("%.2f",$massPer[$i+1])."%；";
				}
			}
			$output=rtrim($output,"；")."。";
			echo "<p>".nl2br($output)."</p>";
			if ($currentUser != null) {
				$output=ereg_replace("<a [^>]*>|<\/a>","",$output);
				?>
				<script type="text/javascript">
					change("historyMassOutput", "<?=str_replace("\n","\\n",$output)?>");
					change("historyMass","<?=$input?>");
				</script>
				<?php
			}
		} else {
			echo "<p>输入有误！</p>";
		};
	}
}else{
	if($_POST['input']!=""||$_GET['input']!=""){
		if($_POST['input']!="")$input=$_POST['input'];else $input=$_GET['input'];
	}else{
		if ($currentUser != null) {
			$login=1;
		}else{
			$login=0;
		}
	}
?>
<!DOCTYPE html>
<html$lang="zh-cn">
  <head>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>质量计算 -- 化学e+</title>
<?php include 'head.php';?>
<script type="text/javascript" src="/js/mass.js"></script>
  </head>
  <body>
<?php include 'header.php';?>
    <section class="main-content">
	<? 
	include 'title.php';?>
		<h2>质量计算</h2>
		<form method='post' id="form" action='mass.php'>
		<input type="hidden" id="login" name="login" value="<?=$login;?>"  />  
		<input type="hidden" id="getinput" name="getinput" value="<?=$input;?>"  />  
		<table><tr><table><tr><td><input type="text" name="input" id="input" placeholder="请输入物质的化学式"/></td><td><input type="submit" value="计算"></td></tr></table></tr>
		<tr><p><div class="history" id="output"><img src="\ico\loading.gif">加载中，请稍后……</div></p></tr>
	</table></form>
<?php include 'foot.php';?>
    </section>
  </body>
</html>
<?php
}