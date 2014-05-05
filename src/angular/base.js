/**
 * BUI对angular的封装
 */
define('bui/angular/base', function(require){
  
  angular.module("bui.angular.base", [])
  
  ;


  // bui.directive('form', [function($rootScope, $q){
  //   return {
  //     restrict: 'AE',
  //     link: function(scope, element, attrs){
  //       BUI.use('bui/form', function(Form){
  //         var form = new Form.HForm({
  //           srcNode: element,
  //           autoRender: true
  //         })
  //       });
  //     }
  //   }
  // }]);

  // //
  // bui.directive('buiSelect', [function(){
  //   return {
  //     restrict: 'AE',
  //     link: function(scope, element, attrs){
  //       BUI.use('bui/select', function(Select){
          
  //       });
  //     }
  //   }
  // }]);

});
