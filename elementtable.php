<?php
require 'element_xml.php';
echo "<table style='text-align:center;'>";
for($i=0;$i<=9;$i++){
	echo"<tr>";
	for($j=0;$j<=18;$j++){
		if(($i==1&&$j>=2&&$j<=17)||(($i==2||$i==3)&&$j>=3&&$j<=12)||(($i==8||$i==9)&&$j>15)){
			if($i==1&&$j==2){
				echo "<td colspan=16></td>";
			}else if(($i==2||$i==3)&&$j==3){
				echo "<td colspan=10></td>";
			}
		}else{
			echo("<td style='border:1px solid;border-collapse:collapse'>");
			if($i==0&&$j>0){
				echo $j;
			}else if($i>0&&$j==0){
				if($i<8){
					echo $i;
				}else if($i==8){
					echo "镧系";
				}else if($i==9){
					echo "锕系";
				}
			}else if($i>0){
				$n++;
				if($i==6&&$j==4){
					$n=72;
				}else if($i==7&&$j==4){
					$n=104;
				}else if($i==8&&$j==1){
					$n=57;
				}else if($i==9&&$j==1){
					$n=89;
				}
				$elementnumber=$n;
				$name = $elementNameArray[$elementnumber-1];
				$Abbr= $elementAbbrArray[$elementnumber-1];
				//$IUPACname = $elementIUPACArray[$elementnumber-1];
				$ElementMass=$elementMassArray[$elementnumber-1];
				echo "<a href='/element.php?input=".$n."'><sub>".$n."</sub>".$Abbr."<br>".$name."<br><small>".$ElementMass."</small>"; 
			}
			echo("</td>");
		}
	}
	echo"</tr>";
}
echo "</table>";