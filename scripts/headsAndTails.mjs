#!/usr/bin/env node
import { stdin } from 'node:process';

let selectedIndex = 0;

const guess = Math.floor(Math.random() * 2);

const options = ['Орел', 'Решка'];

function start() {
  stdin.setRawMode(true);
  
  // Переводим поток во flow режим
  stdin.resume(); 
  
  // Устанавливаем кодировку потока
  stdin.setEncoding( 'utf8' );
  
  stdin.on('data', (key) => {
    if (key === '\u0003') { // Ctrl + C
      process.exit();
    } else if (key === '\u001b[A') { // Up arrow
      selectedIndex = Math.max(0, selectedIndex - 1);
      ask();
    } else if (key === '\u001b[B') { // Down arrow
      selectedIndex = Math.min(1, selectedIndex + 1);
      ask();
    } else if (key === '\r') { // Enter
      if (selectedIndex === guess) {
        console.log('Вы угадали!');
      } else {
        console.log('Вы не угадали!');
      }
      process.exit();
    }
  });

  ask();
}

function ask() {
  console.clear();
  console.log('Орел или решка?');

  options.forEach((option, index) => {
    console.log(`${index === selectedIndex ? '>' : ' '} ${option}`);
  });
}

start();