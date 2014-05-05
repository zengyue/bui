<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular 测试</title>
  <link href="http://cdn.bootcss.com/bootstrap/3.1.1/css/bootstrap.css" rel="stylesheet">
  <script src="http://g.tbcdn.cn/fi/bui/jquery-1.8.1.min.js"></script>
  <script src="http://g.tbcdn.cn/fi/bui/seed.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.js"></script>
  <script src="../../src/angular/base.js"></script>
  <script src="../../src/angular/directive.js"></script>
</head>
<body>
  <form>
    
  </form>

  <bui-select>
  </bui-select>

  <script>
  BUI.use(['bui/angular/base', 'bui/angular/directive'], function(){
    console.log(111);
    angular.bootstrap(document, ['bui.angular.directive']);
  });
  </script>
</body>
</html>
