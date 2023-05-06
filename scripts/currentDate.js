#!/usr/bin/env node
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const currentDate = new Date();

const argv = yargs(hideBin(process.argv))
  .option('year', {
    alias: 'y',
    description: 'Show current year',
  })
  .option('month', {
    alias: 'm',
    description: 'Show current month',
  })
  .option('date', {
    alias: 'd',
    description: 'Show current date',
  })
  .command('add', 'show date with diff in <d> days', (yargs) => {
    return yargs
      .option('d', {
        describe: 'Show ISO date with diff in <d> days from current date',
        type: 'number',
        demandOption: "-d is required",
      })
      .hide('month')
      .hide('year')
  }, (argv) => {
    console.log(`Date is: ${new Date(currentDate.setDate(currentDate.getDate() + argv.d))}`);
  })
  .command('sub', 'show date with diff in <m> months', (yargs) => {
    return yargs
      .option('m', {
        describe: 'Show ISO date with diff in <m> months from current date',
        type: 'number',
        demandOption: "-m is required",
      })
      .hide('date')
      .hide('year')
  }, (argv) => {
    console.log(`Date is: ${new Date(currentDate.setMonth(currentDate.getMonth() + argv.m))}`);
  })
  .argv;

const { year, month, date } = argv;

// Output current date only is command is not run
if (argv._.length === 0) {
  if (!year && !month && !date) {
    console.log(`Current ISO date: ${currentDate.toISOString()}`);
  }
  
  if (year) {
    console.log(`Current year: ${currentDate.getFullYear()}`);
  }
  
  if (month) {
    console.log(`Current month: ${currentDate.getMonth() + 1}`);
  }
  
  if (date) {
    console.log(`Current date: ${currentDate.getDate()}`);
  }
}




