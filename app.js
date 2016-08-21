/**
 * Created by Markitosha on 21.08.16.
 */
angular.module('app', [])
    .controller('main', function($scope){
        $scope.list = [
            // createListItem('Помидоры','100', 'outcome'),
            // createListItem('Зарплата', '200', 'income')
        ];

        $scope.input = {
            name: '',
            sum: '',
            category: 'income'
        };

        $scope.emptyName = false;
        $scope.emptySum = false;
        $scope.wrongSum = false;

        $scope.balance = 0;

        $scope.menu = [{name: 'все'}, {name: 'доходы', category: 'income'},
            {name: 'расходы', category: 'outcome'}];

        $scope.selectedMenuItem = $scope.menu[0];

        $scope.deleteListItem = function (index) {
            if($scope.list[index].category === 'income'){
                $scope.balance -= Number($scope.list[index].sum);
            }else{
                $scope.balance += Number($scope.list[index].sum);
            }
            $scope.list.splice(index, 1);
        };

        $scope.selectMenuItem = function (item) {
            $scope.selectedMenuItem = item;
        };

        $scope.getFilteredListItem = function () {
            if (!$scope.selectedMenuItem.category){
                return $scope.list;
            }

            return $scope.list.filter(i => i.category === $scope.selectedMenuItem.category);
        };

        $scope.addListItem = function ($event) {

            if($event.keyCode !== 13 && $event.type !== 'click') {
                return;
            }

            var name = $scope.input.name;
            var sum = $scope.input.sum;
            var category = $scope.input.category;

            $scope.emptyName = false;
            $scope.emptySum = false;
            $scope.wrongSum = false;

            if(isEmptyString(name) || isEmptyString(sum)
                || isEmptyString(category) || !Number(sum)){
                if(isEmptyString(name)){
                    $scope.emptyName = true;
                }
                if(isEmptyString(sum)){
                    $scope.emptySum = true;
                }else if(!Number(sum)){
                    $scope.wrongSum = true;
                }
                return;
            }

            $scope.list.splice(0, 0, createListItem(name, sum, category));

            if(category === 'income'){
                $scope.balance += Number(sum);
            }else{
                $scope.balance -= Number(sum);
            }

            $scope.input.name = '';
            $scope.input.sum = '';
            $scope.input.category = 'income';
        };

        function createListItem(name, sum, category) {
            date = new Date();
            date.toTimeString();
            return {
                name: name,
                sum: sum,
                category: category,
                date: new Date(),
            }
        }

        function isEmptyString(str) {
            return /^\s*$/.test(str);
        }

    });