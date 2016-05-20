(function() {
  function Tasks($firebaseArray) {
    var firebaseRef = new Firebase("https://bloctime-cc132.firebaseio.com");

    // download tasks into a synchronized array
    var tasks = $firebaseArray(firebaseRef);
    
      

    return {
      all: tasks,
      sendingData : function(x){
        firebaseRef.push(x);
        document.getElementById('textbox').value='';
      },
      discardingData : function(item){
        tasks.$remove(item);
      }
    }
      
  }

  angular
    .module('blocTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();