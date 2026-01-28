/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/


// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

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


// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let game of games) {
        // create a new div element for the game card
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        // set the inner HTML using template literals
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

        // append the game card to the container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function with GAMES_JSON
addGamesToPage(GAMES_JSON);

// create a function that adds all data from the games array to the page

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// Grab the elements first
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");  // <-- needed
const gamesCard = document.getElementById("num-games");      // <-- needed

// Total contributions
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString(); // 19187

// Total amount raised
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`; // e.g., $719,859

// Total number of games
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames.toLocaleString(); // e.g., 11


// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    console.log(unfundedGames.length); // <-- tells you Secret Key Component 1
}


    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM



// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const fundedGames = GAMES_JSON.filter(
        game => game.pledged >= game.goal
    );

    addGamesToPage(fundedGames);
    console.log(fundedGames.length); // 🔑 Component 2
}



    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM



// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}


    // add all games from the JSON data to the DOM



// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
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
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;


// create a string that explains the number of unfunded games using the ternary operator
// Total raised (already calculated in Challenge 4)
const totalRaisedAmount = totalRaised;

// Total number of games (already calculated in Challenge 4)
const totalGamesAmount = totalGames;

// Create the summary string
const summaryStr = `A total of $${totalRaisedAmount.toLocaleString()} has been raised for ${totalGamesAmount} games. Currently, ${numUnfundedGames} ${numUnfundedGames === 1 ? "game remains" : "games remain"} unfunded.`;


// create a new DOM element containing the template string and append it to the description container
// Create a new paragraph element
const summaryElement = document.createElement("p");

// Add the summary string to it
summaryElement.innerHTML = summaryStr;

// Append it to the description container
descriptionContainer.appendChild(summaryElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Grab the first and second games using destructuring and the spread operator
const [topGame, secondGame, ...rest] = sortedGames;

// Log to check
console.log("Top game:", topGame.name);
console.log("Second top game:", secondGame.name);
console.log("Rest of the games:", rest);

// Create a new element for the top funded game
const topGameEl = document.createElement("p");
topGameEl.textContent = topGame.name;  // Display the name
firstGameContainer.appendChild(topGameEl);

// Create a new element for the second funded game
const secondGameEl = document.createElement("p");
secondGameEl.textContent = secondGame.name;  // Display the name
secondGameContainer.appendChild(secondGameEl);

window.filterUnfundedOnly = filterUnfundedOnly;
window.filterFundedOnly = filterFundedOnly;
window.showAllGames = showAllGames;


// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
