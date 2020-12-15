

const {
    initialRoutes,
    historyRouterPush,
    hashRouterPush
  } = require('./Router')

// app division
const historyAppDiv = document.querySelector('#history-app')
const hashAppDiv = document.querySelector('#hash-app')

// Browser History
initialRoutes('history', historyAppDiv)

// Hash History
initialRoutes('hash', hashAppDiv)

window.onload = () => {
    const historyLinker = document.querySelectorAll('span.history')
    const hashLinker = document.querySelectorAll('a.hash')
  
    historyLinker.forEach(el => {
      el.addEventListener('click', (evt) => {
        const pathName = evt.target.getAttribute('route')
  
        historyRouterPush(pathName, historyAppDiv)
      })
    })
  
    hashLinker.forEach(el => {
      el.addEventListener('click', (evt) => {
        const pathName = evt.target.getAttribute('route')
  
        hashRouterPush(pathName, hashAppDiv)
      })
    })
}

let keyword = undefined;
let keywordList = undefined; 
let keywordText = document.getElementById("keyword");
let score = document.getElementById("score");
let time = document.getElementById("time");
let restTime = 10;
let index = 0;

let xhttp = new XMLHttpRequest();
xhttp.open('POST', 'http://localhost:8081/SpringJavaConfig/test2', true);
xhttp.send();

xhttp.onreadystatechange = function(){
    if(xhttp.readyState === 4 && xhttp.status === 200){
        keywordList = JSON.parse(xhttp.responseText);

        if(keywordList !== null && keywordList !== undefined){
            if(keywordList.length > 0){
                keyword = keywordList[index];
                console.log('keyword: ', keyword);
                keywordText.innerHTML = keyword;
                score.innerHTML = index;
            }
        }
    }
};

document.getElementById("test").addEventListener('keyup', function(e){
    console.log('44: ', e);

    if(e.target.value === keyword){
        if(keywordList !== undefined && keywordList.length > index){
            console.log('correct!! index: ', index);
            index++;
            score.innerHTML = index;
            if(keywordList[index] !== undefined){
                keywordText.innerHTML = keywordList[index];
                keyword = keywordList[index];
            }else{
                keywordText.innerHTML = 'complete';
            }
        }
    }
})

setInterval( function(){
    restTime--;
    time.innerHTML = restTime;

    if(restTime === 0){
        index++;

        if(keywordList[index] !== undefined){
            keyword = keywordList[index];
            keywordText.innerHTML = keyword;
        }

        restTime = 10;
    }
}, 1000)
