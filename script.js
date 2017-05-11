    var bodyDiv = angular.module("myBody", ['ngSanitize','ngAnimate','ui.bootstrap']);
    bodyDiv.controller('myBodyCtrl', function($scope,$http) {
    
         //show all  next tabs 
             $scope.userNextBtn=true;
             $scope.pageNextBtn=true;
             $scope.eventNextBtn=true;
             $scope.groupNextBtn=true;
             $scope.placeNextBtn=true;
            
            //hide all previous buttons
            $scope.userPreBtn=false;
             $scope.pagePreBtn=false;
             $scope.eventPreBtn=false;
             $scope.groupPreBtn=false;
             $scope.placePreBtn=false;
        
        $scope.oneAtATime = true;
        
        //call submit function
        $scope.myFunctionSubmit = function() {
             
            
            if($scope.input_keyword==null || $scope.input_keyword==''){
                
                $("[data-toggle='tooltip']").tooltip('show');
                
            }else{
            
                 $("[data-toggle='tooltip']").tooltip('destroy');
            
            //show all the tables
            
            $scope.userTabShow=true;
            $scope.pageTabShow=true;
            $scope.placeTabShow=true;
            $scope.eventTabShow=true;
            $scope.groupTabShow=true;
             $scope.favTabShow=true;
            
            //hide all details section 
            $scope.userDetailsShow=false;
            $scope.pageDetailsShow=false;
            $scope.placeDetailsShow=false;
            $scope.eventDetailsShow=false;
            $scope.groupDetailsShow=false;
            $scope.favDetailsShow=false;
            
            $scope.hideProgressBar=false;
            var placeURL;
            if(lat==null){
                
                placeURL="http://sandeshwebtech-env.us-west-2.elasticbeanstalk.com/index.php?input_keyword="+$scope.input_keyword+"&select=place&input_location=&submit=TRUE";
                
            }else{
                placeURL="http://sandeshwebtech-env.us-west-2.elasticbeanstalk.com/index.php?input_keyword="+$scope.input_keyword+"&select=place&input_location="+lat+","+long+"&submit=TRUE";
                
                }
           
            
            
             $http({
                method : "GET",
                url : "http://sandeshwebtech-env.us-west-2.elasticbeanstalk.com/index.php?input_keyword="+$scope.input_keyword+"&select=user&input_location=&submit=TRUE"
                }).then(function mySucces(response) {
                    
                   
                 
                    $scope.jsonUser = response.data;
                 
                    if($scope.jsonUser.paging.next===undefined){
                         $scope.userNextBtn=false;
                    }
                 
                  
                    
                }, function myError(response) {
                     
                    $scope.jsonUser = response.statusText;
            });  
            
            
            
           
             $http({
                method : "GET",
                url : placeURL
                }).then(function mySucces(response) {
                    
                   
                    $scope.jsonPlace = response.data;
                 
                    if($scope.jsonPlace.paging.next===undefined){
                         $scope.placeNextBtn=false;
                    }
                 
                     
                    
                }, function myError(response) {
                     
                    $scope.jsonPlace = response.statusText;
            });  
            
            
             $http({
                method : "GET",
                url : "http://sandeshwebtech-env.us-west-2.elasticbeanstalk.com/index.php?input_keyword="+$scope.input_keyword+"&select=page&input_location=&submit=TRUE"
                }).then(function mySucces(response) {
                    
                    
                    $scope.jsonPage = response.data;
                 
                    if($scope.jsonPage.paging.next===undefined){
                         $scope.pageNextBtn=false;
                    }
                    
                    
                }, function myError(response) {
                     
                    $scope.jsonPage = response.statusText;
            });  
            
             $http({
                method : "GET",
                url : "http://sandeshwebtech-env.us-west-2.elasticbeanstalk.com/index.php?input_keyword="+$scope.input_keyword+"&select=event&input_location=&submit=TRUE"
                }).then(function mySucces(response) {
                    
                    $scope.jsonEvent = response.data;
                 
                    if($scope.jsonEvent.paging.next===undefined){
                         $scope.eventNextBtn=false;
                    }
                 
                     
                    
                }, function myError(response) {
                     
                    $scope.jsonEvent = response.statusText;
            });  
            
            
             $http({
                method : "GET",
                url : "http://sandeshwebtech-env.us-west-2.elasticbeanstalk.com/index.php?input_keyword="+$scope.input_keyword+"&select=group&input_location=&submit=TRUE"
                }).then(function mySucces(response) {
                    
                    $scope.jsonGroup = response.data;
                 
                    if($scope.jsonGroup.paging.next===undefined){
                         $scope.groupNextBtn=false;
                    }
                 
                      $scope.hideProgressBar=true; 
                    
                }, function myError(response) {
                     
                    $scope.jsonGroup = response.statusText;
            });  
            
          
            
            }
    
        }
        
            
        //post to FB
        
        $scope.myFunctionPostFB=function(name,picture){
            
            
           FB.ui({
               app_id:'166863237155441',
               method: 'feed',
               link: window.location.href,
               picture: picture,
               name:name,
               caption:'FB SEARCH FROM USC CSCI571',
           }, function(response){
               if (response && !response.error_message){
                   alert("Posted Succesfully");
               }                  
                else{
                    alert("Not Posted");
               }
                       
            }); 
        
        }
        
        
         //call clear function
        $scope.myFunctionClear = function() {
            
            
            $scope.input_keyword=null;            
             
            
            //hide all tables
            $scope.userTabShow=false;
            $scope.pageTabShow=false;
            $scope.placeTabShow=false;
            $scope.eventTabShow=false;
            $scope.groupTabShow=false;
            $scope.favTabShow=false;
            
            //hide all details section 
            $scope.userDetailsShow=false;
            $scope.pageDetailsShow=false;
            $scope.placeDetailsShow=false;
            $scope.eventDetailsShow=false;
            $scope.groupDetailsShow=false;
            $scope.favDetailsShow=false;
            
            //clear all data
            $scope.jsonUser=null;
            $scope.jsonPlace=null;
            $scope.jsonPage=null;
            $scope.jsonEvent=null;
            $scope.jsonGroup=null;
            
            $scope.jsonUserDetails=null;
            $scope.jsonPlaceDetails=null;
            $scope.jsonPageDetails=null;
            $scope.jsonEventDetails=null;
            $scope.jsonGroupDetails=null;
            $scope.jsonFavDetails=null;
            
            
            
        }
        
        //call Fav function when star is clicked
        $scope.myFunctionFav = function(jsonData,type) {
            
           
            
            
            var id=jsonData.id;
            
            if(localStorage.getItem(id)!=null){
               
                localStorage.removeItem(id);
                
            }else{
                
                var storeObj={id:id,name:jsonData.name,picture:jsonData.picture.data.url,type:type};              
               
            
                var jsonString=JSON.stringify(storeObj);
            
                localStorage.setItem(id,jsonString);
            
            }
            
            
            $scope.myFunctionGetFav();
            
        }
        
        // check if ID is present in localStorage
        $scope.isIdPresent= function(id){
            return localStorage.getItem(id)==null?false:true;
        }
        
        
         //delete fav
        $scope.myFunctionDeleteFav= function(id){
             
            localStorage.removeItem(id);
            
             $scope.myFunctionGetFav();
                
        }
        
        // get all favourite tables.
        $scope.myFunctionGetFav=function(){

            var arrayObj=new Array();
            var obj;
            
            for(var i=0, len=localStorage.length; i<len; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);  
                obj=JSON.parse(value);                
                arrayObj.push(obj);
                               
                }
            
            if(arrayObj[0]!=null){
            var jsonFavJS=arrayObj;            
            $scope.jsonFav=jsonFavJS;
                
            }else{                    
                    $scope.jsonFav=null;
                }
        }
        
        //call details function       
        
        $scope.myFunctionDetails = function(id,type) {
            
           
            
             //hide tab and show details
            
            if(type=="user"){
                        $scope.userTabShow=false;
                        $scope.userDetailsShow=true;
                 
                        $scope.hideUserDetailsProgressBar=false;
                
            }
            if(type=="page"){
                        
                        $scope.pageTabShow=false;
                        $scope.pageDetailsShow=true;
                
                        $scope.hidePageDetailsProgressBar=false;
            }
            if(type=="event"){
                        $scope.eventTabShow=false;
                        $scope.eventDetailsShow=true;
                        $scope.hideEventDetailsProgressBar=false;
            }
            if(type=="place"){
                        $scope.placeTabShow=false;
                        $scope.placeDetailsShow=true;
                        $scope.hidePlaceDetailsProgressBar=false;
            }
            if(type=="group"){
                        $scope.groupTabShow=false;
                        $scope.groupDetailsShow=true;
                        $scope.hideGroupDetailsProgressBar=false;
            }
            
            if(type=="fav"){
                        $scope.favTabShow=false;
                        $scope.favDetailsShow=true;
                        $scope.hideFavDetailsProgressBar=false;
            }
            
            
             $http({
                method : "GET",
                 url:"http://sandeshwebtech-env.us-west-2.elasticbeanstalk.com/index.php?id="+id+"&select=details&submit=TRUE"
                
                }).then(function mySucces(response) {                    
                 
                 
                    if(type=="user"){
                        $scope.jsonUserDetails = response.data;
                        
                        if($scope.jsonUserDetails.albums===undefined || $scope.jsonUserDetails.albums.data===undefined || $scope.jsonUserDetails===undefined){                            
                            
                            $scope.noUserAlbumShow=true;
                            $scope.userAlbumShow=false;
                            
                        }else{                            
                            $scope.userAlbumShow=true;
                            $scope.noUserAlbumShow=false;
                            
                        }
                        
                        if($scope.jsonUserDetails.posts===undefined || $scope.jsonUserDetails.posts.data===undefined || $scope.jsonUserDetails===undefined){                            
                            
                            $scope.noUserPostShow=true;
                             $scope.userPostShow=false;
                            
                        }else{                            
                            $scope.userPostShow=true;
                             $scope.noUserPostShow=false;
                            
                        }                      
                                                
                        $scope.hideUserDetailsProgressBar=true;
                        
                    }else if(type=="page"){
                        $scope.jsonPageDetails = response.data;  
                        //hide tab and show details
                        
                         if($scope.jsonPageDetails.albums===undefined || $scope.jsonPageDetails.albums.data===undefined || $scope.jsonPageDetails===undefined){
                            
                            
                            $scope.noPageAlbumShow=true;
                            $scope.pageAlbumShow=false;
                            
                        }else{
                            
                            $scope.pageAlbumShow=true;
                            $scope.noPageAlbumShow=false;
                            
                        }
                        
                         if($scope.jsonPageDetails.posts===undefined || $scope.jsonPageDetails.posts.data===undefined || $scope.jsonPageDetails===undefined){
                            
                            
                            $scope.noPagePostShow=true;
                             $scope.pagePostShow=false;
                            
                        }else{
                            
                            $scope.pagePostShow=true;
                             $scope.noPagePostShow=false;
                            
                        }
                        
                         $scope.hidePageDetailsProgressBar=true;
                        
                    }else if(type=="event"){
                        $scope.jsonEventDetails =response.data;
                        
                        
                          if($scope.jsonEventDetails.albums===undefined || $scope.jsonEventDetails.albums.data===undefined || $scope.jsonEventDetails===undefined){
                            
                            
                            $scope.noEventAlbumShow=true;
                            $scope.eventAlbumShow=false;
                            
                        }else{
                            
                            $scope.eventAlbumShow=true;
                            $scope.noEventAlbumShow=false;
                            
                        }
                        
                        if($scope.jsonEventDetails.posts===undefined || $scope.jsonEventDetails.posts.data===undefined || $scope.jsonEventDetails===undefined){
                            
                            
                            $scope.noEventPostShow=true;
                             $scope.eventPostShow=false;
                            
                        }else{
                            
                            $scope.eventPostShow=true;
                             $scope.noEventPostShow=false;
                            
                        }
                        
                         $scope.hideEventDetailsProgressBar=true;
                        
                       
                    }else if(type=="place"){
                        $scope.jsonPlaceDetails = response.data;
                        
                          if($scope.jsonPlaceDetails.albums===undefined || $scope.jsonPlaceDetails.albums.data===undefined || $scope.jsonPlaceDetails===undefined){
                            
                            
                            $scope.noPlaceAlbumShow=true;
                            $scope.placeAlbumShow=false;
                            
                        }else{
                            
                            $scope.placeAlbumShow=true;
                            $scope.noPlaceAlbumShow=false;
                            
                        }
                        
                        if($scope.jsonPlaceDetails.posts===undefined || $scope.jsonPlaceDetails.posts.data===undefined || $scope.jsonPlaceDetails===undefined){
                            
                            
                            $scope.noPlacePostShow=true;
                             $scope.placePostShow=false;
                            
                        }else{
                            
                            $scope.placePostShow=true;
                             $scope.noPlacePostShow=false;
                            
                        }
                        
                         $scope.hidePlaceDetailsProgressBar=true;
                        
                        
                    }else if(type=="group"){
                        $scope.jsonGroupDetails = response.data;
                        
                          if($scope.jsonGroupDetails.albums===undefined || $scope.jsonGroupDetails.albums.data===undefined || $scope.jsonGroupDetails===undefined){
                            
                            
                            $scope.noGroupAlbumShow=true;
                            $scope.groupAlbumShow=false;
                            
                        }else{
                            
                            $scope.groupAlbumShow=true;
                            $scope.noGroupAlbumShow=false;
                            
                        }
                        
                         if($scope.jsonGroupDetails.posts===undefined || $scope.jsonGroupDetails.posts.data===undefined || $scope.jsonGroupDetails===undefined){
                            
                            
                            $scope.noGroupPostShow=true;
                             $scope.groupPostShow=false;
                            
                        }else{
                            
                            $scope.groupPostShow=true;
                             $scope.noGroupPostShow=false;
                            
                        }
                        
                               $scope.hideGroupDetailsProgressBar=true;             
                       
                    }
                    else if(type=="fav"){
                        $scope.jsonFavDetails = response.data;
                        
                          if($scope.jsonFavDetails.albums===undefined || $scope.jsonFavDetails.albums.data===undefined || $scope.jsonFavDetails===undefined){
                            
                            
                            $scope.noFavAlbumShow=true;
                            $scope.favAlbumShow=false;
                            
                        }else{
                            
                            $scope.favAlbumShow=true;
                            $scope.noFavAlbumShow=false;
                            
                        }
                        
                         if($scope.jsonFavDetails.posts===undefined || $scope.jsonFavDetails.posts.data===undefined || $scope.jsonFavDetails===undefined){
                            
                            
                            $scope.noFavPostShow=true;
                             $scope.favPostShow=false;
                            
                        }else{
                            
                            $scope.favPostShow=true;
                             $scope.noFavPostShow=false;
                            
                        }
                        
                               $scope.hideFavDetailsProgressBar=true;             
                       
                    }
                    
                }, function myError(response) {
                     if(type=="user"){
                    $scope.jsonUserDetails = response.statusText;
                    }else if(type=="page"){
                      $scope.jsonPageDetails = response.statusText;
                    }else if(type=="event"){
                      $scope.jsonEventDetails = response.statusText;
                    }else if(type=="place"){
                        $scope.jsonPlaceDetails = response.statusText;
                    }else if(type=="group"){
                      $scope.jsonGroupDetails =response.statusText;
                    }else if(type=="fav"){
                      $scope.jsonFavDetails =response.statusText;
                    }
                    
            });  
            
        }
        
        
        //when back button is pressed
        $scope. myFunctionBack = function(type) {
            
                if(type=="user"){                       
                        //show tab and hide details
                        $scope.userTabShow=true;
                        $scope.userDetailsShow=false;                        
                    }else if(type=="page"){
                       
                        //show tab and hide details
                        $scope.pageTabShow=true;
                        $scope.pageDetailsShow=false;
                        
                    }else if(type=="event"){
                        //show tab and hide details
                        $scope.eventTabShow=true;
                        $scope.eventDetailsShow=false;
                    }else if(type=="place"){
                        //show tab and hide details
                        $scope.placeTabShow=true;
                        $scope.placeDetailsShow=false;
                    }else if(type=="group"){
                        //show tab and hide details
                        $scope.groupTabShow=true;
                        $scope.groupDetailsShow=false;
                    } else if(type=="fav"){
                        //show tab and hide details
                        $scope.favTabShow=true;
                        $scope.favDetailsShow=false;
                    }           
            
        }
        
        
        //Pagination function
         $scope.myFunctionPagination = function(type,urlValue) {
             
             if(type=="user"){
                 
                $http({
                method : "GET",
                url : urlValue
                }).then(function mySucces(response) {
                    
                    $scope.jsonUser = response.data;
                 
                    if($scope.jsonUser.paging.next===undefined){
                         $scope.userNextBtn=false;
                    }else{
                         $scope.userNextBtn=true;
                    }                      
                    if($scope.jsonUser.paging.previous===undefined){
                         $scope.userPreBtn=false;
                    }else{
                         $scope.userPreBtn=true;
                    }
                    
                }, function myError(response) {                     
                    $scope.jsonUser = response.statusText;
                });    
             }
             
             if(type=="place"){
                 
                $http({
                method : "GET",
                url : urlValue
                }).then(function mySucces(response) {
                    
                    $scope.jsonPlace = response.data;
                 
                    if($scope.jsonPlace.paging.next===undefined){
                         $scope.placeNextBtn=false;
                    }else{
                         $scope.placeNextBtn=true;
                    }                      
                    if($scope.jsonPlace.paging.previous===undefined){
                         $scope.placePreBtn=false;
                    }else{
                         $scope.placePreBtn=true;
                    }
                    
                }, function myError(response) {                     
                    $scope.jsonPlace = response.statusText;
                });    
             }
             
             if(type=="event"){
                 
                $http({
                method : "GET",
                url : urlValue
                }).then(function mySucces(response) {
                    
                    $scope.jsonEvent = response.data;
                 
                    if($scope.jsonEvent.paging.next===undefined){
                         $scope.eventNextBtn=false;
                    }else{
                         $scope.eventNextBtn=true;
                    }                      
                    if($scope.jsonEvent.paging.previous===undefined){
                         $scope.eventPreBtn=false;
                    }else{
                         $scope.eventPreBtn=true;
                    }
                    
                }, function myError(response) {                     
                    $scope.jsonEvent = response.statusText;
                });    
             }
             
             if(type=="page"){
                 
                $http({
                method : "GET",
                url : urlValue
                }).then(function mySucces(response) {
                    
                    $scope.jsonPage = response.data;
                 
                    if($scope.jsonPage.paging.next===undefined){
                         $scope.pageNextBtn=false;
                    }else{
                         $scope.pageNextBtn=true;
                    }                      
                    if($scope.jsonPage.paging.previous===undefined){
                         $scope.pagePreBtn=false;
                    }else{
                         $scope.pagePreBtn=true;
                    }
                    
                }, function myError(response) {                     
                    $scope.jsonPage = response.statusText;
                });    
             }
             
             if(type=="group"){
                 
                $http({
                method : "GET",
                url : urlValue
                }).then(function mySucces(response) {
                    
                    $scope.jsonGroup = response.data;
                 
                    if($scope.jsonGroup.paging.next===undefined){
                         $scope.groupNextBtn=false;
                    }else{
                         $scope.groupNextBtn=true;
                    }                      
                    if($scope.jsonGroup.paging.previous===undefined){
                         $scope.groupPreBtn=false;
                    }else{
                         $scope.groupPreBtn=true;
                    }
                    
                }, function myError(response) {                     
                    $scope.jsonGroup = response.statusText;
                });    
             }
            
        }
       
        
        $scope.myFunctionGetFav();
   
    });    
    
  


   