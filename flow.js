var addTotal = 0; 

class BudgetProgram{
    constructor(){
        //BUTTON COMPONENTS
        this.buttonList = document.querySelectorAll(".Main button"); 
        this.itemDisplay = document.getElementById("itemDisplay");
       this.totalSpan = document.getElementById("total"); 
        
       // PROMPT WINDOW COMPONENTS 
     
    //    this.ok = document.getElementById("ok"); 
    //    this.cancel = document.getElementById("cancel"); 
        
    }
     iterateButtons(){
        for (let i = 0; i < this.buttonList.length; i++) {
            const button = this.buttonList[i];
            button.addEventListener('click',()=>{
                if(button.style.backgroundColor === ""){
                    button.style.backgroundColor = "orange"; 
                    if (button.innerText == "Light" || button.innerText == "CCard" || button.innerText == "Misc") {
                        let newWindow = new PromptWindow(button.innerText, this.buttonList);
                        newWindow.showWindow(); 
                        }else{
                            this.createSpan(button.innerText, button.value); 
                        }; 
                 } else if(button.style.backgroundColor = "orange"){
                    this.deleteSpan(button.innerText, button.value); 
                    button.style.backgroundColor = "";
                   
                }
            })
            
        }
    }
    createSpan(name, value){
        let newSpan = document.createElement("span"); 
        newSpan.innerText = `${name} Cost = $${value}`; 
        this.itemDisplay.appendChild(newSpan); 
        addTotal += parseInt(value); 
        console.log(addTotal); 
        this.showTotal();
       
    }
    deleteSpan(name, value){
        let spanList = document.querySelectorAll("#itemDisplay span");
      for (let i = 0; i < spanList.length; i++) {
          const span = spanList[i];
          if (span.innerText === `${name} Cost = $${value}`) {
              this.itemDisplay.removeChild(span); 
              addTotal-= parseInt(value); 
                console.log(addTotal); 
                this.showTotal(); 
                console.log("delete")
          } 
      }
    }
    showTotal(){
        this.totalSpan.innerText = `$${addTotal}`
    }
    
    //THIS FUNCTION IS APPLIED TO THE PROMPT WINDOW 
   

    
}
class PromptWindow extends BudgetProgram{
    constructor(name, buttonList){
        super(buttonList)
        this.name = name;

           // PROMPT WINDOW COMPONENTS 
        this.promptWindow = document.getElementsByClassName("PromptWindow")[0];
        this.bill = document.getElementById("bill"); 
        this.input = document.getElementById("input"); 
        this.choiceButtons = document.querySelectorAll(".PromptWindowChoices button"); 
        this.ok = document.getElementById("ok");
        this.cancel = document.getElementById("cancel"); 
    }
    showWindow(){
        this.promptWindow.style.display = "flex"; 
        this.bill.innerText = this.name; 
        this.ok.onclick = ()=>{
            if(this.input.value != ""){
                this.createSpan(this.name, parseInt(this.input.value)); 
                this.promptWindow.style.display = "none";
            }else{
                alert("Please enter a value"); 
            }
            addTotal + parseInt(this.input.value); 
        }
        this.cancel.onclick = ()=>{
            this.promptWindow.style.display = "none"; 
            for (const button of this.buttonList) {
                if(button.innerText === this.name){
                    button.style.backgroundColor = ""; 
                }
            }
        }    
    }
}

//OKAY AND CANCEL FUNCTIONS 

export 

let budgetProgram = new BudgetProgram(); 
budgetProgram.iterateButtons(); 
