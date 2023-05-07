#!/usr/bin/env node
import { stdin } from 'node:process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

const argv = yargs(hideBin(process.argv))
  .option('log', {
    describe: 'Log results to file',
    type: 'string',
    demandOption: false,
  }).argv;


let selectedIndex = 0;

const guess = Math.floor(Math.random() * 2);

const options = ['Орел', 'Решка'];

const keyCode = {
  up: '\u001b[A',
  down: '\u001b[B',
  enter: '\r',
  ctrlC: '\u0003',
}

function logResults(logData, file, callback) {
  fs.stat(file, function(err) {
    if (err == null) {
      fs.appendFileSync(file, logData, 'utf-8');
    } else if (err.code === 'ENOENT') {
      // file does not exist
      fs.writeFileSync(file, logData, 'utf-8');
    } else {
      console.log('Could not log results, an error occured: ', err.code);
    }

    callback();
  });
}

function start() {
  // Включаем режим чтения потока в режиме raw
  stdin.setRawMode(true);
  
  // Переводим поток во flow режим
  stdin.resume(); 
  
  // Устанавливаем кодировку потока
  stdin.setEncoding( 'utf8' );
  
  // Подписываемся на событие data
  stdin.on('data', (key) => {
    let results = {
      gameFinished: null,
      guessed: null,
      guess: null,
    };

    if (key === keyCode.ctrlC) {
      results.gameFinished = false;
      process.exit();
    } else if (key === keyCode.up) {
      selectedIndex = Math.max(0, selectedIndex - 1);
      ask();
    } else if (key === keyCode.down) {
      selectedIndex = Math.min(1, selectedIndex + 1);
      ask();
    } else if (key === keyCode.enter) {
      if (selectedIndex === guess) {
        console.log('Вы угадали!');

        results = {
          gameFinished: true,
          guessed: true,
          guess: options[selectedIndex],
        }

      } else {
        console.log('Вы не угадали!');

        results = {
          gameFinished: true,
          guessed: false,
          guess: options[selectedIndex],
        }
      }

      if (argv.log) {
        logResults(`${JSON.stringify(results)}\n`, argv.log, () => {
          process.exit();
        });
      } else {
        process.exit();
      }

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
