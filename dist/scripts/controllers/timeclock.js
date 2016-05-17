(function(){
    function TimeClock($interval){
        var vm = this;
        vm.title = "Time Left"
        vm.workTime = 1500;
        vm.breakTime = 300;
        var countDown;
        
        vm.countDown = function() {
            countDown = $interval(function() {
                if (vm.workTime > 0) {
                    vm.workTime -= 1;
                } else {
                    $interval.cancel(countDown);
                }
            }, 1000);
        }

        vm.takeabreak = function(){
            vm.title = "Break Time Left";
            vm.workTime = vm.breakTime;
        };
       
        vm.resetWorkCount = function(){
            vm.title = "Work Time Left ";
            vm.workTime = 1500;
        };
        
    }
    
    angular
        .module('blocTime')
        .controller('TimeClock', ['$interval', TimeClock]);
})();