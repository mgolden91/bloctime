(function(){
    function TimeClock($interval){
        var vm = this;
        vm.onBreak = false;
        vm.title = "Time Left";
        vm.buttonTitle = "Work!!!";
        vm.workTime = 05;
        vm.breakTime = 10;
        vm.showButton = true;
        vm.longBreakCounter = 0;
        vm.sectionCompleteSound = new buzz.sound("/../assets/sounds/complete.mp3",{
            preload: true
        });
        var countDown;
        
        
        vm.countDown = function() {
            vm.showButton = false;
            countDown = $interval(function() {
                if (vm.workTime > 0) {
                    vm.workTime -= 1;
                } else {
                    $interval.cancel(countDown);
                    vm.sectionCompleteSound.play();
                    vm.onBreak = !vm.onBreak;
                    vm.showButton = true;
                    if (vm.onBreak == true){
                        vm.buttonTitle = "Break?";
                    } else {
                        vm.buttonTitle = "Work?";
                    }
                }
            }, 1000);
        };

        vm.takeabreak = function(){
            vm.title = "Break Time Left";
            vm.buttonTitle = "Break!!!";
            vm.workTime = vm.breakTime;
            vm.onBreak = true;
            vm.countDown();
        };
       
        vm.resetWorkCount = function(){
            vm.title = "Work Time Left ";
            vm.workTime = 05;
            vm.onBreak = false;
            if (vm.longBreakCounter < 4 ){
                vm.longBreakCounter += 1;
            } else if (vm.longBreakCounter >= 4){
                vm.longBreakCounter = 1;
            }
            vm.countDown();
        };
        
        vm.longBreak = function(){
            vm.title = "Long Break";
            vm.workTime = 15;
            vm.onBreak = true;
            vm.longBreakCounter = 0;
            vm.countDown();
            
        };
        
        vm.finalCountDown = function(){
          if (vm.onBreak == false){
              vm.resetWorkCount();      
          } else if (vm.onBreak == true){
              vm.takeabreak();
          } else if (vm.onBreak == true && vm.longBreakCounter == 4){
              vm.longBreak();
          } 
        };
        
    }
    
    angular
        .module('blocTime')
        .controller('TimeClock', ['$interval', TimeClock]);
})();