const startGame = document.getElementById('start_game');
let fadeState = true;
const gameScreen = document.querySelector('.hidden');
const visibleGameScreen = document.querySelector('.visible');

const selectDialog = document.querySelector('dialog');
const inputLocation = document.getElementById('pickLocation');

const allCostsEnd = ["Vaste lasten", 'vasteLasten', "Variabele lasten", 'variabeleLasten', "Hobby's", 'hobbyLasten'];

const inputSelect = document.getElementById('locations');

let clickedOnHouse = "";

let whichJobIsSelected = "";

const selectedHobbies = [];

const allIncome = [];
const vastUitkomst = [];
const variabeleUitkomst = ['€'];
const hobbyKosten = [];

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
const objectArray = Object.getOwnPropertyNames(allJobs);  

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
    }};

const hobbyArray = Object.getOwnPropertyNames(hobbyObject);  

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

const houseArray = Object.getOwnPropertyNames(houseObject);

startGame.addEventListener("click", function() {
    startGame.remove();
    fader();
});

function fader() {
    if (fadeState === true) {
        gameScreen.setAttribute("class", "visible");
        fadeState = false;
        renderJobs();
    } else {
        console.log("fail");
    }
}

function renderJobs () {
    let i = 2;
    let j = 2;    
    for (const [key] of Object.entries(allJobs)) {
        const Job = document.createElement('button');
        Job.setAttribute('class', "Jobs");
        Job.innerText = `${key}`;
        gameScreen.appendChild(Job);
        const keyValue = objectArray.indexOf(`${key}`);
        Job.setAttribute('id', keyValue);   
        if (`${key}` === objectArray[3]) {
            i+=5;
            j = 2;
        }
        Job.style.gridArea = `${i} / ${j} / span 3 / span 2`;
        j +=3;
    }
    selectJob();
};


function selectJob() {
    const jobsButtons = document.querySelectorAll('.Jobs');
    jobsButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const getID = button.getAttribute('id');
            whichJobIsSelected = getID;
            yourJob(getID);
        })
    })
}

function yourJob(selectedJob) {
    const resetArray = ['0', '1', '2', '3', '4', '5']
    for (let k = 0; k <resetArray.length; k++){
        const resetWithID = document.getElementById(k);
        resetWithID.style.backgroundColor = '#bf0042';
    };
    const currentJob = document.getElementById(selectedJob);
    currentJob.style.backgroundColor = '#91c611';
    const jobIsSelected = document.getElementById('continueWithAJob');
    if (jobIsSelected) {
        jobIsSelected.remove();
    }
    const continueButton = document.createElement('button');
    continueButton.setAttribute('id', 'continueWithAJob');
    continueButton.setAttribute('class', 'continueButtons');
    gameScreen.appendChild(continueButton);
    continueButton.appendChild(document.createTextNode('ga verder'));
    acceptJob();
}

function acceptJob() {
    const jobIsSelected = document.getElementById('continueWithAJob');
    jobIsSelected.addEventListener("click", function() {
        console.log(whichJobIsSelected);
        const yourJob = objectArray[whichJobIsSelected];
        console.log(yourJob);
        const pushToincome = allJobs[yourJob].salary;
        const pushBudget = allJobs[yourJob].budget;
        allIncome.push(pushToincome);
        allIncome.push(pushBudget);
        console.log(allIncome);
        console.log(pushToincome);
        renderYourJob();
    })
}

function renderYourJob() {
    cleanseScreen();

    const createJob = document.createElement('div');
    gameScreen.appendChild(createJob);
    createJob.setAttribute('class', 'Jobs');
    var getAJob = objectArray[whichJobIsSelected];
    const renderWhichJob = document.createElement('h2');
    renderWhichJob.innerHTML = `<h2> ${getAJob}</h2>`;
    createJob.appendChild(renderWhichJob);
    createJob.style.gridArea = "3 / 5 / span 3 / span 2";

    const yourSalary = allJobs[getAJob].salary;
    const yourBudget = allJobs[getAJob].budget;

    const salary = document.createElement('div');
    const budget = document.createElement('div');
    salary.setAttribute('id', 'salary');
    budget.setAttribute('id', 'budget');
    gameScreen.appendChild(salary);
    gameScreen.appendChild(budget);
    salary.style.gridArea = "8 / 2 / span 1 / span 4";
    budget.style.gridArea = "8 / 6 / span 1 / span 4";
    salary.innerHTML = `<div><h3> Maandloon: ${yourSalary} </h3></div>`;
    budget.innerHTML = `<div><h3> Spaarrekening: ${yourBudget}</h3></div>`;

    const newButton = document.createElement('button');
    newButton.setAttribute('id', 'continueAfterInformation');
    newButton.setAttribute('class', 'continueButtons');
    gameScreen.appendChild(newButton);
    newButton.appendChild(document.createTextNode('ga verder'));

    acceptNewInformation();
}

