import { fadeIn } from "./functions.js";

let xp = 0;
let hp = 100;
let gold = 50;
let currentWeapon = 0;
let monsterHealth;
let monsterNAME;
let monsterLevel;
let currentMonster;
let inventory = ["stick"];

const playerXP = document.getElementById("playerXP");
const playerHP = document.getElementById("playerHP");
const playerGold = document.getElementById("playerGold");
const gameControls = document.getElementById("gameControls");
const gameControl1 = document.getElementById("gameControl1");
const gameControl2 = document.getElementById("gameControl2");
const gameControl3 = document.getElementById("gameControl3");
const gameControl4 = document.createElement("button");
const monsterStats = document.getElementById("monsterStats");
const monsterName = document.getElementById("monsterName");
const monsterHP = document.getElementById("monsterHP");
const rpgText = document.getElementById("rpgText");

const locations = [
    {
        name: "town square",
        btnTexts: ["Go to store", "Go to cave", "Challenge the dragon"],
        btnFunctions: [goStore, goCave, challengeDragon],
        text: "you are currently in the time square."
    },
    {
        name: "store",
        btnTexts: ["Buy 10HP (10 Gold)", "Buy new weapon (30 Gold)", "Go back to town square"],
        btnFunctions: [buyHP, buyWeapon, () => {gameControl4.remove(); goTown();}], //so it removes the gambling button when we leave the store
        text: "You are currently in the store."
    },
    {
        name: "cave",
        btnTexts: ["Fight Slime", "Fight Goblin", "Go back to town square"],
        btnFunctions: [fightSlime , fightGoblin , goTown],
        text: "You are currently in the cave."
    },
    {
        name: "fight",
        btnTexts: ["Attack", "Dodge", "Run away"],
        btnFunctions: [attack, dodge, runAway],
        text: "You are currently in a fight."
    },
    {
        name: "lose",
        btnTexts: ["RESTART?", "RESTART?", "RESTART?"],
        btnFunctions: [restart, restart, restart],
        text: "You have fallen..."
    },
    {
        name: "win",
        btnTexts: ["Replay?", "Replay?", "Replay?"],
        btnFunctions: [restart, restart, restart],
        text: "You have finished the game. Congrats!"
    },
    {
        name: "monster defeated",
        btnTexts: ["Continue exploring", "Go back to town square", "Go to store"],
        btnFunctions: [goCave, goTown, goStore],
        text: "You have defeated the monster!"
    },
    {
        name: "gambling",
        btnTexts: ["10 Gold", "All in", "Go back to store"],
        btnFunctions: [gambleTenGold, gambleAllIn, goStore],
        text: "You have a 50% chance of winning double the money you bet.\nWill you bet 10 Gold or go all in?"
    }
];

const monsters = [
    {
        name: "Slime",
        level: 2,
        HP: 30
    },
    {
        name: "Goblin",
        level: 8,
        HP: 80
    },
    {
        name: "Dragon",
        level: 20,
        HP: 300
    }
];

const weapons = [
    {
        name: "stick",
        damage: 5
    },
    {
        name: "dagger",
        damage: 10
    },
    {
        name: "short-sword",
        damage: 25
    },
    {
        name: "battle-axe",
        damage: 40
    },
    {
        name: "spear",
        damage: 50
    },
    {
        name: "sword",
        damage: 100
    }
];


function update(location){
    const params = locations.find(loc => loc.name === location);

    gameControl1.innerText = params.btnTexts[0];
    gameControl2.innerText = params.btnTexts[1];
    gameControl3.innerText = params.btnTexts[2];

    gameControl1.onclick = params.btnFunctions[0];
    gameControl2.onclick = params.btnFunctions[1];
    gameControl3.onclick = params.btnFunctions[2];

    rpgText.innerText = params.text;

}

function goTown(){
    update("town square")
}

function goStore(){
    update("store");

    gameControl4.textContent = "Gambling";
    gameControl4.onclick = ()=>{

        gambling();
        gameControl4.remove();
        
    };

    gameControls.appendChild(gameControl4);
    
}

function buyWeapon(){

    if(currentWeapon < weapons.length - 1){
        if(gold >= 30){

            gold -= 30;
            playerGold.innerText = gold;

            inventory.push(weapons[currentWeapon + 1].name);
            currentWeapon++;

            rpgText.innerText = "Thank you for your purchase of " + weapons[currentWeapon].name + "\nYour inventory: " + inventory;

        }else{

            rpgText.innerText = "You do not have enough gold to purchase a new weapon.";

        }  

    }else{
        rpgText.innerText = "You already have the strongest weapon.\nYou may sell your older weapons for 15 Gold each.";

        gameControl2.innerText = "Sell old weapon (15 Gold)";
        gameControl2.onclick = sellWeapon;

    }

}

