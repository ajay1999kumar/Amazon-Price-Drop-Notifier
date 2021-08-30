//console.log("content file is running");

var username;
var email;
var password;
var url

var NewUser={
   username,
   email,
   password

}

var user={
 email,
 password
}

////////////////////////////////////////////////////////////////////==============Controller============//////////////////////////////////////////////////////////////////////////
let amazone = angular.module("amazonextension", ['ui.router']);
amazone.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '../html/home.html',
          controller: 'MainController'
        })
        .state('userproducts', {
          url: '/userproducts',
          templateUrl: '../html/userproduct.html',
          controller: 'MainController'
        })
        .state('login', {
          url: '/login',
          templateUrl: '../html/login.html',
          controller: 'LoginController'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: '../html/signUp.html',
          controller: 'SignupController'
        });
    
      $urlRouterProvider.otherwise('/login');
    }]);

    
 
amazone.controller('MainController',['$scope','$state',function($scope,$state){   
/////////////////////////////////////////////////////////////////===================Trackprice Controller========================///////////////////////////////////////////////////
   $scope.TrackPrice = ()=>{
     chrome.runtime.sendMessage( {type:"Scrap"},
     (res)=>{
       console.log("Checking price drop response: ", res);
       if(res.error){
         let em = res.error;
         console.log('Error is :',em);
       }
     });
   }
////////////////////////////////////////////////////////////////===================Logout Controller=========================///////////////////////////////////////////////////////
   $scope.logout = ()=>{
     console.log('ran $scope.islogedin function'); 
     chrome.runtime.sendMessage({type:"logout_user"},(res)=>{
       let response=JSON.parse(res);
        console.log("responeeeeeeeeeeee:" + response);
          if(response== null){
            $state.go("login");
          }
      });  
   }
}])
  
////////////////////////////////////////////////////////////////===================Signup Controller=========================///////////////////////////////////////////////////////
amazone.controller('SignupController',['$scope','$state',function($scope,$state){
   $scope.NewUserData=function(name,pass,email){
   NewUser.username=name,
   NewUser.email=email,
   NewUser.password=pass   
   //console.log(NewUser);
   chrome.runtime.sendMessage({NewUser:NewUser},function(response){
          console.log(response);
          if(response.token!=null)
          {
            $state.go("login");
          }
     })

   };
}])


///////////////////////////////////////////////////////===================Logeed In Controller==============================///////////////////////////////////////////////////////
amazone.controller('LoginController',['$scope','$state',function($scope,$state){
  $scope.isloggedin = ()=>{
     //console.log('ran $scope.islogedin function'); 
     chrome.runtime.sendMessage({type:"isloggedin"},(res)=>{
       let response=JSON.parse(res);
        //console.log("responeeeeeeeeeeee:" + response);
          if(response!= null){
            $state.go("home");
          }
      });  
   }

   $scope.isloggedin();

   $scope.userData=function(email,pass){
     user.email=email;
     user.password=pass;
     console.log(user);
     chrome.runtime.sendMessage({user:user},function(response){
       if(response.token!=null)
       {
         $state.go("home");
       }
     })

   };
}])








 
