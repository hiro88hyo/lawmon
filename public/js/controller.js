var app = angular.module('app', ['ngResource']);

app.controller('RecordsCtrl', function($scope, $resource){
  var Record = $resource('/record/:rid', {},{
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
  $scope.remove = function(index, record_id){
    $scope.records[index].$remove({rid: record_id}, function(){
      $scope.records.splice(indexOf($scope.records, record_id),1);
    });
  };
});

app.controller('ActionsCtrl', function($scope, $resource){
  $scope.tgEnd = true;
  $scope.action = 'A1';
  var recId = location.href.split('/')[4];
  $scope.recId = recId;
  var Action = $resource('/record/:rid/action/:aid', {rid:recId},{
    'update': {method: 'PUT'}
  });
  $scope.actions = Action.query();
  $scope.clickStart = function(){
    var d = new Date().getTime()/1000|0;
    var act = new Action();
    act.id = "act" + d;
    act.crew_name = $scope.crew;
    act.action_id = $scope.action;
    act.action_detail = $scope.detail;
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
    act_action_id = $scope.action;
    act.action_detail = $scope.detail;
    act.notice = $scope.notice;
    act.crew_name = $scope.crew;
    act.$save(function(savedObject, handler){
      $scope.detail = "";
      $scope.notice = "";
    });
  };
  $scope.remove = function(index, action_id){
    $scope.actions[index].$remove({aid: action_id}, function(){
      $scope.actions.splice(indexOf($scope.actions, action_id),1);
    });
  };
});

function indexOf(arr,id){
  for(var i=0; i<arr.length; i++){
    if (arr[i].id == id){
      return i;
    }
  }
  return -1;
}
