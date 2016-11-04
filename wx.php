<?php
/**
  * wechat php test
  */

//define your token
//require 'leancloud/src/autoload.php';
require 'element_xml.php';
//use \LeanCloud\Client;
//use \LeanCloud\Object;
//use \LeanCloud\Query;
//Client::initialize("wUzGKF5dp34OqCeaI0VwVG8E-gzGzoHsz", "QiyXtJjBHFJCIVYQRbrKFiB7", "cnW0tSpfljie0GIfqT19iBD5");

define("TOKEN", "zengjinzhe");
$wechatObj = new wechatCallbackapiTest();
//$wechatObj->valid();
$wechatObj->responseMsg();

class wechatCallbackapiTest
{
	public function valid()
    {
        $echoStr = $_GET["echostr"];

        //valid signature , option
        if($this->checkSignature()){
        	echo $echoStr;
        	exit;
        }
    }

    public function responseMsg()
    {
		//get post data, May be due to the different environments
		$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];

      	//extract post data
		if (!empty($postStr)){
                /* libxml_disable_entity_loader is to prevent XML eXternal Entity Injection,
                   the best way is to check the validity of xml by yourself */
                libxml_disable_entity_loader(true);
              	$postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
                $fromUsername = $postObj->FromUserName;
                $toUsername = $postObj->ToUserName;
                $keyword = trim($postObj->Content);
                $time = time();
				$ev = $postObj->Event;
                $textTpl = "<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[%s]]></MsgType>
							<Content><![CDATA[%s]]></Content>
							</xml>";             
				if ($ev == "subscribe"){
					$msgType = "text";
					$contentStr = "欢迎使用化学e+，您可以输入元素名称/符号/原子序数/IUPAC名查询元素，也可以输入化学式计算分子量。\n<a href='http://chem.njzjz.win/'>点击此处下载化学e+</a>";
					$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
					echo $resultStr;
				}
				if(!empty( $keyword ))
                {
					$input=$keyword;
					/*
					$nameQuery = new Query("Element");
					$nameQuery->equalTo("ElementName", $input);
					$AbbrQuery = new Query("Element");
					$AbbrQuery->equalTo("ElementAbbr", ucfirst($input));
					$NumberQuery= new Query("Element");
					$NumberQuery->equalTo("ElementNumber", (int)$input);
					$IUPACQuery= new Query("Element");
					$IUPACQuery->equalTo("ElementIUPACname", ucfirst($input));
					$query = Query::orQuery($nameQuery, $AbbrQuery,$NumberQuery,$IUPACQuery);
					if($query->count()>0){
						$todo = $query->first();
						$name=$todo->get("ElementName");
						$Abbr=$todo->get("ElementAbbr");
						$IUPACname = $todo->get("ElementIUPACname");
						$ElementNumber=$todo->get("ElementNumber");
						$ElementMass=$todo->get("ElementMass");
						$ElementOrigin=$todo->get("ElementOrigin");
						*/
					global $elementNameArray,$elementAbbrArray,$elementIUPACArray,$elementMassArray,$elementOriginArray;
					$elementnumber=searchelement($input);
					$name = $elementNameArray[$elementnumber-1];
					$Abbr= $elementAbbrArray[$elementnumber-1];
					$IUPACname = $elementIUPACArray[$elementnumber-1];
					$ElementNumber=$elementnumber;
					$ElementMass=$elementMassArray[$elementnumber-1];
					$ElementOrigin=$elementOriginArray[$elementnumber-1];
					if($elementnumber>0){
						$output="元素名称：".$name."\n元素符号：".$Abbr."\nIUPAC名：".$IUPACname."\n原子序数：".$ElementNumber.
						"\n相对原子质量：".$ElementMass."\n元素名称含义：".$ElementOrigin;
						$outputHtml=$output."\n\n<a href='https://en.wikipedia.org/wiki/".$IUPACname."'>访问维基百科</a>";
						$contentStr=$outputHtml;
					}else{
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
								if ($this->calAsc($y1) == 4)
									$MulIf[$i] = 1;
								else if ($this->calAsc($y1) == 5)
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
										if ($this->calAsc($y3) == 3) {
											if ($i2 + 2 > $l)
												$y4 = "a";
											else
												$y4 = substr($x,$i2 + 1, 1);
												if ($this->calAsc($y4) == 3)
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
									if ($this->calAsc($y1) == 1) {
										if ($i >=$l)
											$y2 = "1";
										else
											$y2 = substr($x,$i, 1);
										if ($this->calAsc($y2) == 2) {
											$T = $y1.$y2;
											$n = $this->ElementChoose($T);
											if ($n > 0) {
												if ($i + 1 >=$l)
													$y3 = "1";
												else
													$y3 = substr($x,$i + 1, 1);
												if ($this->calAsc($y3) == 3) {
													if ($i + 2 >=$l)
														$y4 = "a";
													else
														$y4 = substr($x,$i + 2, 1);
													if ($this->calAsc($y4) == 3) {
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
										} else if ($this->calAsc($y2) == 3) {
											$n = $this->ElementChoose($y1);
											if ($n > 0) {
												if ($i + 1 >=$l)
													$y3 = "a";
												else
													$y3 = substr($x,$i + 1, 1);
												if ($this->calAsc($y3) == 3) {
													$AtomNumber[$n] = $AtomNumber[$n] + (int)($y2.$y3) * $MulNumber[$i];
													$i = $i + 2;
												} else {
													$AtomNumber[$n] = $AtomNumber[$n] + (int)($y2) * $MulNumber[$i];
												}
											}
										} else {
											$n = $this->ElementChoose($y1);
											if ($n > 0)
												$AtomNumber[$n] = $AtomNumber[$n] + $MulNumber[$i];
										}
									} else if ($this->calAsc($y1) == 4) {
									} else if ($this->calAsc($y1) == 5) {
										if ($i >=$l)
											$y2 = "a";
										else
											$y2 = substr($x,$i, 1);
										if ($this->calAsc($y2) == 3) {
											if ($i + 1 >=$l)
												$y2 = "a";
											else
												$y3 = substr($x,$i + 1, 1);
											if ($this->calAsc($y3) == 3) $i++;
											$i++;
										}
									}
								}
								//$NumberQuery= new Query("Element");
								for ($i = 0; $i < 118; $i++) {
									if($AtomNumber[$i + 1]>0) {
										//$NumberQuery->equalTo("ElementNumber", $i+1);
										//$NumberQuery->select('ElementMass','ElementAbbr','ElementName');
										//$todo = $NumberQuery->first();
										//$ElementMass=$todo->get("ElementMass");
										//$elementMassArray[$i]=$ElementMass;
										//$elementNameArray[$i]=$todo->get("ElementName");
										//$elementAbbrArray[$i]=$todo->get("ElementAbbr");
										$m = $m + $AtomNumber[$i + 1] * (double)($elementMassArray[$i+1]);
									}
								}
							}
						}
						if ($m > 0) {
							/*
							$xHtml="";
							for($i3=0;$i3<$l;$i3++) {
								if (ord(substr($x,$i3,1)) >= 48 && ord(substr($x,$i3,1)) <= 57) {
									$xHtml =$xHtml."<sub>".substr($x,$i3,1)."</sub>";
								} else {
									$xHtml =$xHtml.substr($x,$i3,1);
								}
							}*/
							$output=$x."\n相对分子质量=".sprintf("%.2f",$m);
							for($i=0;$i<118;$i++){
								if($AtomNumber[$i+1]>0){
									$massPer[$i+1]=$AtomNumber[$i + 1] * ($elementMassArray[$i])/$m*100;
									$output=$output."\n".$elementNameArray[$i]."（符号：".$elementAbbrArray[$i]."），".$AtomNumber[$i+1].
									"个原子，原子量为".$elementMassArray[$i]."，质量分数为".sprintf("%.2f",$massPer[$i+1])."%；";
								}
							}
							$output=rtrim($output,"；")."。";
							$contentStr=$output;
						} else {
							$contentStr= "输入有误！";
						};
					}
              		$msgType = "text";
                	$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
                	echo $resultStr;
                }else{
                	echo "Input something...";
                }

        }else {
        	echo "";
        	exit;
        }
    }
	
	private function calAsc($x) {
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

	private function ElementChoose($x) {
		$elementNumber = 0;
		/*
		$Query= new Query("Element");
		$Query->equalTo("ElementAbbr", $x);
		$Query->select('ElementNumber');
		if($Query->count()>0){
			$todo = $Query->first();
			$elementNumber=$todo->get("ElementNumber");
		}*/
		global $elementAbbrArray;
		for($i=0;$i<118;$i++) {
			if($x==($elementAbbrArray[$i])){
				$elementNumber=$i+1;
			}
		}
		return $elementNumber;
	}
	private function checkSignature()
	{
        // you must define TOKEN by yourself
        if (!defined("TOKEN")) {
            throw new Exception('TOKEN is not defined!');
        }
        
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];
        		
		$token = TOKEN;
		$tmpArr = array($token, $timestamp, $nonce);
        // use SORT_STRING rule
		sort($tmpArr, SORT_STRING);
		$tmpStr = implode( $tmpArr );
		$tmpStr = sha1( $tmpStr );
		
		if( $tmpStr == $signature ){
			return true;
		}else{
			return false;
		}
	}
}

?>