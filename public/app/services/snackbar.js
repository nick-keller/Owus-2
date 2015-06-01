(function(){
    'use strict';

    angular.module('app')
        .service('snackbar', ['$timeout', function($timeout){
            var vm = this;
            vm.messages = [];
            vm.show = false;
            vm.current = null;
            vm.callbacks = [];

            vm.listen = listen;
            vm.add = add;

            function listen(cb) {
                vm.callbacks.push(cb);
            }

            function emit() {
                vm.callbacks.forEach(function(cb) {
                    cb(vm.show, vm.current);
                });
            }

            function add(message) {
                vm.messages.push(message);

                if(vm.messages.length == 1)
                    next();
            }

            function next() {
                if(!vm.messages.length) return;

                vm.current = vm.messages[0];
                vm.show = true;
                emit();

                $timeout(function(){
                    vm.show = false;
                    emit();
                    $timeout(function(){
                        vm.messages.splice(0, 1);
                        next();
                    }, 500);
                }, 4000);
            }
        }])
})();