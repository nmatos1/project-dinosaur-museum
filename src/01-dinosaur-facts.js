/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */

// created a conditional to check if a dinosaur doesn't exist in the array or undefined array returns an empty object;
function getLongestDinosaur(dinosaurs) {
if(!dinosaurs || dinosaurs.length === 0) { 
    return {};                             
}

//declared a variable and intialized to the first dino in array looping through the array to get to the key lengthInMeters comparing each dinosaur to the current dinosaur update the longestDino Variable until we reach the longest one
  
let longestDino = dinosaurs[0]  

for(let i = 1; i < dinosaurs.length; i++){                        
  if(longestDino.lengthInMeters < dinosaurs[i].lengthInMeters){   
    longestDino = dinosaurs[i]                                    
  }
}

//converting the height from meters to feet
  let newHeight = longestDino.lengthInMeters * 3.281    
  
  // returning the tallest dinosaur in an object
  return {
    [longestDino.name] : newHeight  
   }
 }
 
 console.log(getLongestDinosaur(exampleDinosaurData))

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {


  //creating the error message to be returned later if an id isn't found
  let errorMessage = `A dinosaur with an ID of '${id}' cannot be found.` 

  //looped through the dinosaur data to check if the inputted id matches the dinosaurId if so all the dinosaur's information is reformatted to a string.
  for (const dino of dinosaurs) {
    if (dino.dinosaurId === id) {
      return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${dino.mya[dino.mya.length - 1]} million years ago.`   
    }                             
  }
  return errorMessage;  
}


/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */

function getDinosaursAliveMya(dinosaurs, mya, key) {
  // created an empty array to be return the results in
  let dinoArr = []; 

  // looping through the data
  for (let dino of dinosaurs) { 

    //declaring a variable checking if there is only one date in the array and checking if the date entered matches or needs to be minus by 1
    let oneDate = dino.mya.length === 1 && (dino.mya[0] === mya || dino.mya[0] - 1 === mya) && mya <= dino.mya[0];

    //declaring a variabe to check if there are dinosaurs within the 2 dates
    let twoDates = dino.mya.length === 2 && mya >= dino.mya[1] && mya <= dino.mya[0]; 

    //pushing dinosaurs into the new array 
    if (oneDate) {
      pushToArray(dinoArr, key, dino)        
    } else if (twoDates) {
      pushToArray(dinoArr, key, dino)
    }
  }
  return dinoArr;
}

//helper function that checks if the key and push value into array helper function that checks if the key and push value into array check If key isn't provided or the key entered doesn't exist push Id into that array or push whatever value of the key that was entered
function pushToArray(dinoArr, key, dino) {  
  if (!key || !(key in dino)) {                     
    dinoArr.push(dino.dinosaurId)           
  } else {                                 
    dinoArr.push(dino[key])
  }
} 



console.log(getDinosaursAliveMya(exampleDinosaurData, 150))

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};


/** Created my own function
 * getDinosaurDiet()
 * 
 * Return an object of the total number of herbivores, carnivores, and omnivores.
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where there will be a count of Herbivores and Carnivores
 * EXAMPLE:
 *  {Herbivores : 0 , Carnivores : 0, Omnivores : 0}
 */

function getDinosaurDiet(dinosaurs){
  let herbDino = 0;
  let carnDino = 0;
  let omniDino = 0;

  for(let i = 0; i < dinosaurs.length; i++){
    let dino = dinosaurs[i].diet;

    if(dino === "herbivorous"){
      herbDino++;
    }else if(dino === "carnivorous"){
      carnDino++;
    } else{
      omniDino++
    }
  }
  return {
    Herbivores : herbDino,
    Carnivores : carnDino,
    Omnivore : omniDino,
  }
}


console.log(getDinosaurDiet(exampleDinosaurData))