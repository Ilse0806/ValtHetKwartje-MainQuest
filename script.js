//gets the start game button from html
const startGame = document.getElementById('start_game');
let fadeState = true;
const gameScreen = document.querySelector('.hidden');
const visibleGameScreen = document.querySelector('.visible');

const selectDialog = document.querySelector('dialog');
const inputLocation = document.getElementById('pickLocation');

const allCostsEnd = ["Vaste lasten", 'vasteLasten', "Variabele lasten", 'variabeleLasten', "Hobby's", 'hobbyLasten'];

const inputSelect = document.getElementById('locations');

//set a variable to use multiple times when creating the overview of the job someone has chosen
const headJob = document.createElement('div');
headJob.setAttribute('class', 'showProfile');

//sets a variable to be able to create the same overview of how much money someone has
const showMoney = document.createElement('div');
showMoney.setAttribute('class', 'showTheMoney');

let clickedOnHouse = "";
let whichJobIsSelected = "";

//array in which the hobbies will be put when they are selected
const selectedHobbies = [];

//multiple arrays which store the income and the expenses of the player
const allIncome = [];
const allOutcome = [];
const vastUitkomst = [];
const variabeleUitkomst = ['€'];
const hobbyKosten = [];

//object which holds all the jobs and values like their salary and their budget
const allJobs = {
    piloot: {
        salary: "€1",
        budget: "€",
        hobbys: " ",
        img: ""
    },
    chirurg: {
        salary: "€2",
        budget: "€",
        hobbys: "",
        img: ""
    },
    advocaat: {
        salary: "€3",
        budget: "€",
        hobbys: "",
        img: ""
    },
    kapper: {
        salary: "€4",
        budget: "€",
        hobbys: "",
        img: ""
    },
    chef: {
        salary: "€5",
        budget: "€",
        hobbys: "",
        img: ""
    },
    beveiliger: {
        salary: "€6",
        budget: "€",
        hobbys: "",
        img: ""
    }
};
// sets the previous object to an array to gather a job quickly
const objectArray = Object.getOwnPropertyNames(allJobs);  

//object which holds all the hobbies and the important values, like the cost and an image
const hobbyObject = {
    Voetbal : {
        kosten: "€1",
        img : "",
    }, 
    Dansen: { 
        kosten: "€2",
        img : "",
    }, 
    Vissen: {
        kosten: "€3",
        img : "",
    },
    Gitaar: {
        kosten: "€4",
        img : "",
    },
    Gym : {
        kosten: "€5",
        img : "",
    },
    Lezen: {
        kosten: "€6",
        img : "",
    }, 
    Windsurfen: {
        kosten: "€7",
        img : "",
    }, 
    Hockey: {
        kosten: "€8",
        img : "",
    }, 
    Volleybal : {
        kosten: "€9",
        img : "",
    },
    Paardrijden: {
        kosten: "€10",
        img : "",
    }, 
    Gamen: {
        kosten: "€11",
        img : "",
    }, 
    Fotografie: {
        kosten: "€12",
        img : "",
    }
};
// sets the previous object of hobbies into an array to gain easy acces to all the hobbies
const hobbyArray = Object.getOwnPropertyNames(hobbyObject);  

//object that holds all the houses the player could select with the correct values of the rent and an image
const houseObject = {
    Huis1 : {
        huurkosten : "€",
        img : ""
    },
    Huis2 : {
        huurkosten : "€",
        img : ""
    },
    Huis3 : {
        huurkosten : "€",
        img : ""
    },
    Huis4 : {
        huurkosten : "€",
        img : ""
    }
};
// sets the previous object into an array
const houseArray = Object.getOwnPropertyNames(houseObject);

// sets an event listener on the "start" button which will set the game in motion
startGame.addEventListener("click", function() {
    startGame.remove();
    fader();
});

// gets called on click of the start button, which will fade the game screen into the browser
function fader() {
    // checks if previously set variable is true, to set the fader into motion
    if (fadeState === true) {
        gameScreen.setAttribute("class", "visible");
        fadeState = false;
        renderJobs();
    } else {
        console.log("fail");
    }
};

