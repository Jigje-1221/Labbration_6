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
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${food}`)
        const data = await response.json();

        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

//Validation av formuläret
function validateForm (){
    if(search.value.trim() != ""){return true;}
    else{false}
}


form.addEventListener("submit", function(event){
    event.preventDefault();

    if(validateForm()){pickRecipe(search.value);}
})