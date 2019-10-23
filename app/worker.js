self.addEventListener('message', function (e) {

  // console.log("Obliczenia w web workerze!");
  // for (let i=100000; i>0; i--){

  //   console.log("Odliczam! "+ i);

  // }

  let countingTime = new Date().getTime() + 10000; //10 s
  let now = new Date().getTime();

  // console.log(now);

  while (now < countingTime) {

    now = new Date().getTime();
  }

  console.log(now);

  this.postMessage("Worker zakonczyl prace");

})