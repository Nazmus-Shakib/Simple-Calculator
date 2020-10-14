function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText = num;
}
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText = num;
	}
	else{
		document.getElementById("output-value").innerText = getFormattedNumber(num);
	}	
}
// to add comma in output
function getFormattedNumber(num){
	if(num=="-"){ // to remove negative values using backspace 
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
// to convert output in number
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

let operator = document.getElementsByClassName("operator");
for(let i=0; i<operator.length; i++){
    operator[i].addEventListener("click", function(){
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
			let output = reverseNumberFormat(getOutput()).toString(); // convert number to string
			if(output){//if output has a value
				output = output.substr(0, output.length-1); // remove the last number using substr function
				printOutput(output);
			}
        }
        else{
            let output = getOutput();
            let history = getHistory();
            // to change the last operator of typed number instantly
			if(output=="" && history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
            }
            if(output!="" || history!=""){
				output = output=="" ? output : reverseNumberFormat(output); // turnery operator
                history = history + output;
                // print result
				if(this.id=="="){
					let result = eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history = history + this.id;
					printHistory(history);
					printOutput("");
				}
			}
        }
    })
}
// to print typed numbers
let number = document.getElementsByClassName("number");
for(let i=0; i<number.length; i++){
    number[i].addEventListener("click", function(){
        let output = reverseNumberFormat(getOutput());
        // to print number side by side
        if(output!=NaN){
            output = output + this.id;
            printOutput(output);
        }
    })
}