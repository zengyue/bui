/**
 * BUI对angular的封装
 */
define('bui/angular/directive', function(require){

  function loadPath(path){
    return path.toLowerCase();
  }


  angular.module("bui.angular.directive", [])

  .factory('controllerFactory', ['$q', function($q){
    return {
      create: function(namespace){
        var deferred = $q.defer();

        var space = namespace.split('.');

        BUI.use(loadPath(space[0]), function(Controller){
          deferred.resolve(Controller[space[1]])
        });

        return deferred.promise;
      }
    }
  }])

  //定义
  .directive('buiRole', ['controllerFactory', function(controllerFactory){
    return {
      restrict: 'AE',
      scope: {},
      link: function(scope, element, attrs){
        var namespace = attrs['buiRole'],
          $parent = scope.$parent,
          id = attrs.id;

        if(id){
          if($parent[id]){
            BUI.mix(scope, $parent[id]);
          }
          $parent[id] = scope;
        }

        controllerFactory.create(namespace)
        .then(function(Controller){
          new Controller({
            render: element,
            autoRender: true,
            items: scope.items
          });
        });


      }
    }
  }]);

});
