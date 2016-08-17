/**
 * Created by Markitosha on 17.08.16.
 */
(function () {
    function createList(category, name, sum) {
        return {
            name: name,
            sum: sum,
            category: category
        }
    }

    var list = null,
    // var list = [createList('income', 'Hello', 500), createList('outcome', 'By', 300)],
        listElement,
        newInput,
        comeInput,
        sumInput,
        selectedMenuElement,
        currentFilter = null,
        balance = 0;

    document.addEventListener('DOMContentLoaded', function () {
        initialize();
        renderList();
        addSubscribers();
    });

    function initialize() {
        listElement = document.getElementsByClassName('list')[0];
        newInput = document.getElementsByClassName('input_some')[1];
        comeInput = document.getElementsByClassName('input_some')[0];
        sumInput = document.getElementsByClassName('input_some')[2];
        selectedMenuElement = document.getElementsByClassName('menu_item_selected')[0];
    }

    function addSubscribers() {
        newInput.addEventListener('keypress', function (event) {
            if (event.keyCode !== 13) {
                return;
            }

            var come = comeInput.value;
            var name = newInput.value;
            var sum = sumInput.value;

            if (isEmptyString(name) || isEmptyString(sum)) {
                return;
            }

            listElement.insertBefore(createListElement(come, name, sum), listElement.firstChild);

            // if(listElement.lastChild.classList.contains('list_empty')){
            //     listElement.removeChild(listElement.lastChild);
            // }

            renderBalance(come, sum);

            doFiltration();

            newInput.value = '';
            sumInput.value = '';
        });

        sumInput.addEventListener('keypress', function (event) {
            if (event.keyCode !== 13) {
                return;
            }

            var come = comeInput.value;
            var name = newInput.value;
            var sum = sumInput.value;

            if (isEmptyString(name) || isEmptyString(sum) || !Number(sum)) {
                return;
            }

            listElement.insertBefore(createListElement(come, name, sum), listElement.firstChild);

            // if(listElement.lastChild.classList.contains('list_empty')){
            //     listElement.removeChild(listElement.lastChild);
            // }

            newInput.value = '';
            sumInput.value = '';

            renderBalance(come, sum);

            doFiltration();
        });

        document.getElementsByClassName('menu_item_all')[0].addEventListener('click', function (event) {
            toggleFilter(event.currentTarget);
            updateFilter(null);
        });

        document.getElementsByClassName('menu_item_income')[0].addEventListener('click', function (event) {
            toggleFilter(event.currentTarget);
            updateFilter('income');
        });

        document.getElementsByClassName('menu_item_outcome')[0].addEventListener('click', function (event) {
            toggleFilter(event.currentTarget);
            updateFilter('outcome');
        });
    }

    function renderBalance(come, sum) {
        if(come === 'income'){
            balance += Number(sum);
        }else{
            balance -= Number(sum);
        }
        var bal = document.getElementsByClassName('balance')[0];
        bal.innerText = "Текущий баланс: " + balance;
    }

    function toggleFilter(newElement) {
        if(selectedMenuElement === newElement){
            return;
        }

        selectedMenuElement.classList.toggle('menu_item_selected');

        newElement.classList.toggle('menu_item_selected');

        selectedMenuElement = newElement;
    }

    function updateFilter(filter){
        currentFilter = filter;
        doFiltration();
    }

    function doFiltration() {
        Array.prototype.forEach.call(listElement.children, function (nodeElement) {
            if(currentFilter === null){
                nodeElement.style.display = 'block';
            } else if (currentFilter === 'income' && (nodeElement.classList.contains('list_green') ||
                        nodeElement.classList.contains('list_empty'))){
                nodeElement.style.display = 'block';
            } else if (currentFilter === 'outcome'  && (nodeElement.classList.contains('list_red') ||
                        nodeElement.classList.contains('list_empty'))){
                nodeElement.style.display = 'block';
            } else {
                nodeElement.style.display = 'none';
            }
        });
    }

    function isEmptyString(str) {
        return /^\s*$/.test(str);
    }

    function renderList() {
        if (list == null && listElement.childElementCount == 0) {
            listElement.appendChild(createListElement(null));
        }else{
            list.forEach(node => {
                listElement.appendChild(createListElement(node.category, node.name, node.sum));
            });
        }
    }

    function createListElement(category, name, sum) {
        if(category !== null){
            listElement.removeChild(listElement.lastChild);
        }
        var node = document.createElement('div');
        if(category == 'income'){
            node.innerHTML = `<div class="list_item list_green">
                                <span class="list_item list_item_name">${name}</span>
                                <span class="list_item list_item_sum">${sum}</span>
                              </div>`;
        }else if(category == 'outcome'){
            node.innerHTML = `<div class="list_item list_red">
                                <span class="list_item list_item_name">${name}</span>
                                <span class="list_item list_item_sum">${sum}</span>
                              </div>`;
        }else{
            node.innerHTML = `<div class="list_empty">
                                Здесь появится информация, когда Вы начнете пользоваться приложением.
                              </div>`;
        }
        return node.firstChild;
    }
})();