// this function renders all the jobs the player can select in the game
function renderJobs () {  
    // it renders all the jobs that have been set in the array of all the jobs
    for (const [key] of Object.entries(allJobs)) {
        // this creates a button which will hold the name of the job that can be selected
        const Job = document.createElement('button');
        Job.setAttribute('class', "Jobs");
        Job.innerText = `${key}`;
        gameScreen.appendChild(Job);
        const keyValue = objectArray.indexOf(`${key}`);
        Job.setAttribute('id', keyValue);   
    };
    // next I created a button which will be clickable after the player has selected a job, which will continue to the next screen
    const continueButton = document.createElement('button');
    continueButton.setAttribute('id', 'continueWithAJob');
    continueButton.setAttribute('class', 'continueButtons');
    gameScreen.appendChild(continueButton);
    continueButton.appendChild(document.createTextNode('Ga door'));
    selectJob();
    acceptJob();    
};

// function which allows the player to click on a a job which will select this job
function selectJob() {
    // the next three lines adds an event listener to all the jobs buttons
    const jobsButtons = document.querySelectorAll('.Jobs');
    jobsButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            // gets the id of the button which has been clicked, so it is clear which job has been selected
            const getID = button.getAttribute('id');
            whichJobIsSelected = getID;
            yourJob(getID);
        });
    });
};

//this function will show the player that a job has been selected 
function yourJob(selectedJob) {
    const resetArray = ['0', '1', '2', '3', '4', '5'];
    // this for loop sets all the colors after each click to the original color
    for (let k = 0; k <resetArray.length; k++){
        const resetWithID = document.getElementById(k);
        resetWithID.style.background = '#91dbf4';
        resetWithID.style.border = 'solid #91dbf4';
    };
    //this part sets the one job that has been selected to a different color than the other jobs
    const currentJob = document.getElementById(selectedJob);
    currentJob.style.backgroundColor = '#0095C5';
    currentJob.style.border = 'solid white'
};

//this function allows the player to continue after they have selected a job
function acceptJob() {
    // it adds an even listener to the continue button which needs to know which job has been selected before it continues
    const jobIsSelected = document.getElementById('continueWithAJob');
    jobIsSelected.addEventListener("click", function() {
        //yourJob grabs the the job that has been selected
        const yourJob = objectArray[whichJobIsSelected];
        //next it gets the income and budget of the selected job and pushes this into the income array, which has been created at the start of this document
        const pushToincome = allJobs[yourJob].salary;
        const pushBudget = allJobs[yourJob].budget;
        allIncome.push(pushToincome);
        allIncome.push(pushBudget);
        renderYourJob();
    });
};

//after the player has selected a job they can see the income that comes along with this job, this is rendered in the following function
function renderYourJob() {
    // first it runs another function, which is declared at the bottom of this document
    cleanseScreen();
    //creates a new div in which the player can see their character and the job they selected
    const createJob = document.createElement('div');
    gameScreen.appendChild(createJob);
    createJob.setAttribute('id', 'theSelectedJob');
    // the following code sets the text under the character to the correct job
    var getAJob = objectArray[whichJobIsSelected];
    const renderWhichJob = document.createElement('h2');
    renderWhichJob.innerHTML = `<h2> ${getAJob}</h2>`;
    createJob.appendChild(renderWhichJob);
    //this adds the character to the screen. The variable 'headJob' has been created at the top of this document
    createJob.appendChild(headJob);
    //this adds the div which holds all the information about the money to the screen. The variable 'showMoney' has been created at the top of this document
    gameScreen.appendChild(showMoney);
    // sets a variable to the correct salary and budget according to the selected job
    const yourSalary = allJobs[getAJob].salary;
    const yourBudget = allJobs[getAJob].budget;
    // creates a div in which the correct salary and budget of the player can be seen
    const salary = document.createElement('div');
    const budget = document.createElement('div');
    salary.setAttribute('id', 'salary');
    budget.setAttribute('id', 'budget');
    showMoney.appendChild(salary);
    showMoney.appendChild(budget);
    salary.innerHTML = `<div><h5> Maandloon: ${yourSalary} </h5></div>`;
    budget.innerHTML = `<div><h5> Spaarrekening: ${yourBudget}</h5></div>`;
    // creates another button which will allow the player to continue after they have seen all the information about their income
    const newButton = document.createElement('button');
    newButton.setAttribute('id', 'continueAfterInformation');
    newButton.setAttribute('class', 'continueButtons');
    showMoney.appendChild(newButton);
    newButton.appendChild(document.createTextNode('Ga door'));

    acceptNewInformation();
};

