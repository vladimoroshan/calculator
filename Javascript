
var operators = ['-', '+', '×', '÷'],        
    decimalCheck = false,
    equation = document.getElementById("equation"),
    allButtons = document.querySelector("#buttons"); 
    allButtons.addEventListener("click", eventHandler, false); 

function eventHandler(e) {          
      document.getElementById("clear").onclick = function() { //When press x button;    
        equation.innerHTML = equation.innerHTML.slice(0,-1);
        if(equation.innerHTML.length < 1) clear();
    }      
   
   if(e.target !== e.currentTarget) {
         function clear() { //Add "0" to the screen...;
           equation.innerHTML = "0"; 
           equation.style.fontSize = "40px";           
           decimalCheck = false;          
         };  
     
        function checkLength(displayLength) {
        if(displayLength > 11) { // if long equation make font smaller;
             equation.style.fontSize = "20px";
           }
           if(displayLength > 22) { //clear display and make font bigger;
             clear();
             equation.style.fontSize = "40px";             
           }  
        }
     
         var inputVal = e.target.innerHTML; //get button value;
        checkLength(equation.innerHTML.length); // every time when was pressed button              
              
         if(equation.innerHTML == "0" && e.target.innerHTML !=="." ){         
          equation.innerHTML = ""; //If press ".", "0" remaining, otherwise "0" remove;      
        }          
     
         if(inputVal == "C") {// invocation funct when "C" button press 
           clear();
         }

         else if(inputVal == "=") {
           try { //Here is all count up. RegExp for divide and multiply
             var result = eval(equation.innerHTML.replace(/×/g, '*').replace(/÷/g, '/'));
                    
             if(!(/[a-zA-Z]$/.test(result))){ //force major situation(infinity, undefined etc.);               
               equation.innerHTML = Math.round(result * 100)/100; //deal with floating point number precision;
               checkLength(equation.innerHTML.length);
             } else {
             clear();
             decimalCheck = false;
             }
           } catch (e) {    
             clear();
           }        
         }
          
         else if(operators.indexOf(inputVal) > -1) {                      
           var lastChar = equation.innerHTML[equation.innerHTML.length - 1];
           
           	if(equation.innerHTML != '' && operators.indexOf(lastChar) ==-1) 
            equation.innerHTML += inputVal;
            // add "-" to the clean screen
            if(equation.innerHTML == '' && inputVal == '-') equation.innerHTML += inputVal; 
			  
           if(operators.indexOf(lastChar) > -1 && equation.innerHTML.length > 1) {
             equation.innerHTML = equation.innerHTML.replace(/.$/, inputVal);//if ".+-/*" pressed twice, 
           } // replace last chart
           decimalCheck = false;
         }
      
         else if(inputVal == '.') {
           if(!decimalCheck) { //prevent from add dot more then once;
             equation.innerHTML += inputVal;
             decimalCheck = true;
           }
         }
     
         else {
           equation.innerHTML += inputVal;
         }
   }
  e.preventDefault();    
} 
