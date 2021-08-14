'use strict';

// global variables

let allItems = [];

// querySelector = method
let myContainer = document.querySelector('section'); 
let myButton = document.querySelector('section + div');
let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:nth-child(3)');

let clicks = 0;
let clicksAllowed = 25; 

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
    // call the selectRandomItem
    let item1 = selectRandomItem();
    let item2 = selectRandomItem();
    let item3 = selectRandomItem();
    // push item values in array
    // google MDN array has value
    while (item1 === item2 || item1 === item3 || item2 === item3) {
        item2 = selectRandomItem();
        item3 = selectRandomItem();
    }
        img1.src = allItems[item1].src;
        img2.src = allItems[item2].src;
        img3.src = allItems[item3].src;
        img1.alt = allItems[item1].name;
        img2.alt = allItems[item2].name;
        img3.alt = allItems[item3].name;
        allItems[item1].views++;
        allItems[item2].views++;
        allItems[item3].views++;
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
            myButton.className = 'clicks-allowed';
            myContainer.removeEventListener('click', handleItemClick);
        }
    }

    function renderResults() {
        let ul = document.querySelector('ul');
        for (let i = 0; i < allItems.length; i++) {
            let li = document.createElement('li')
            li.textContent = `${allItems[i].name} had ${allItems.views} views and was clicked ${allItems[i].clicks} times.`;
            ul.appendChild(li);
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

    console.log(allItems);
    renderItems();

    myContainer.addEventListener('click', handleItemClick);
    myButton.addEventListener('click', renderResults);

