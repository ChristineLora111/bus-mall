'use strict';

// global variables

let allItems = [];
let clicks = 0;
let clicksAllowed = 25; 
let numberOfUniqueIndexes = 6;
let indexArray = [];

// querySelector = method
let myContainer = document.querySelector('section'); 
let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:nth-child(3)');

function Items (name, fileExtension = 'jpeg') {
    this.name = name; 
    this.src = `img/${name}.${fileExtension}`;
    this.views = 0;
    this.clicks = 0;
    allItems.push(this);
}

function selectRandomItem() {
    return Math.floor(Math.random() * allItems.length);
}

function renderItems() {
    while (indexArray.length < numberOfUniqueIndexes) {
        let randomNumber = selectRandomItem(); 
        if (!indexArray.includes(randomNumber)) {
            indexArray.push(randomNumber);
        }
    }
    console.log(indexArray);
    let item1 = indexArray.shift();
    let item2 = indexArray.shift();
    let item3 = indexArray.shift();

    img1.src = allItems[item1].src;
    img1.alt = allItems[item1].name;
    allItems[item1].views++;
    img2.src = allItems[item2].src;
    img2.alt = allItems[item2].name;
    allItems[item2].views++;
    img3.src = allItems[item3].src;
    img3.alt = allItems[item3].name;
    allItems[item3].views++; 
    console.log(indexArray);
}

// Storage

function storeAItem () {
    let stringifyItems = JSON.stringify(allItems);
    localStorage.setItem('itemstorage', stringifyItems);
}

// Check local storage

function getItems() {
    let potentialItems = localStorage.getItem('itemstorage');
    if(potentialItems){
        let parsedItems = JSON.parse(potentialItems);
        allItems = parsedItems;
    }
}
  
function handleItemClick(event) {
    if (event.target === myContainer) {
        alert('Please choose an item');
    }
    clicks++;
    let clickItem = event.target.alt;
    console.log(clickItem);
    for (let i = 0; i < allItems.length; i++) {
        if (clickItem === allItems[i].name) {
            allItems[i].clicks++;
            break;
        }
    }
    renderItems();
    if (clicks === clicksAllowed) {
        myContainer.removeEventListener('click', handleItemClick);
        renderChart();
        storeAItem();
        }
    }
    
    new Items ('bag');
    new Items('banana');
    new Items ('bathroom');
    new Items ('boots');
    new Items ('breakfast');
    new Items ('bubblegum');
    new Items ('chair');
    new Items ('cthulhu');
    new Items ('dog-duck');
    new Items ('dragon');
    new Items ('pen');
    new Items ('pet-sweep');
    new Items ('scissors');
    new Items ('shark');
    new Items ('sweep', 'png');
    new Items ('tauntaun');
    new Items ('unicorn');
    new Items ('water-can');
    new Items ('wine-glass');

    renderItems(); 

    function renderChart() {
        let itemViews = []; 
        let itemClicks = [];
        let itemNames = [];
        for (let i = 0; i < allItems.length; i++) {
            itemViews.push(allItems[i].views);
            itemClicks.push(allItems[i].clicks);
            itemNames.push(allItems[i].name);
        }
        let chartObject = {
            type: 'bar',
            data: {
                labels: itemNames,
                datasets: [{
                    label: 'Views',
                    data: itemViews, 
                    backgroundColor: 'red',
                    borderColor: 'white',
                    borderWidth: 1
                },
                {
                    label: 'Clicks',
                    data: itemClicks,
                    backgroundColor: 'blue',
                    borderColor: 'white',
                    borderWidth: 1
                }
                ]
            },
            options: {
            scales: { 
            y: {
            beginAtZero: true
            }
        }
    }
}; 

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, chartObject);
}

myContainer.addEventListener('click', handleItemClick);
getItems(); 

