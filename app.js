/**
 * Created by Markitosha on 21.08.16.
 */
angular.module('app', [])
    .controller('main', function($scope){
        $scope.list = [
            // createListItem('Помидоры','100', 'outcome', 1),
            createListItem('Зарплата', '200', 'income', 1)
        ];

        $scope.input = {
            name: '',
            sum: '',
            category: 'income',
        };

        $scope.emptyName = false;
        $scope.emptySum = false;
        $scope.wrongSum = false;
        $scope.currMonth = 12;
        $scope.monthName = function (item) {
          switch (item.date.getMonth()){
              case 0: return 'Январь';
              case 1: return 'Февраль';
              case 2: return 'Март';
              case 3: return 'Апрель';
              case 4: return 'Май';
              case 5: return 'Июнь';
              case 6: return 'Июль';
              case 7: return 'Август';
              case 8: return 'Сентябрь';
              case 9: return 'Октябрь';
              case 10: return 'Ноябрь';
              case 11: return 'Декабрь';
          }
        };

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

            var nm = $scope.currMonth !== $scope.list[0].date.getMonth();
            $scope.currMonth = $scope.list[0].date.getMonth();
            if($scope.list.length > 1){
                $scope.list[1].newMonth = nm;
            }

            if(category === 'income'){
                $scope.balance += Number(sum);
            }else{
                $scope.balance -= Number(sum);
            }

            $scope.input.name = '';
            $scope.input.sum = '';
            $scope.input.category = 'income';
        };

        function createListItem(name, sum, category, date) {
            date = new Date();
            if(arguments.length === 4)
                date.setMonth(6);
            return {
                name: name,
                sum: sum,
                category: category,
                date: date,
                newMonth: false
            }
        }

        function isEmptyString(str) {
            return /^\s*$/.test(str);
        }

    });