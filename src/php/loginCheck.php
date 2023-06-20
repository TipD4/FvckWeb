<?php
    /**
     * 登录验证
     * author：qhm
     * date：2023-4-10
     * version：2.0
     */
    
    include('conn.php');
    $userName=$_GET["name"];
    $userPwd=$_GET["pwd"];


    $str="select * from users where user_name='$userName' and user_pwd='$userPwd'";
    // echo $str;
    $rs=mysqli_query($conn,$str);
    if(mysqli_num_rows($rs)>0)
        echo 1;
    else
        echo 0;
?>