// this function adds an event listener to the continue made in the previous function
function acceptNewInformation () {
    const continueAfterInfo = document.getElementById('continueAfterInformation');
    continueAfterInfo.addEventListener("click", function() {
        console.log('check');
        renderHobbys();
    });
};

// renders all the hobbies that the players can select in the game
function renderHobbys () {
    // once again runs this function to clean the screen
    cleanseScreen();
    // for each element in the hobby object it will create a button which can be clicked to select a hobby
    for (const [key] of Object.entries(hobbyObject)) {
        const hobby = document.createElement('button');
        hobby.setAttribute('class', "hobbys");
        hobby.innerText = `${key}`;
        gameScreen.appendChild(hobby);
        const hobbyValue = hobbyArray.indexOf(`${key}`);
        hobby.setAttribute('id', hobbyValue);   
    };
    //creates another continue button to go to the next screen after the player has selected a couple of hobbies
    const vervolgKnop = document.createElement('button');
    vervolgKnop.setAttribute('id', 'continueWithHobbys');
    vervolgKnop.setAttribute('class', 'continueButtons');
    gameScreen.appendChild(vervolgKnop);
    vervolgKnop.appendChild(document.createTextNode('Ga door'));

    clickOnHobbys();
    verderNaHobbys();
};

// this funcion allows a hobby to be selected through a click on that button
function clickOnHobbys() {
    //the next three lines adds an event listener to all the hobby buttons, so that all the hobbies can be selected 
    const clickedTheHobby = document.querySelectorAll('.hobbys');
    clickedTheHobby.forEach(function(button) {
        button.addEventListener("click", function() {
            // gets the id of the button, so the correct hobby can be selected and pushed into the hobby array
            const id = this.getAttribute('id');
            const pushHobby = hobbyArray[id];
            // if the hobby that has been clicked on is already in the hobby array, which has been defined at the start of this document, then it will be deleted from this array
            // if the hobby isn't in the hobby array it will be added to the array
            if (selectedHobbies.includes(pushHobby)) {
                const deleteHobby = selectedHobbies.indexOf(pushHobby);
                selectedHobbies.splice(deleteHobby, 1);
            } else {
                selectedHobbies.push(pushHobby);  
            };
            changeColour();
        });
    });
};

// this function is called when a hobby is clicked on and will change the color of this hobby button
function changeColour() {
    // for each key in the hobby object it will check if it is in the hobby array with all the selected hobbies
    for (const [key] of Object.entries(hobbyObject)) {
        // this variable grabs all the elements by their index
        const whichHobby = document.getElementById(hobbyArray.indexOf(key));
        // next it checks if the element is in the array of the hobbies that have been selected
        // whether it is or isn't in the array it will set the class to the correct class which is either 'hobbysSelected' or 'hobbys'
        if (selectedHobbies.includes(key)){
            whichHobby.setAttribute('class', 'hobbysSelected');
        } else {
            whichHobby.setAttribute('class', 'hobbys');
        };
    };
};

