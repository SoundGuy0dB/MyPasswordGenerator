// Import random-words library from local path
import { generate } from "./lib/random-words/random-words.js";

// Define get random integer function (returns 0-9)
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
}

// Define a function to generate random numbers based on the 'Amount of Numbers' dropdown menu
function generateRandomNumbers(amount) {
    let randomNumbers = '';  // Change to 'let' to allow modification
    for (let i = 0; i < amount; i++) {
        randomNumbers += getRandomInt(0, 9).toString();
    }
    return randomNumbers;
}

// Define generate single formatted word function 
function generateFormattedWord(length) {
    const wordLength = parseInt(length, 10);
    if (isNaN(wordLength) || wordLength <= 0) {
        console.error('Invalid length value:', length);
        return ''; 
    }

    return generate({
        exactly: 1,
        minLength: wordLength,
        maxLength: wordLength,
        formatter: (word, index) => {
            return index === 0
                ? word.slice(0, 1).toUpperCase().concat(word.slice(1))
                : word;
        },
    })[0]; 
}

// Define generate two formatted words (concatenated) function 
function generatePassword(charsLength, numbersAmount) {
    const firstWord = generateFormattedWord(charsLength);
    const secondWord = generateFormattedWord(charsLength);
    const randomNumbers = generateRandomNumbers(numbersAmount);
    return firstWord + secondWord + randomNumbers;
}

// Define function to generate a list of multiple passwords
function generateList(count, charsLength, numbersAmount) {
    const passwordList = [];
    for (let i = 0; i < count; i++) {
        passwordList.push(generatePassword(charsLength, numbersAmount));
    }
    return passwordList;
}

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector('.input-wrapper input');
    const button = document.querySelector('.button-wrapper button');
    
    if (!input || !button) {
        console.error("Input or button element not found.");
        return;
    }

    let charsSelected = 5;
    let numbersSelected = 2;

    const charsSelectElement = document.getElementById('chars-select');
    const numbersSelectElement = document.getElementById('numbers-select');

    if (charsSelectElement) {
        charsSelectElement.addEventListener('change', function() {
            charsSelected = parseInt(this.value, 10) || 0; 
            console.log('Amount of Chars/Word selected:', charsSelected);
        });
    } else {
        console.error("Chars select element not found.");
    }

    if (numbersSelectElement) {
        numbersSelectElement.addEventListener('change', function() {
            numbersSelected = parseInt(this.value, 10) || 0; 
            console.log('Amount of Numbers selected:', numbersSelected);
        });
    } else {
        console.error("Numbers select element not found.");
    }

    button.addEventListener('click', function () {
        const numPasswords = parseInt(input.value, 10) || 1;
        const passwordList = generateList(numPasswords, charsSelected, numbersSelected);
        
        let passwordElement = document.querySelector('.password');
        
        if (passwordElement) {
            passwordElement.innerHTML = '';
        
            const ul = document.createElement('ul');
            passwordList.forEach(password => {
                const li = document.createElement('li');
                li.textContent = password;
                ul.appendChild(li);
            });
            passwordElement.appendChild(ul);
        } else {
            console.error("Password element not found.");
        }
        
        console.log("Chars: " + charsSelected + " | Numbers: " + numbersSelected);
    });
});
