<?php
 /**
 * 公共函数
 * author：qhm
 * date：2023-4-10
 * version：2.0
 */
function getApiResult($code,$data,$msg){
    //拼装成数组
    $output[0]["code"]=$code;
    $output[0]["data"]=$data;
    $output[0]["msg"]=$msg[$code];
    return json_encode($output,JSON_UNESCAPED_UNICODE);

}

?>