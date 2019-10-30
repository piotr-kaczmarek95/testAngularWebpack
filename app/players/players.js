import playerstemp from './players.html'
import account from '../svgs/account.svg'


angular.module('homeworkProject.players', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
        when('/players', {
            template: playerstemp,
            controller: 'playersController',
            reloadOnSearch: false
        });
    }])

    .factory('playerDataServices', ['localStorageService', function (localStorageService) {

        return {

            showAllEntries: function () {

                console.log(localStorageService.keys());

                let keys = localStorageService.keys();
                keys.forEach(item => {

                    //zabezpieczenie przed wczytaniem innego elementu ze storage'a niz zawodnik

                    if (localStorageService.get(item).name != undefined) {

                        console.log("Klucz: " + item + ", wartość: imię " + localStorageService.get(item).name + ", wiek " + localStorageService.get(item).age + ", wartość " + localStorageService.get(item).value);
                    }

                })
            },

            importDataFromStorage: function (playerData) {

                //kasowanie wpisów przekazanej tablicy
                playerData.length = 0;

                //aktualizacja danych na podstawie wpisów w localStorage

                let keys = localStorageService.keys();

                keys.forEach(item => {

                    console.log(localStorageService.get(item).name);

                    //zabezpieczenie przed wyswietleniem elementu localStorage, ktory nie jest zawodnikiem - tzn. nie ma atrybutu name

                    if ((localStorageService.get(item).name) != undefined) {

                        playerData.push({

                            name: localStorageService.get(item).name,
                            surname: item,
                            age: localStorageService.get(item).age,
                            value: localStorageService.get(item).value,
                            img: localStorageService.get(item).img
                        })

                    }
                })
            },

            clearAll: function (playerData) {

                let keys = localStorageService.keys()

                console.log("Wypisanie porzed kasowaniem!");

                //usune tylko te klucze, ktore jako wartosc maja obiekt zawierajacy atrybut name - wtedy bede wiedzial, ze to zawodnik, a nie np. obraz czy dane użytkownika 

                for (let i = 0; i < keys.length; i++) {

                    console.log(localStorageService.get(keys[i]));
                    if ('name' in localStorageService.get(keys[i])) {

                        localStorageService.remove(keys[i]);
                    }
                }

                playerData.length = 0;
                console.log("Usunięto zawodników z local storage");
            },

            removeFromStorage: function (surname, playerData) {

                localStorageService.remove(surname);
                console.log("Usunięto: " + surname);

                for (let i = 0; i < playerData.length; i++) {

                    if (playerData[i].surname == surname) {

                        playerData.splice(i, 1);
                    }
                }
            },

            sortBy: function (players, sortBy) {

                console.log(sortBy);

                //sortBy jest nazwa wlasnosci, po ktorej sa sortowane wpisy          

                if (players.length > 0) {

                    let firstLine = "a." + sortBy + ".toUpperCase()";
                    let secondLine = "b." + sortBy + ".toUpperCase()";

                    // console.log("Sortuje w factory");

                    players.sort(function (a, b) {

                        let textA = eval(firstLine);
                        let textB = eval(secondLine);

                        return textA.localeCompare(textB);

                    })
                }
                // console.log(players);
                return players;
            }
        }
    }])

    .factory('checkAgeService', function () {

        return {

            checkAge: function (age) {

                console.log(age);

                if (age < 15) {

                    console.log("Zbyt mała wartość");
                    return true;
                } else {

                    console.log("Wiek ok!");
                    return false;
                }
            }
        }
    })

    //tu trzeba też wrzucić localStorageService

    .controller('playersController', ['$scope', '$location', 'localStorageService', 'checkAgeService', 'playerDataServices', '$mdDialog', '$interval', function ($scope, $location, localStorageService, checkAgeService, playerDataServices, $mdDialog, $interval) {

        //pamiętaj, że view1 i view2 maja inny kontroler, dlatego nic sie nie pojawia

        $scope.account = account;

        $scope.location = $location;

        $scope.searchButtonActive = true;

        $scope.loadingValue = 0;

        $scope.showPicture = false;

        $scope.surnames = [];

        $scope.getSurnamesToArray = function () {

            //wyluskanie z bazy jedynie nazwisk, ktore beda podpowiedziami w elemencie md-autocomplete

            $scope.surnames.length = 0;

            let keys = localStorageService.keys();

            //wczytanie z bazy tylko tych kluczy, ktore maja atrybut name 

            for (let i = 0; i < keys.length; i++) {

                if (localStorageService.get(keys[i]).name != undefined) {

                    console.log("dodaje" + localStorageService.get(keys[i]).name);
                    $scope.surnames.push(keys[i]);
                }
            }

            console.log("Tablica nazwisk" + $scope.surnames);
        }

        $scope.loadingBeforeSearch = function (searchedPlayer) {

            if (searchedPlayer != "" && searchedPlayer != undefined) {

                console.log(searchedPlayer);

                $scope.searchButtonActive = false; //wylaczenie, zeby nie dalo sie nalozyc dwoch interwalow na siebie kolejnym kliknieciem

                $interval(function () {

                    $scope.loadingValue += 10;
                    console.log($scope.loadingValue);

                    if ($scope.loadingValue == 100) {

                        $scope.loadingValue = 0;
                        $scope.searchPlayer(searchedPlayer);
                        $scope.searchButtonActive = true;
                    }

                }, 100, 10);

            }
        }

        console.log($scope.location);
        // console.log($scope.location.search());       

        if ($scope.location.search() != "") {

            $scope.searchedPlayer = $scope.location.search().searched;
        }

        $scope.checkAge = function (age) {

            //gdy zbyt mlody zwroci true
            return $scope.showAgeWarning = checkAgeService.checkAge(age);
        }

        $scope.text = "Dodaj lub edytuj zawodnika. Wielkość liter w wyszukiwarce nie ma znaczenia.";
        $scope.playerData = [];

        $scope.itemToStorage = function (name, surname, age, value, img) {

            localStorageService.set(surname, {
                name: name,
                age: age,
                value: value,
                img: img
            });

            $scope.importFromStorage(); //aktualizacja wyswietlenia 

            //wyczyszczenie pól input po dodaniu wpisu

            $scope.name = "";
            $scope.surname = "";
            $scope.value = "";
            $scope.age = "";
            $scope.img = "";

            document.getElementById('container').src = $scope.img;


            $scope.playerForm.playerSurname.$dirty = false;
            $scope.playerForm.playerName.$dirty = false;
        }

        $scope.removeFromStorage = function (surname) {

            playerDataServices.removeFromStorage(surname, $scope.playerData);
        }

        $scope.showAllEntries = function () {

            playerDataServices.showAllEntries();
        }

        $scope.importFromStorage = function () {

            playerDataServices.importDataFromStorage($scope.playerData);
            $scope.getSurnamesToArray();
        }

        $scope.clearAll = function () {

            playerDataServices.clearAll($scope.playerData);
        }

        $scope.sortByProperty = function (sortBy) {

            //sortBy jest nazwą własności obiektu

            $scope.playerData = playerDataServices.sortBy($scope.playerData, sortBy);
        }

        $scope.arrToDataset = function (arr) {

            let str = "";

            for (let i = 0; i < arr.length; i++) {

                if (i == (arr.length - 1)) {

                    str = str + "'" + arr[i] + "'";
                    break;
                }

                str = str + "'" + arr[i] + "', ";
            }

            return "[" + str + "]";
        }

        $scope.printChart = function () {

            let keys = localStorageService.keys();

            // console.log(keys.length);

            if (keys.length > 0) {

                let items = [];
                let values = [];

                $scope.showPicture = true;

                keys.forEach(item => {

                    //ponownie - zabezpieczenie, by nie wczytać elementu z localStorage, ktory nie jest zawodnikiem, a np. dana z wizarda

                    if (localStorageService.get(item).value != undefined) {

                        items.push(item);
                        values.push(localStorageService.get(item).value);

                    }

                })

                // console.log(items);
                // console.log(values);

                let itemsDataset = $scope.arrToDataset(items);
                let valuesDataset = $scope.arrToDataset(values);

                let uri = "{type: 'bar', data: { labels:" + itemsDataset + ", datasets: [{ label: 'Value', data:" + valuesDataset + "}]}} ";
                let res = encodeURI(uri);
                document.getElementById("demo").src = "https://quickchart.io/chart?c=" + res;

            }

        }

        $scope.searchPlayer = function (name) {

            if (name != undefined && name != "") {

                console.log(name)

                $location.search('searched', name);

                $scope.found = false;

                console.log("Jestem w funkcji szukającej");

                for (let i = 0; i < $scope.playerData.length; i++) {


                    if (($scope.playerData[i].surname.toLowerCase()) == (name.toLowerCase())) {

                        console.log("Znalezione!");

                        $scope.found = true;
                        $scope.name = $scope.playerData[i].name;
                        $scope.surname = $scope.playerData[i].surname;
                        $scope.age = $scope.playerData[i].age;
                        $scope.value = $scope.playerData[i].value;
                        $scope.img = $scope.playerData[i].img;
                        //wypelnienie kontenera obrazkiem
                        if ($scope.img.length > 0) {

                            document.getElementById('container').src = $scope.img;
                        }


                        break;
                    }
                }

                if (!($scope.found)) {
                    console.log("Nie znalazłem");
                    $scope.found = false;

                    $scope.notFoundMessage = "Nie znalazłem!";


                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .clickOutsideToClose(true)
                        // .title('Uwaga!')
                        .textContent('Nie znaleziono zawodnika.')
                        .ariaLabel('Alert Dialog Demo')
                        .openFrom('.md-raised')
                        .closeTo('.titletext')
                        .ok('Ok')
                    )

                }

                // $location.search('searched', name);
                console.log("Po search");
                console.log($scope.found);
                // console.log($location.search()); //teraz jest getterem 
            }
        }

        $scope.removeHint = function () {

            $location.search('searched', null); //kasowanie podaniem nulla
            $scope.searchedPlayer = "";
        }

        //funkcja odpowiedzialna za wyswietlanie podpowiedzi w md-autocomplete - sprwdza czy podany tekst w inpucie zgadza sie z ktorymkolwiek nazwiskiem

        $scope.checkMatching = function () {

            console.log($scope.searchedPlayer);
            // console.log()

            if ($scope.searchedPlayer != undefined && $scope.surnames.length > 0) {

                $scope.matching = $scope.surnames.filter(function (surname) {

                    return surname.toLowerCase().startsWith($scope.searchedPlayer.toLowerCase());

                    //jesli prawda, to wrzucam do matching
                })

                console.log($scope.matching);
            }
        }

        $scope.calcAge = function () {

            console.log($scope.myDate);

            let todayDate = new Date();
            console.log(todayDate);

            let birthDate = $scope.myDate;

            let diff = todayDate.getTime() - birthDate.getTime();

            let diffYears = Math.floor((diff / (365 * 1000 * 3600 * 24)));

            console.log(diffYears);

            //jesli funkcja sprawdzajaca, czy zawodnik jest zbyt mlody - jesli zwroci false, to wiek ok

            if (!$scope.checkAge(diffYears)) {

                $scope.age = diffYears;
            }

        }

        $scope.importFromStorage(); //wywołanie, by zawartość wyświetliła się przy przeładowaniu widoku

        if ($location.path() == "/players") {

            console.log("Jestem w players!");

            const inputElement = document.getElementById("photo"); //kontener w html na zdjęcie
            // console.log(inputElement);
            if (inputElement) {

                inputElement.addEventListener("change", handleFiles, false);

                function handleFiles() {

                    let image = inputElement.files[0];
                    console.log(image);

                    let reader = new FileReader();
                    reader.readAsDataURL(image);

                    //po zaladowaniu elementu
                    reader.onload = function (e) {

                        $scope.imgUploaded = true;
                        document.getElementById("container").src = e.target.result;
                        console.log(document.getElementById("container"));
                        $scope.img = e.target.result; //podstawiam pod zmienna, ktora bedzie pozniej wrzucona do obiektu przechowujacego dane zawodnika  (w funkcji itemToStorage)                               

                    }
                }
            }
        }

    }]);