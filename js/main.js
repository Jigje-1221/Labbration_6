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
async function getRecipes(food) {
    try{
        //Hämta recept från API
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${food}`)
        
        //Kontrolera om API är tillgänglig
        if(!response.ok){
            throw new Error();
        }

        //Omvandlar data från json till javascript array
        const data = await response.json();

        //Retunera den första recept av sökfras
        return data;
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

//Kontrollera att sköresultat inte är 0
async function validateSearch (food){
    let data = await getRecipes(food)
    if(data.recipes.length === 0){return false}
    else{return true}
}

function wirteRecipe(recept){
    
    //En array som innerhåller alla element som kommer inkluderas i article
    let elements = []; 

    //Skapa elementer
    let article = document.createElement("article");
    let h3 = document.createElement("h3");
    let img = document.createElement("img");
    let div = document.createElement("div");
    let ingredientsTitle = document.createElement("h4");
    let ingredients = document.createElement("ul");
    let instructionsTitle = document.createElement("h4");
    let instructions = document.createElement("ol");

    //Lägg till element som ska inkluderas i article inom array
    elements.push(h3, img, div, ingredientsTitle, ingredients, instructionsTitle,instructions)

    //Skapa innehåller  för olika element
    h3.textContent = recept.name;
    img.src = recept.image;
    img.alt = recept.name;
    ingredientsTitle.textContent = "Ingredients";
    instructionsTitle.textContent = "Instructions";

    //Lägg till klass till div
    div.classList.add("recipe-info");

    //Loop som skapa och lägg till innehåller till div
    for(let i = 0; i < 4; i ++){
        let text = "";
        let data = "";

        switch(i){
        case 0:
            text = "Servings:"
            data = recept.servings;
            break;
        case 1:
            text = "Prep time:"
            data = recept.prepTimeMinutes;
            break;
        case 2:
            text = "Cooking time:"
            data = recept.cookTimeMinutes;
            break;
        case 3:
            text = "Difficulty:"
            data = recept.difficulty
        }

        let p = document.createElement("p")
        let strong = document.createElement("strong")

        p.appendChild(strong)
        strong.textContent = text;
        p.textContent += data;

        div.appendChild(p)
    }

    //Loop som går genom ingrediens om recept och lägg de in i listan
    recept.ingredients.forEach(function(ingredient) {
        let li = document.createElement("li");
        li.textContent = ingredient;
        ingredients.appendChild(li);
    });

    //Loop som går genom instruktion om recept och lägg de in i listan
    recept.instructions.forEach(function(instruction) {
        let li = document.createElement("li");
        li.textContent = instruction;
        instructions.appendChild(li);
    });

    //Lägg till article inom recipe
    recipe.appendChild(article);

    //Lägg till elementer inom article
    for(let i = 0; i < elements.length; i ++){
        article.appendChild(elements[i]);
    };
}



form.addEventListener("submit", async function(event){
    event.preventDefault();

    error.innerHTML = "";
    errorAPI.innerHTML = "";
    recipe.innerHTML = "";

    if(validateForm()){
        if(await validateSearch(search.value)){
            const data = await getRecipes(search.value);
            const recept = data.recipes[0];
            wirteRecipe(recept);
        }
        else{
            errorAPI.innerHTML = "Inget recept hittades, prova en ny sökfras.."
        }
    }
    else{
        wirteErrorForm()
    };
})