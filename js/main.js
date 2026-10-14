"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Jingye Chen
 */

//Hämta element från DOM
const form = document.querySelector("#searchform");
const search = document.querySelector("#search");

const error = document.querySelector("#error");
const errorAPI = document.querySelector("#message");
const recipe = document.querySelector("#recipe");

//Hämta recept från dummyjson webbtjänst
async function pickRecipe(food) {
    try{
        //Hämta recept från API
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${food}`)
        
        //Kontrolera om API är tillgänglig
        if(!response.ok){
            throw new Error();
        }

        //Omvandlar data från json till javascript array
        const data = await response.json();

        //Kontrollera om det finns resultat som matchade annas skriva ut felmedelande
        if(validateSearch(data)){
            console.log(true)
            return data[0];
        }
        else{
            console.log(false)
        }
    }
    catch(error){
        errorAPI.innerHTML = "Kunde inte hämta recept.. Försök igen senare";
    }
}

//Validation av formuläret
function validateForm (){
    if(search.value.trim() != ""){return true;}
    else{false}
}

//Skriv ut felet när man fick en tomt formulär
function wirteErrorForm (){
    error.innerHTML = "Du måste fylla i en sökfras!"
}

//Validera så att sköresultat inte är 0
function validateSearch (foods){
    if(foods.recipes.length === 0){return false}
    else{return true}
}



form.addEventListener("submit", function(event){
    event.preventDefault();

    if(validateForm()){
        pickRecipe(search.value);
    }
    else{
        wirteErrorForm()
    };
})