function sellWeapon(){
    if(inventory.length > 1){

        const soldWeapon = inventory.shift();
        gold += 15;

        playerGold.innerText = gold;
        rpgText.innerText = soldWeapon.name + "was sold.\nYour current inventory: " + inventory;

    }else{
        rpgText.innerText = "You can't sell your only weapon.";
    }
}

function buyHP(){

    if(gold >= 10){
        
        gold -= 10;
        hp += 10;

        playerGold.innerText = gold;
        playerHP.innerText = hp;

        rpgText.innerText = "Thank you for your purchase of 10HP.";

    }else{

        rpgText.innerText = "You do not have enough gold to purchase 10HP.";
    
    }
}

function gambling(){
    update("gambling");
}

function gambleTenGold(){

    if(gold >= 10){

        if(Math.round(Math.random())){

            gold += 10;
            playerGold.innerText = gold;

            rpgText.innerText = "You Won!\nYour 10 Golds have been returned with an additional 10 Golds.";

        }else{

            gold -= 10;
            playerGold.innerText = gold;

            rpgText.innerText = "You Lose!\nYou lost your 10 Golds.\nBetter luck next time.";

        }
    }else{

        rpgText.innerText = "You don't have enough Gold.";
    }
}

function gambleAllIn(){

    if(gold > 0){

        if(Math.round(Math.random())){

            gold += gold;
            playerGold.innerText = gold;

            rpgText.innerText = "You Won!\nYour Golds have been doubled.";

        }else{

            gold = 0;
            playerGold.innerText = gold;

            rpgText.innerText = "You Lose!\nYou lost all your Golds.\nBetter luck next time.";

        }
    }else{

        rpgText.innerText = "You don't even have 1 Gold.";
    }
}

function goCave(){
    update("cave");
}

function goFight(monster){

    update("fight");

    currentMonster = monsters.find(monst => monst.name === monster);

    monsterNAME = currentMonster.name;
    monsterHealth = currentMonster.HP;
    monsterLevel = currentMonster.level;

    monsterHP.innerText = monsterHealth;
    monsterName.innerText = monsterNAME;

    monsterStats.style.display = "block";

}

function challengeDragon(){
    goFight("Dragon");
}

function fightSlime(){
    goFight("Slime");
}

function fightGoblin(){
    goFight("Goblin")
}

function attack(){

    if(Math.random() > 0.2 || hp < 20){ //chance to fail a hit if neither condition is met

        let damageDealtByPlayer = (weapons[currentWeapon].damage) + (Math.floor(Math.random() * xp ) + 1 );
        monsterHealth -= damageDealtByPlayer;
        monsterHP.innerText = monsterHealth;
        rpgText.innerText = "You hit the " + monsterNAME + " for -" + damageDealtByPlayer + "HP";

    }else{

        rpgText.innerText = "You missed your attack!";
    }

    if(monsterHealth <= 0){

        monsterStats.style.display = "none";

        if(monsterNAME == "Dragon"){
  
            win();
        
        }else{

            monsterDefeated();
        }

    }else{

        if(Math.random() > 0.2){

            let damageDealtByMonster = (monsterLevel * 5) - (Math.floor(Math.random() * xp));

            hp -= damageDealtByMonster;
            playerHP.innerText = hp;

            rpgText.innerText += "\n" + monsterNAME + " hits you for -" + damageDealtByMonster + "HP";

            if(hp <= 0){

                monsterStats.style.display = "none";
                lose();

            }

        }else{

            rpgText.innerText += "\n" + monsterNAME + " missed his attack!";
        }

        
    }
}

function dodge(){
    rpgText.innerText = "You dodged the " + monsterNAME +"'s attack.";
}

function runAway(){

    monsterStats.style.display = "none";
    goTown();
}

function win(){
    update("win");
}

function monsterDefeated(){
    xp += monsterLevel;
    gold += 5 * monsterLevel;

    playerXP.innerText = xp;
    playerGold.innerText = gold;

    update("monster defeated");
}

function lose(){
    update("lose")
}

function restart(){
    xp = 0;
    hp = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];

    playerHP.innerText = hp;
    playerXP.innerText = xp;
    playerGold.innerText = gold;

    update("town square");
}


document.addEventListener("DOMContentLoaded", () => {

    fadeIn();

    playerXP.innerText = xp;
    playerHP.innerText = hp;
    playerGold.innerText = gold;

    gameControl1.onclick = goStore;
    gameControl2.onclick = goCave;
    gameControl3.onclick = challengeDragon;

})