#!/usr/bin/env node
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
const num = Math.floor(Math.random() * 100);

async function ask() {
  const answer = await rl.question('Введите число между 0 и 100:');

  if (answer > num) {
    console.log('Меньше');
    ask();
  } else if (answer < num) {
    console.log('Больше');
    ask();
  } else {
    console.log(`Отгадано число ${num}`);
    rl.close();
  }
};

ask();
