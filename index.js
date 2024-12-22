/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(games);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {

    for (let i = 0; i < games.length; i++) {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
        <div>
            <img src="${games[i].img}" alt="${games[i].name}"/>
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p>Backers: ${games[i].backers}</p>
        </div>`;
        gamesContainer.appendChild(gameCard);
    };
}
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames.toLocaleString()}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unmetGoal = GAMES_JSON.filter((game) => game.pledged < game.goal); 

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unmetGoal);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let exceededGoal = GAMES_JSON.filter((game) => game.pledged >= game.goal);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(exceededGoal);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
  
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;}, 0);

// create a string that explains the number of unfunded games using the ternary operator
// `Number of games still needing to reach their pledging goal: ${unfundedGamesCount}`

// create a new DOM element containing the template string and append it to the description container
const newDescription = document.createElement('p');
newDescription.textContent = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games. Currently, ${unfundedGamesCount} games remain unfunded. We need your help to fund these amazing games!`;
descriptionContainer.appendChild(newDescription);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const { name: name0, ...rest0 } = GAMES_JSON[0];
const { name: name1, ...rest1 } = GAMES_JSON[1];
const game0Info = { name: name0, ...rest0 };
const game1Info = { name: name1, ...rest1 };

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topFundedGame = document.getElementById("first-game");
const topFundedStr = document.createElement("p");
topFundedStr.textContent = `${name0}`;
topFundedGame.appendChild(topFundedStr);
// do the same for the runner up item
const runnerUpGame = document.getElementById("second-game");
const runnerUpStr = document.createElement("p");
runnerUpStr.textContent = `${name1}`;
runnerUpGame.appendChild(runnerUpStr);

/************************************************************************************
 * Bonus Feature: Create a search bar for user to look up a specific game, add shortcuts
 * Skills used: event listener, filter, scrollTo
 */

function filterGamesByTitle(keyword) {
    deleteChildElements(gamesContainer);

    const searchResults = GAMES_JSON.filter((game) =>
        game.name.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log("Filtered results:", searchResults); // Debugging log
    addGamesToPage(searchResults);
}
// Event listener for search bar
const searchBar = document.getElementById("search-bar");
const ourGamesSection = document.getElementById("our-games");
searchBar.addEventListener("input", (event) => {
    const keyword = event.target.value;

    // Call the filter function to update the games
    filterGamesByTitle(keyword);

    // Scroll to the "Our Games" section
    const navbarHeight = document.querySelector(".navbar").offsetHeight; // Account for fixed navbar height
    window.scrollTo({
        top: ourGamesSection.offsetTop - navbarHeight,
        behavior: "smooth", // Smooth scrolling
    });
});
