<?php
 /**
 * 生成面板
 * author：qhm
 * date：2023-4-10
 * version：2.0
 */
$code=0;
$data=[];
$msg=["获取面板数据失败","获取面板成功"];

include("conn.php");
include("functions.php");
$sql="select * from panels p left join users u on p.user_id=u.user_id order by p.panel_is_top desc,p.updated_time desc";
$rs=mysqli_query($conn,$sql);
$i=0;
$comments=[];
$id=0;
//拼装data部分的对象数据
while($row=mysqli_fetch_array($rs)){  //读取记录行
    $data[$i]["id"]=$row["panel_id"];
    $data[$i]["user"]=$row["user_name"];
    $data[$i]["likeitNums"]=$row["panel_likeit_nums"];
    $data[$i]["topPanel"]=$row["panel_is_top"];
    $data[$i]["essencePanels"]=$row["panel_is_essence"];
    $data[$i]["date"]=$row["panel_date"];
    $data[$i]["content"]=$row["panel_content"];
    $data[$i]["title"]=$row["panel_title"];
    $i++;
}

if(count($data)>0) $code=1;

echo getApiResult($code,$data,$msg);

?>