// this adds and event listener to the continue button, to allow players to continue to the next screen
function verderNaHobbys() {
    const verderGaan = document.getElementById('continueWithHobbys');
    verderGaan.addEventListener("click", function() {
        // first the function checks if there is at least 1 hobby selected, considering we want the player to select at least 1 hobby
        if (selectedHobbies.length >= 1) {
            goToHouses();
            // if there is at least 1 hobby selected it will push the expenses of this hobby to the outcome array, which has been created in the beginning of this document
            for (let b = 0; b < selectedHobbies.length ; b++) {
                let thisHobby = selectedHobbies[b];
                let pushHobby = hobbyObject[thisHobby].kosten;
                allOutcome.push(pushHobby);
            };
        } else {
            // if there aren't enough hobbies selected the player will get an alert which tells them to select more hobbies
            alert("Selecteer minimaal 1 hobby");
        };
    });
};

function goToHouses() {
    // once again runs this function to clean the screen
    cleanseScreen();
    //grabs the div which was created in the html index file and puts it in the correct screen
    gameScreen.appendChild(inputLocation);
    //by changing the id its style gets changed, so that the players can actually see the element
    inputLocation.setAttribute('id', 'showLocations');

    let k = 4;
    // for each house in the object array it will render it on the screen
    for (const [key] of Object.entries(houseObject)) {
        // variables l and k have been created to change the flex order, to make sure the elements get displayed in the correct order
        let l = k - 1; 
        // this part creates a div for each house and adds the correct information and text inside the house
        const createHouse = document.createElement('div');
        createHouse.setAttribute('class', 'selectAHouse');
        gameScreen.appendChild(createHouse);
        const createText = document.createElement('h4');
        createText.setAttribute('id', 'houseName');
        gameScreen.appendChild(createText);
        createText.innerText = `${key}`;
        // this uses the previously made variables of k and l to change the order of each div
        createHouse.style.order = k;
        createText.style.order = l;
        // next a button is created to select a house, this button is added above all the previously made divs because of the use of the l variable
        const selectHouse = document.createElement('button');
        selectHouse.appendChild(document.createTextNode('Selecteer huis ->'));
        gameScreen.appendChild(selectHouse);
        selectHouse.setAttribute('id', key);
        selectHouse.setAttribute('class', 'HouseSelection');
        selectHouse.style.order = l;
        // the k variable gets increased by 1 after each loop, to allow the next loop to be created under the div that has just been made
        k ++;
        console.log(selectHouse.id);
    };
    checkOutHouse();
};

// this adds an event listener to each select button which is above the house divs to allow the players to select 1 house
function checkOutHouse() {
    // the following three lines add an event listener to all the selection buttons
    const whichHouseSelected = document.querySelectorAll('.HouseSelection');
    whichHouseSelected.forEach(function(button) {
        button.addEventListener('click', function() {
            // this grabs the id of the clicked button to be able to get the correct house that has been selected
            clickedOnHouse = this.getAttribute('id');
            console.log(clickedOnHouse);
            confirmationDialog();
        });
    });
};

// this shows a dialog which will ask the player if they want to select this house, to make sure they don't make any mistakes or click to quickly
function confirmationDialog() {
    selectDialog.showModal();
    enableButtons();
};

// this adds an event listener to the buttons inside the confirmation dialog
function enableButtons() {
    // grabs the yes button from the dialog
    const yesButton = document.getElementById('jaHuis');
    // adds an event listener to the yes button to allow the player to actually select a house after double confirmation
    yesButton.addEventListener('click', function() {
        continueAfterHouse();
    });
    // grabs the no button from the dialog
    const noButton = document.getElementById('neeHuis');
    // adds an event listener to the no button to allow the player to return to the house selection screen in case they want to select a different house
    noButton.addEventListener('click', function () {
        selectDialog.close();
    });
};

//this function checks if the player has put a location inside the selection div at the top of the screen
function continueAfterHouse() {
    // if they haven't selected a location, the player needs to return to the selection screen to do this
    if (inputSelect.value === "") {
        alert ('Selecteer een locatie');
    } else {
        // when a location has been selected the rent of this house will be pushed into the expenses array
        const thisHouse = houseObject[clickedOnHouse].huurkosten;
        allOutcome.push(thisHouse);
        console.log(thisHouse);
        console.log(inputSelect.value);
        selectDialog.close();
        overview();
    };
};

