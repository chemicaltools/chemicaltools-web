<?php
/**
  * wechat php test
  */

//define your token
require 'leancloud/src/autoload.php';
require 'element_xml.php';
use \LeanCloud\Client;
use \LeanCloud\Object;
use \LeanCloud\Query;
Client::initialize("wUzGKF5dp34OqCeaI0VwVG8E-gzGzoHsz", "QiyXtJjBHFJCIVYQRbrKFiB7", "cnW0tSpfljie0GIfqT19iBD5");

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
					$contentStr = "欢迎使用化学e+，您可以输入元素名称/符号/原子序数/IUPAC名查询元素。\n<a href='http://chem.njzjz.win/'>点击此处下载化学e+</a>";
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
						$contentStr="输入错误！";
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