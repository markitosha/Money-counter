/**
 * Created by Markitosha on 21.08.16.
 */
angular.module('app', [])
    .controller('main', function($scope){

        //Глобальные переменные: Ошибки и дата
        $scope.emptyName = false;
        $scope.emptySum = false;
        $scope.wrongSum = false;
        $scope.currMonth = 12;
        $scope.balance = 0;

        //Название месяца по номеру
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

        /*СПИСОК И ВВОД*/

        //Начальный список
        $scope.list = [
            // createListItem('Помидоры','100', 'outcome', 1),
            createListItem('Зарплата', '200', 'income', 1)
        ];

        //Объект ввода
        $scope.input = {
            name: '',
            sum: '',
            category: 'income',
        };

        //Создание нового элемента списка
        function createListItem(name, sum, category, date) {
            date = new Date();
            //КОСТЫЛЬ ДЛЯ ПРОВЕРКИ ГРУППИРОВКИ ПО МЕСЯЦАМ
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

        //Удаление элемента списка с изменением баланса
        $scope.deleteListItem = function (index) {
            if($scope.list[index].category === 'income'){
                $scope.statistic.income -= Number($scope.list[index].sum);
                $scope.balance -= Number($scope.list[index].sum);
            }else{
                $scope.statistic.outcome -= Number($scope.list[index].sum);
                $scope.balance += Number($scope.list[index].sum);
            }
            $scope.list.splice(index, 1);
        };

        //Добавление нового элемента в список
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
                $scope.statistic.income += Number(sum);
                $scope.balance += Number(sum);
            }else{
                $scope.statistic.outcome += Number(sum);
                $scope.balance -= Number(sum);
            }

            $scope.input.name = '';
            $scope.input.sum = '';
            $scope.input.category = 'income';
        };

        /*МЕНЮ*/

        //Пункты меню
        $scope.menu = [{name: 'все'}, {name: 'доходы', category: 'income'},
            {name: 'расходы', category: 'outcome'}, {name: 'статистика', category: 'statistic'}];

        //Глобальные переменные
        $scope.selectedMenuItem = $scope.menu[0];

        //Выбираем новый пункт меню
        $scope.selectMenuItem = function (item) {
            $scope.selectedMenuItem = item;
        };

        //Фильтрация общего списка для вывода в меню
        $scope.getFilteredListItem = function () {
            if (!$scope.selectedMenuItem.category){
                return $scope.list;
            }

            return $scope.list.filter(i => i.category === $scope.selectedMenuItem.category);
        };

        /*СТАТИСТИКА*/

        $scope.statistic = {
            income: 0,
            outcome: 0
        };

        //Пустая ли строка
        function isEmptyString(str) {
            return /^\s*$/.test(str);
        }

    });