//this renders the last screen of the game which is an overview of all the things the player has to pay for each month 
function overview() {
    // once again runs this function to clean the screen
    cleanseScreen();
    // this renders the character of the player and the job they have selected
    const createJob = document.createElement('div');
    gameScreen.appendChild(createJob);
    createJob.setAttribute('id', 'theSelectedJob')
    var getAJob = objectArray[whichJobIsSelected];
    const renderWhichJob = document.createElement('h2');
    renderWhichJob.innerHTML = `<h2> ${getAJob}</h2>`;
    // adds both the job and the character of the player to the screen
    createJob.appendChild(renderWhichJob);
    createJob.appendChild(headJob);
    // clears the div in which the player can see the money, seeing as it had been used during the previous overview after the player had selected a job
    showMoney.innerHTML = "";
    gameScreen.appendChild(showMoney);
    // creates a div in which the correct salary and budget of the player can be seen (same as in the previous overview)
    const salary = document.createElement('div');
    const budget = document.createElement('div');
    salary.setAttribute('id', 'salary');
    budget.setAttribute('id', 'budget');
    gameScreen.appendChild(salary);
    gameScreen.appendChild(budget);
    salary.innerHTML = `<div><h3> Maandloon: ${allIncome[0]} </h3></div>`;
    budget.innerHTML = `<div><h3> Spaarrekening: ${allIncome[1]}</h3></div>`;
    // this adds a div in which the player can see all their expenses 
    const allOutcomeDiv = document.createElement('div');
    allOutcomeDiv.setAttribute('id', 'overviewOutcome');
    gameScreen.appendChild(allOutcomeDiv);
    // this for loop adds a list of expenses according to a category the allCostsEnd array has been made at the start of this document with set categories
    for (let p = 0; p < allCostsEnd.length; p+=2){
        // each category will get their own div with a heading and a button to expand the div and get more information on their expenses
        const showMinusMoney = document.createElement('div');
        const endHeading = document.createElement('h4');
        const openDialog = document.createElement('button');
        // this sets these created elements to the correct class and id
        showMinusMoney.setAttribute('class', 'allOutcomes');
        showMinusMoney.setAttribute('id', allCostsEnd[p+1]);
        openDialog.setAttribute('class', 'openOutcomeDialogs');
        openDialog.setAttribute('id', allCostsEnd[p+1]);
        // sets the text of the button to an 'arrow' < 
        openDialog.innerHTML = "<h4 id='textButton'> < </h4>"
        // this adds all elements to the screen for the player to see them
        showMinusMoney.appendChild(endHeading);        
        showMinusMoney.appendChild(openDialog);
        showMoney.appendChild(showMinusMoney);
        console.log(openDialog.id);
        // sets the text of the heading to the correct category
        endHeading.innerText = `${allCostsEnd[p]}: `;
        // this adds a div which can be seen when the player expands the div of all the expense categories
        const extraInformation = document.createElement('div');
        extraInformation.setAttribute('class', 'toggledDiv');
        extraInformation.setAttribute('id', allCostsEnd[p+1]);
        extraInformation.innerText = "test";
        showMinusMoney.appendChild(extraInformation);
    };
    openOutcomeDialog();
};

// this adds an event listener to the button which will be able to expand the expense categorie divs
function openOutcomeDialog() {
    // this adds an event listener to all the buttons which can expand the expenses
    const getDialogs = document.querySelectorAll('.openOutcomeDialogs');
    getDialogs.forEach(function(button){
        button.addEventListener("click", function() {
            // this gets the class of the clicked button and sets the style of the previous element, which is the div that can be expanded, to a certain style
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            // if the expenses are already opened, it will close this extra div
            // if the expenses aren't open, it will expand the overview
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
        });
    });
};

//this function will remove all the elements inside the game div, to render new things into the screen
function cleanseScreen() {
    gameScreen.innerHTML = "<div> </div>";
};