function acceptNewInformation () {
    const continueAfterInfo = document.getElementById('continueAfterInformation');
    continueAfterInfo.addEventListener("click", function() {
        console.log('check');
        renderHobbys();
    })
}

function renderHobbys () {
    cleanseScreen();

    let i = 2;
    let j = 2;    
    for (const [key] of Object.entries(hobbyObject)) {
        const hobby = document.createElement('button');
        hobby.setAttribute('class', "hobbys");
        hobby.innerText = `${key}`;
        gameScreen.appendChild(hobby);
        const hobbyValue = hobbyArray.indexOf(`${key}`);
        hobby.setAttribute('id', hobbyValue);   
        if (`${key}` === hobbyArray[4]) {
            i+=3;
            j = 2;
        } else if (`${key}` === hobbyArray[8]) {
            i += 3;
            j = 2;
        }
        hobby.style.gridArea = `${i} / ${j} / span 2 / span 1`;
        j +=2;
    }

    const hobbyList = document.createElement('div');
    hobbyList.setAttribute('id', 'hobbyList');
    gameScreen.appendChild(hobbyList);

    const vervolgKnop = document.createElement('button');
    vervolgKnop.setAttribute('id', 'continueWithHobbys');
    vervolgKnop.setAttribute('class', 'continueButtons');
    gameScreen.appendChild(vervolgKnop);
    vervolgKnop.appendChild(document.createTextNode('ga verder'));
    
    renderHobbyList();
    clickOnHobbys();
    verderNaHobbys();
}

function renderHobbyList() {
    hobbyList.innerHTML = "<div><h3>Jouw Hobby's</h3></div>";
    const makeList = document.createElement('ul');
    hobbyList.appendChild(makeList);
    makeList.setAttribute('id', 'yourHobbyList');

    for (let o = 0; o < selectedHobbies.length; o++){
        const addHobby = document.createElement('li');
        addHobby.setAttribute('id', o);
        addHobby.innerText = selectedHobbies[o];
        makeList.appendChild(addHobby);
        console.log(addHobby.id);
    }
}

function verderNaHobbys() {
    const verderGaan = document.getElementById('continueWithHobbys');
    verderGaan.addEventListener("click", function() {
        if (selectedHobbies.length >= 1) {
            goToHouses();
            for (let b = 0; b < selectedHobbies.length ; b++) {
                let thisHobby = selectedHobbies[b];
                console.log(thisHobby);
                let pushHobby = hobbyObject[thisHobby].kosten;
                allOutcome.push(pushHobby);
                console.log(allOutcome);
            }
        } else {
            alert("Selecteer minimaal 1 hobby");
        }
    });
}

function clickOnHobbys() {
    const clickedTheHobby = document.querySelectorAll('.hobbys');
    clickedTheHobby.forEach(function(button) {
        button.addEventListener("click", function() {
            const id = this.getAttribute('id');
            const pushHobby = hobbyArray[id];
            if (selectedHobbies.includes(pushHobby)) {
                const deleteHobby = selectedHobbies.indexOf(pushHobby);
                selectedHobbies.splice(deleteHobby, 1);
            } else {
                selectedHobbies.push(pushHobby);  
            }
            renderHobbyList();
            changeColour();
        })
    })
};

function changeColour() {
    for (const [key] of Object.entries(hobbyObject)) {
        const whichHobby = document.getElementById(hobbyArray.indexOf(key));
        if (selectedHobbies.includes(key)){
            whichHobby.setAttribute('class', 'hobbysSelected');
        } else {
            whichHobby.setAttribute('class', 'hobbys');
        }
    }
};

