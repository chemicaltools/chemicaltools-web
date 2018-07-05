<?php
/**
 * 工具类
 * */
class FsockService {
    
    public static function post($url, $param){

        $host = parse_url($url, PHP_URL_HOST);
        $port = 80;
        $errno = '';
        $errstr = '';
        $timeout = 30;

        $data = http_build_query($param);

        // create connect
        $fp = fsockopen($host, $port, $errno, $errstr, $timeout);

        if(!$fp){
            return false;
        }

        // send request
        $out = "POST ${url} HTTP/1.1\r\n";
        $out .= "Host:${host}\r\n";
        $out .= "Content-type:application/x-www-form-urlencoded\r\n";
        $out .= "Content-length:".strlen($data)."\r\n";
        $out .= "Connection:close\r\n\r\n";
        $out .= "${data}";

        fwrite($fp, $out);

        //忽略执行结果；否则等待返回结果
//        if(APP_DEBUG === true){
        if(false){
            $ret = '';
            while (!feof($fp)) {
                $ret .= fgets($fp, 128);
            }
        }

        usleep(20000); //fwrite之后马上执行fclose，nginx会直接返回499

        fclose($fp);
    }

    public static function get($url, $param){
        $host = parse_url($url, PHP_URL_HOST);
        $port = 80;
        $errno = '';
        $errstr = '';
        $timeout = 30;

        $url = $url.'?'.http_build_query($param);

        // create connect
        $fp = fsockopen($host, $port, $errno, $errstr, $timeout);

        if(!$fp){
            return false;
        }

        // send request
        $out = "GET ${url} HTTP/1.1\r\n";
        $out .= "Host:${host}\r\n";
        $out .= "Connection:close\r\n\r\n";

        fwrite($fp, $out);

        //忽略执行结果；否则等待返回结果
//        if(APP_DEBUG === true){
        if(false){
            $ret = '';
            while (!feof($fp)) {
                $ret .= fgets($fp, 128);
            }
        }

        usleep(20000); //fwrite之后马上执行fclose，nginx会直接返回499

        fclose($fp);
    }
   
}