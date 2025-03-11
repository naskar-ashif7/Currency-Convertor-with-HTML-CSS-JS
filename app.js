const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromVal = document.querySelector(".from select");
const toVal = document.querySelector(".to select");
const msg = document.querySelector(".msg");



// to fetch the optons and append it to the app select button
for (let select of dropDowns) {
      for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
     
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

//Function for update flag as per selected currency
const updateFlag = (ele) =>{
    let currCode = ele.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = newSrc;

}


btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});


//function to updte the currency excnage rate as per defualt setting from begining...
const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal ==="" || amtVal < 1 ){
        amtVal = 1;
        amount.value = "1";
    }
    
    
    let URL = `${BASE_URL}/${fromVal.value.toLowerCase()}.json`;
    let response = await fetch (URL);
    let data = await response.json(); 
    let rate = data[fromVal.value.toLowerCase()][toVal.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amount.value} ${fromVal.value} = ${finalAmount} ${toVal.value}`;
    };
 
window.addEventListener("load", ()=>{
    updateExchangeRate();
})