function goToHouses() {
    cleanseScreen();

    const selectLocation = document.createElement('div');
    selectLocation.setAttribute('id', 'chooseLocation');
    gameScreen.appendChild(selectLocation);
    // selectLocation.innerHTML = "<select id='locations'><option name='Sneek'>Sneek</option><option name='Leeuwarden'>Leeuwarden</option><option name='Drachten'>Drachten</option><option name='Franeker'>Franeker</option><option name='Balk'>Balk</option><option name='Heerenveen'>Heerenveen</option></select>"
    gameScreen.appendChild(inputLocation);
    inputLocation.setAttribute('id', 'showLocations');

    let k = 4;
    let l = 2;
    for (const [key] of Object.entries(houseObject)) {
        const createHouse = document.createElement('div');
        createHouse.setAttribute('class', 'selectAHouse');
        gameScreen.appendChild(createHouse);
        createHouse.innerText = `${key}`;
        createHouse.style.gridArea = `${k} / ${l} / span 3 / span 3`;

        const selectHouse = document.createElement('button');
        selectHouse.appendChild(document.createTextNode('->'));
        gameScreen.appendChild(selectHouse);
        selectHouse.setAttribute('id', key);
        selectHouse.setAttribute('class', 'HouseSelection');
        selectHouse.style.gridArea = `${k} / ${l + 3} / span 1 / span 1`;
        k += 4;
        console.log(selectHouse.id);
    }
    checkOutHouse();
};

function checkOutHouse() {
    const whichHouseSelected = document.querySelectorAll('.HouseSelection');
    whichHouseSelected.forEach(function(button) {
        button.addEventListener('click', function() {
            clickedOnHouse = this.getAttribute('id');
            console.log(clickedOnHouse);
            confirmationDialog();
        });
    });
};

function confirmationDialog() {
    selectDialog.showModal();
    enableButtons();
};

function enableButtons() {
    const yesButton = document.getElementById('jaHuis');
    yesButton.addEventListener('click', function() {
        continueAfterHouse();
    });
    const noButton = document.getElementById('neeHuis');
    noButton.addEventListener('click', function () {
        selectDialog.close();
    });
};

function continueAfterHouse() {
    if (inputSelect.value === "") {
        alert ('Selecteer een locatie');
    } else {
        const thisHouse = houseObject[clickedOnHouse].huurkosten;
        allOutcome.push(thisHouse);
        console.log(thisHouse);
        console.log(inputSelect.value);
        selectDialog.close();
        overview();
    }
};

function overview() {
    cleanseScreen();
    
    const endJob = document.createElement('div');
    endJob.setAttribute('id', 'yourJob');
    gameScreen.appendChild(endJob);

    const salary = document.createElement('div');
    const budget = document.createElement('div');
    salary.setAttribute('id', 'salary');
    budget.setAttribute('id', 'budget');
    gameScreen.appendChild(salary);
    gameScreen.appendChild(budget);
    salary.style.gridArea = "4 / 2 / span 1 / span 4";
    budget.style.gridArea = "4 / 6 / span 1 / span 4";
    salary.innerHTML = `<div><h3> Maandloon: ${allIncome[0]} </h3></div>`;
    budget.innerHTML = `<div><h3> Spaarrekening: ${allIncome[1]}</h3></div>`;

    const allOutcomeDiv = document.createElement('div');
    allOutcomeDiv.setAttribute('id', 'overviewOutcome');
    gameScreen.appendChild(allOutcomeDiv);

    let a = 7;

    for (let p = 0; p < allCostsEnd.length; p+=2){
        const showMinusMoney = document.createElement('div');
        const endHeading = document.createElement('h4');
        showMinusMoney.setAttribute('class', 'allOutcomes');
        showMinusMoney.setAttribute('id', allCostsEnd[p+1]);
        gameScreen.appendChild(showMinusMoney);
        showMinusMoney.appendChild(endHeading);
        endHeading.innerText = `${allCostsEnd[p]}: `
        showMinusMoney.style.gridArea = `${a} / 2 / span 2 / span 8`;
        a += 3;
    };
}

// function showSelectedHouse (whichHouse) {
//     cleanseScreen();

//     const getAHouse = document.createElement('div');
//     getAHouse.setAttribute('class', 'thisHouse');
//     gameScreen.appendChild(getAHouse);

// };

function cleanseScreen() {
    gameScreen.innerHTML = "<div> </div>";
};