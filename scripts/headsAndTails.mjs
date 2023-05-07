#!/usr/bin/env node
import { stdin } from 'node:process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

const ENCODING = 'utf-8';

const argv = yargs(hideBin(process.argv))
  .option('logfile', {
    describe: 'Log results to file',
    default: './logs/headsAndTails.log',
    type: 'string',
    demandOption: false,
  })
  .command('stats', 'Analizes game results', (yargs) => {
    return yargs
      .option('logfile', {
        describe: 'Path to the log file for stats analisys',
        type: 'string',
        demandOption: '-logfile is required',
      })
  }, (argv) => {
    gameStats(argv.logfile, process.exit);
  })
  .argv;


let selectedIndex = 0;

const guess = Math.floor(Math.random() * 2);

const options = ['Орел', 'Решка'];

const keyCode = {
  up: '\u001b[A',
  down: '\u001b[B',
  enter: '\r',
  ctrlC: '\u0003',
}

/** Функция логирования результатов игры в выходной файл */
function logResults(logData, file, callback) {
  fs.stat(file, err => {
    if (err == null) {
      fs.appendFileSync(file, logData, ENCODING);
    } else if (err.code === 'ENOENT') {
      // file does not exist
      fs.writeFileSync(file, logData, ENCODING);
    } else {
      console.log('Could not log results, an error occured: ', err.code);
    }

    if (typeof callback === 'function') {
      callback();
    }
  });
}

/** Функция вывода статистики игр из указанного лог-файла */
function gameStats(file, callback) {
  fs.readFile(file, ENCODING, (err, data) => {
    console.clear();

    if (err == null) {
      const results = data.split('\n')
        .filter(line => !!line.length)
        .map(line => JSON.parse(line))
        .reduce((result, gameData) => { 
          result.totalPlayed++;
          if (gameData.gameFinished) {
            gameData.guessed 
              ? result.totalWon++
              : result.totalLost++;
          } else {
            result.cancelled++;
          }

          return result;
        }, {
          totalPlayed: 0,
          totalWon: 0,
          totalLost: 0,
          cancelled: 0,
        });

      console.log('Total played: ', results.totalPlayed);
      console.log('Total won: ', results.totalWon);
      console.log('Total lost: ', results.totalLost);
      console.log('Cancelled: ', results.cancelled);
      console.log('Won/Lost (%): ', Math.round((results.totalWon/results.totalLost)) * 100 + '%')}
    else if (err.code === 'ENOENT') {
      console.log('No such file or directory: ', file);
    } else if (err) {
      console.error('Could not read file: ', err.code);
    }

    callback();
  })
}

/** Функция вывода выбора стороны монеты в консоль пользователя */
function ask() {
  console.clear();
  console.log('Орел или решка?');

  options.forEach((option, index) => {
    console.log(`${index === selectedIndex ? '>' : ' '} ${option}`);
  });
}

 /** Старт */
function start() {
  // Включаем режим чтения потока в режиме raw
  stdin.setRawMode(true);
  
  // Переводим поток во flow режим
  stdin.resume(); 
  
  // Устанавливаем кодировку потока
  stdin.setEncoding(ENCODING);
  
  // Подписываемся на событие data
  stdin.on('data', (key) => {
    let results = {
      gameFinished: null,
      guessed: null,
      guess: null,
    };

    if (key === keyCode.ctrlC) {
      results.gameFinished = false;
      
      if (argv.logfile) {
        logResults(
          `${JSON.stringify(results)}\n`,
          argv.logfile,
          process.exit
        );
      } else {
        process.exit();
      }

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

      if (argv.logfile) {
        logResults(
          `${JSON.stringify(results)}\n`,
          argv.logfile,
          process.exit
        );
      } else {
        process.exit();
      }

    }
  });

  ask();
}

start();
