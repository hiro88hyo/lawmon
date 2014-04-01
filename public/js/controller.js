var app = angular.module('app', ['ngResource']);

app.controller('RecordsCtrl', function($scope, $resource){
  var Record = $resource('/record', {},{
    'update': {method: 'PUT'}
  });
  $scope.records = Record.query();
  $scope.add = function(){
    var d = new Date().getTime()/1000|0;
    var rec = new Record();
    rec.id = "rec" + d;
    rec.$save(function(savedObject, handler){
      location.href='/record/' + rec.id;
    });
  };
});

app.controller('ActionsCtrl', function($scope, $resource){
  var recId = location.href.split('/')[4];
  var Action = $resource('/record/:id/action', {id:recId},{
    'update': {method: 'PUT'}
  });
  $scope.actions = Action.query();
  $scope.clickStart = function(){
    var d = new Date().getTime()/1000|0;
    var act = new Action();
    act.id = "act" + d;
    act.record_id = recId;
    act.start_time = new Date();
    $scope.actions.push(act);
    $scope.tgStart = true;
    $scope.tgEnd = false;
  };
  $scope.clickEnd = function(){
    act = $scope.actions[$scope.actions.length-1];
    act.end_time = new Date();
    $scope.tgStart = false;
    $scope.tgEnd = true;
    act.$save();
  };
  $scope.delete = function(id){
    var p = findActionIndexById(id);
    if (p>=0){
      act = $scope.actions;
      $scope.actions.$remove(id);
      $scope.actions.splice(p,1);
    };
  };
  function findActionIndexById(id){
    for(var i=0, max=$scope.actions.length; i<max; i++){
      if ($scope.actions[i].id == id){
        return i;
      }
    }
    return -1;
  }
});

