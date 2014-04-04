var app = angular.module('app', ['ngResource']);

app.controller('RecordsCtrl', function($scope, $resource){
  var Record = $resource('/record', {},{
    'update': {method: 'PUT'}
  });
  $scope.records = Record.query();
  $scope.add = function(){
    var rec = new Record();
    rec.created_at = new Date();
    var d = rec.created_at.getTime()/1000|0;
    rec.id = "rec" + d;
    rec.shop_name = $scope.shop;
    rec.operator = $scope.operator;
    rec.$save(function(savedObject, handler){
      location.href='/record/' + rec.id;
    });
  };
});

app.controller('ActionsCtrl', function($scope, $resource){
  $scope.tgEnd = true;
  $scope.action = 'A1';
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
    act.action_detail = $scope.detail;
    act.notice = $scope.notice;
    act.$save(function(savedObject, handler){
      $scope.detail = "";
      $scope.notice = "";
    });
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


function dateFormat(date) {
  m = ('0' + (date.getMonth() + 1)).slice(-2);
  d = ('0' + (date.getDate())).slice(-2);

  return date.getFullYear() + '/' + m + '/' + d + '/' + toLocaleTimeString();
}