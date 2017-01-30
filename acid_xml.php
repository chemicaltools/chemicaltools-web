<?php
$xmlstring = <<<XML
<?xml version="1.0" encoding="utf-8"?>
<string-array>
    <acidnameArray>
        <item>H3AsO4</item>
        <item>H3AsO3</item>
        <item>H3BO3</item>
        <item>H2CO3</item>
        <item>H2CrO4</item>
        <item>HCN</item>
        <item>HF</item>
        <item>H2S</item>
        <item>H3PO4</item>
        <item>H2SiO3</item>
        <item>H2SO4</item>
        <item>H2SO3</item>
        <item>HAc</item>
        <item>H2C2O4</item>
    </acidnameArray>
    <acidpKaArray>
        <item>2.19 6.94 11.50</item>
        <item>9.22</item>
        <item>9.24</item>
        <item>6.38 10.25</item>
        <item>0.74 6.50</item>
        <item>9.31</item>
        <item>3.17</item>
        <item>7.05 12.92</item>
        <item>2.16 7.21 12.32</item>
        <item>9.77 11.80</item>
        <item>-3.00 1.92</item>
        <item>1.89 7.20</item>
        <item>4.76</item>
        <item>1.25 4.29</item>
    </acidpKaArray>
    <acidAbbrArray>
        <item>AsO4</item>
        <item>AsO3</item>
        <item>H2BO3</item>
        <item>CO3</item>
        <item>CrO4</item>
        <item>CN</item>
        <item>F</item>
        <item>S</item>
        <item>PO4</item>
        <item>SiO3</item>
        <item>SO4</item>
        <item>SO3</item>
        <item>Ac</item>
        <item>C2O4</item>
    </acidAbbrArray>
    <basenameArray>
        <item>NH3</item>
        <item>NH2OH</item>
    </basenameArray>
    <basepKbArray>
        <item>4.75</item>
        <item>8.04</item>
    </basepKbArray>
    <baseAbbrArray>
        <item>NH4</item>
        <item>NH2</item>
    </baseAbbrArray>
</string-array>
XML;
$xml=simplexml_load_string($xmlstring);
$acidnameArray=$xml->acidnameArray->item; 
$acidpKaArray=$xml->acidpKaArray->item;
$acidAbbrArray=$xml->acidAbbrArray->item;
$basenameArray=$xml->basenameArray->item; 
$basepKbArray=$xml->basepKbArray->item; 
$baseAbbrArray=$xml->baseAbbrArray->item;
if($_POST['bigname']!=""||$_GET['bigname']!=""){
	if($_POST['bigname']!="")$bigid=$_POST['bigname'];else $bigid=$_GET['bigname'];
	if($_POST['acidName']!=""||$_GET['acidName']!=""){
		if($_POST['acidName']!="")$acidName=$_POST['acidName'];else $acidName=$_GET['acidName'];
		if($bigname="acid"){
			for($i=0;$i<count($acidnameArray);$i++) {
				if ($acidName==(string)$acidnameArray[$i]){
					$pKa= (string)$acidpKaArray[$i];
					$select[] = array("pKa"=>$pKa); 
					break;
				}
			}
		}else{
			for($i=0;$i<count($basenameArray);$i++) {
				if ($acidName==(string)$basenameArray[$i]){
					$pKa= (string)$basepKaArray[$i];
					$select[] = array("pKa"=>$pKa); 
					break;
				}
			}
		}
		if(count($select)==0)$select[]= array("pKa"=>"");
		echo json_encode($select);
	}else{
		if($bigid=="acid"){ 
			$arr=$acidnameArray;
		}else if($bigid=="base"){
			$arr=$basenameArray;
		}
		for($i=0;$i<count($arr);$i++){
			$name= (string)$arr[$i];
			$select[] = array("name"=>$name); 
		}
		echo json_encode($select);
	}
}