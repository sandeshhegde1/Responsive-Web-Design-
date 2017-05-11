 <?php

//enable CORS
header("Access-Control-Allow-Origin: *");

header('Content-Type: application/json');

  $TOKEN="EAACXwtZC6CnEBAOiKH1O9ghqA1wfvZBibkr9VTISwcGpak5adGM9HSUMIngdqnZAfPWxCLXKid18X1ZC8pov78CZATTcNkQYe2GVH9JB0wWY2uS3Tucy2ZAAXZAj7PAjYKxWU8gkcJSefYtDPxU5i77YNQIdfZAN7H0ZD";

 
//remove unneccasry later onwards
$URL=$TYPE=$KEYWORD=$PASSED_ID="";


if(isset($_GET["submit"]) ){ 
    
    $TYPE=$_GET["select"];
    $KEYWORD=$_GET["input_keyword"];
    //replace the spaces by + in input obtained from user
    $KEYWORD=preg_replace('/\s+/', '+', $KEYWORD);
    
    
    
     //User
    if($TYPE=="user"){
        
        $URL='https://graph.facebook.com/v2.8/search?q='.$KEYWORD.'&type='.$TYPE.'&fields=id,name,picture.width(700).height(700)&access_token='.$TOKEN;        
       
        
        $USER_JSON = file_get_contents($URL);       
        echo $USER_JSON;
        
        
        
    }
    
    //page
    
    if($TYPE=="page"){
         
        $URL='https://graph.facebook.com/v2.8/search?q='.$KEYWORD.'&type='.$TYPE.'&fields=id,name,picture.width(700).height(700)&access_token='.$TOKEN;
        
        $PAGE_JSON = file_get_contents($URL);      
        echo $PAGE_JSON;
        
    }
    
    
    //events
    if($TYPE=="event"){
         
       $URL='https://graph.facebook.com/v2.8/search?q='.$KEYWORD.'&type='.$TYPE.'&fields=id,name,picture.width(700).height(700),place&access_token='.$TOKEN;
        
       $EVENT_JSON = file_get_contents($URL);      
       echo $EVENT_JSON;
    
    }
    
     //place
    if($TYPE=="place"){     
            
        $LOCATION=$_GET['input_location'];
        
        if($LOCATION==''){
            $URL='https://graph.facebook.com/v2.8/search?q='.$KEYWORD.'&type='.$TYPE.'&fields=id,name,picture.width(700).height(700)&access_token='.$TOKEN;
            
            
        }else{
            
            $URL='https://graph.facebook.com/v2.8/search?q='.$KEYWORD.'&type='.$TYPE.'&center='.$LOCATION.'&fields=id,name,picture.width(700).height(700)&access_token='.$TOKEN;
        }
    
    
        $PLACE_JSON = file_get_contents($URL);
        echo $PLACE_JSON;
    }
    
     //group
    if($TYPE=="group"){
        
         $URL='https://graph.facebook.com/v2.8/search?q='.$KEYWORD.'&type='.$TYPE.'&fields=id,name,picture.width(700).height(700)&access_token='.$TOKEN;
        
         $GROUP_JSON = file_get_contents($URL);
         echo $GROUP_JSON;
        
    }
    
    
     if($TYPE=="details"){
     
        
        $PASSED_ID=$_GET['id'];
        
        
         $URL="https://graph.facebook.com/v2.8/".$PASSED_ID."?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name,images}},posts.limit(5)&access_token=".$TOKEN;
        
         $DETAILS_JSON = file_get_contents($URL);
     
         echo $DETAILS_JSON;
         
     }
    
    
}
    
?>  
        
        
   