#!/usr/bin/env node
import http from 'http';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { ENCODING, WEATHERSTACK_URL, WEATHERSTACK_API_KEY } from '../config.mjs';

const argv = yargs(hideBin(process.argv))
  .option('city', {
    describe: 'City to get weather forecast',
    type: 'string',
    demandOption: '--city is required',
  })
  .argv;

function fetchWeatherForecast(city) {
  http.get(
    `${WEATHERSTACK_URL}?access_key=${WEATHERSTACK_API_KEY}&query=${city}`,
    (res) => {
      let responseData = '';

      res.setEncoding(ENCODING);

      res.on('data', chunk => responseData += chunk);
      res.on('end', () => onWeatherForecastFetched(responseData));
    }
  );
}

function onWeatherForecastFetched(res) {
  const responseData = JSON.parse(res);

  if (responseData.error) {
    console.log(`Error: ${responseData.error.info}`);
    process.exit(1);
  }

  console.log(`Current temperature in ${responseData.location.name} is ${responseData.current.temperature} ℃ , ${responseData.current.weather_descriptions[0]}`);
}

function start() {
  console.log(`Fetching weather forecast for ${argv.city}`);
  
  fetchWeatherForecast(argv.city);
}

start();