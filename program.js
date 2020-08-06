//List of DOM Elements 
let elements = {
    main: document.getElementsByClassName("Main")[0],
    buttons: document.querySelectorAll(".ButtonDiv button"),
    itemDisplay: document.getElementById("itemDisplay"),
    total: document.getElementById("total"),
    earnings: document.getElementById("earnings"),
    savings: document.getElementById("savings"),
    finishButtons: document.querySelectorAll(".FinishDiv button"),
}
let totalValue = 0;
function showTotalValue() {
    elements.total.innerText = `$${totalValue}`;

}

//total





//Create ListItem 
function createListItem(name, value) {
    let newItem = document.createElement("span");
    newItem.innerText = `${name}: $${value}`;
    elements.itemDisplay.appendChild(newItem);
    totalValue += parseInt(value);
}

//Delete ListItem 
function deleteListItem(name, value) {
    let items = document.querySelectorAll("#itemDisplay span");
    items.forEach(item => {
        if (item.innerText === `${name}: $${value}`) {
            elements.itemDisplay.removeChild(item);
            totalValue -= parseInt(value);
        }
    });
}


//okCancel Funct
function showPrompt(name, element) {
    let window = document.getElementsByClassName("PromptWindow")[0];
    let billName = document.getElementById("billName");
    let inputCost = document.getElementById("inputCost");
    let promptButtons = document.querySelectorAll(".PromptButtons button");
    window.style.display = "flex";
    billName.innerText = name;

    promptButtons.forEach(button => {
        button.onclick = () => {
            if (button.id === "ok" && inputCost.value !== "") {
                element.value = inputCost.value.toString();
                createListItem(name, parseInt(inputCost.value));
                totalValue + parseInt(inputCost.value);
                showTotalValue();
                window.style.display = "none";
            } else {
                elements.buttons.forEach(button => {
                    if (button.innerText === name) {
                        button.style.backgroundColor = "";
                    }
                });
                window.style.display = "none";
            }
        }
    });

}

//Iterate through buttons 
function buttonFunct() {
    let buttons = elements.buttons;
    buttons.forEach(button => {

        button.onclick = () => {
            if (button.style.backgroundColor === "") {
                button.style.backgroundColor = "orange";
                if (button.innerText === "Light" || button.innerText === "CCard" || button.innerText === "Misc") {

                    showPrompt(button.innerText, button)
                } else {
                    createListItem(button.innerText, button.value);
                }

            } else {
                button.style.backgroundColor = "";
                deleteListItem(button.innerText, button.value)
            }
            showTotalValue();
        }


    });
}

buttonFunct();
billLinks(); 

// CANVAS
// function linksCanvas(){
//     let canvas = document.getElementById("linksCanvas"); 
//     let ctx = canvas.getContext("2d"); 
//     ctx.drawImage(Image("pics\icons8-hamburger-100.pn"), 10, 10); 

// }
// linksCanvas(); 

//DONE AND REFRESH

function finishButtons() {
    elements.finishButtons.forEach(button => {
        button.onclick = () => {
            if (button.id === "done") {
                let savings = parseInt(elements.savings.value);
                let earnings = parseInt(elements.earnings.value);
                if (elements.savings.value != "" && elements.earnings.value != "") {
                    let prompt = new DonePrompt(totalValue, savings, earnings, elements.main);
                    prompt.donePrompt();
                } else {
                    alert("Please include paid and savings values!")
                }

            } else {
                window.location.reload();
            }
        }
    });
}
finishButtons();

//DONE PROMPT 


class DonePrompt {
    constructor(total, savings, earnings, div) {
        this.total = total;
        this.savings = savings;
        this.earnings = earnings;
        this.div = div;
    }

    donePrompt() {
        let prompt = document.createElement("div");
        prompt.id = "doneWindow";
        prompt.innerHTML = ` <a id="closeX"><img src="pics/icons8-x-100.png"></a>
        <h1>Allocate Money</h1>
        <div id="listofTotals">
            <span>EARNINGS: $${this.earnings}</span>
            <span>BILLS: $${this.total}</span>
            <span>SAVINGS: $${this.savings}</span>
            <span id="leisure">LEISURE: $${(this.earnings - this.total - this.savings)}</span>
        </div>`
        this.div.appendChild(prompt);
        closeX();
    }


}

function closeX() {
    let x = document.getElementById('closeX');
    x.onclick = () => {
        x.parentNode.style.display = 'none';
        window.location.reload();
    }
};


function billLinks() {
    let links = document.querySelectorAll('#linksCanvas img');
    links.forEach(link => {
        link.onclick = () => {
            switch (link.id) {
                case "food":
                    window.open("https://www.walmart.com/account/login?tid=0&returnUrl=%2F");
                    break;
                case "bank":
                    window.open("https://connect.secure.wellsfargo.com/auth/login/present?origin=cob&LOB=CONS");
                    break;
                case "card":
                    window.open("https://www.walmart.com/account/login?tid=0&returnUrl=%2F");
                    break;
                case "light":
                    window.open("https://www.duke-energy.com/home");
                    break;
                case "internet":
                    window.open("https://www.spectrum.net/");
                    break;
                case "water":
                    window.open("https://www.invoicecloud.com/portal/(S(u3km05wifoqbph2mw5n5umli))/2/customerlogin.aspx?billerguid=9b142faf-a3b0-4565-9ef2-68f06d93b16c");
                    break;
                case "car":
                    window.open("https://onlinebanking.usbank.com/Auth/Login");
                    break;
                default:
                    break;
            }
        }
    });
}