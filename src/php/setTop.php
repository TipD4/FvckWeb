<?php
$code=0;
$data=[];
$msg=["置顶失败","置顶成功"];
//1.获取前端数据 panel_id
$id=$_GET["panel_id"];

//3.连接数据库
include("conn.php");
include("functions.php");
//4.操作数据库
$sql="update panels set panel_is_top= case  when panel_id=? then 1 when panel_id !=? then 0 end;";

$stmt=mysqli_prepare($conn,$sql);
mysqli_stmt_bind_param($stmt,"ii",$id,$id);
mysqli_stmt_execute($stmt);

if(mysqli_stmt_affected_rows($stmt)>0) $code=1;
mysqli_stmt_close($stmt);

//5.json输出
echo getApiResult($code,$data,$msg);
?>