/**
 * BUI对angular的封装
 */
define('bui/angular/directive', function(require){
  

  angular.module("bui.angular.directive", [])

  //定义form指令
  .directive('form', [function($rootScope, $q){
    return {
      restrict: 'AE',
      link: function(scope, element, attrs){
        BUI.use('bui/form', function(Form){
          var form = new Form.HForm({
            srcNode: element,
            autoRender: true
          });
        });
      }
    }
  }])
  //定义
  .directive('buiSelect', [function(){
    return {
      restrict: 'AE',
      link: function(scope, element, attrs){
        BUI.use('bui/select', function(Select){
        });
      }
    }
  }]);

});
