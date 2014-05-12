<!doctype html>
<html ng-app="app">
<head>
  <meta charset="utf-8">
  <title>Angular 测试</title>
  <script src="http://g.tbcdn.cn/fi/bui/jquery-1.8.1.min.js"></script>
  <script src="http://g.tbcdn.cn/fi/bui/seed.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.js"></script>
  <script src="../../src/angular/base.js"></script>
  <script src="../../src/angular/directive.js"></script>

  <link rel="stylesheet" href="/git/bui/assets/css/bs3/dpl.css">
  <link rel="stylesheet" href="/git/bui/assets/css/bs3/bui.css">
</head>
<body>
  
  <div ng-controller="MyCtrl">
    <div id="a" bui-role="Select.Select" ></div>
  </div>

  <script>
  BUI.use(['bui/angular/base', 'bui/angular/directive'], function(){
    
    angular.module('app', ['bui.angular.directive'])
    .controller('MyCtrl', ['$scope', function($scope){
      $scope.a = {
        items: [
          {text:'选项1',value:'a'},
          {text:'选项2',value:'b'},
          {text:'选项3',value:'c'}
        ]
      }
    }]);
    
  });
  </script>
</body>
</html>
