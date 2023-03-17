import { v4 as uuid } from 'uuid';

export function generateCard(total=1) {  
  let count = 0;
  let cards = [];
  do {

    let numbers = [];
    
    while (numbers.length < 15) {
      const number = Math.floor(Math.random() * 30) + 1;
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
    
    let data = {
      serie: uuid(),
      numeros: numbers
    }

    cards.push(data);
    count++;

  } while (count < total);
  
  return cards;
}