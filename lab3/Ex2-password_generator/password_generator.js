const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const special = ['!', '@', '#', '$', '%', '^', '&', '*', '?'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const btnGenerate = document.getElementById('generateBtn');

btnGenerate.addEventListener('click',function (){
    const minLength = parseInt(document.getElementById('minLength').value);
    const maxLength = parseInt(document.getElementById('maxLength').value);
    const useUppercase = document.getElementById('Uppercase').checked;
    const useSpecial = document.getElementById('Special').checked;

    if(isNaN(minLength)|| isNaN(maxLength)){
        alert("Proszę podać prawidłowe liczby dla długości hasła.");
        return;
    }

    if(minLength>maxLength){
        alert("Minimalna długość nie może być większa od maksymalnej!");
        return;
    }

    let availableChar = [...lowercase,...numbers];

    if (useUppercase){
        availableChar=availableChar.concat(uppercase);
    }
    if (useSpecial){
        availableChar=availableChar.concat(special);
    }

    const randomLength = Math.floor(Math.random() * (maxLength-minLength +1)) + minLength;

    let password ="";
    for (let i =0; i<randomLength;i++){
        const randomIndex = Math.floor(Math.random() * availableChar.length);
        password+= availableChar[randomIndex];
    }
    alert("Twoje wygenerowane hasło to: " + password);
});