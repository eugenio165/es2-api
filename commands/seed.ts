// tslint:disable:no-console
import chalk from 'chalk';
import * as path from 'path';
import {
    loadConnection, loadEntityFactories, loadSeeds, runSeed, setConnection,
} from 'typeorm-seeding';

// Get cli parameter for a different factory path
const factoryPath = 'src/database/factories';

// Get cli parameter for a different seeds path
const seedsPath = 'src/database/seeds/';

// Search for seeds and factories
const run = async () => {
  const log = console.log;

  let factoryFiles;
  let seedFiles;
  try {
    factoryFiles = await loadEntityFactories(factoryPath);
    seedFiles = await loadSeeds(seedsPath);
  } catch (error) {
    return handleError(error);
  }

  // Status logging to print out the amount of factories and seeds.
  log(chalk.bold('seeds'));
  log('🔎 ', chalk.gray.underline(`found:`),
    chalk.blue.bold(`${factoryFiles.length} factories`, chalk.gray('&'), chalk.blue.bold(`${seedFiles.length} seeds`)));

  // Get database connection and pass it to the seeder
  try {
    let connection = await loadConnection();
    await connection.dropDatabase();
    await connection.close();
    connection = await loadConnection();
    setConnection(connection);
  } catch (error) {
    return handleError(error);
  }

  // Show seeds in the console
  for (const seedFile of seedFiles) {
    try {
      let className = seedFile.split('/')[seedFile.split('/').length - 1];
      className = className.replace('.ts', '').replace('.js', '');
      className = className.split('-')[className.split('-').length - 1];
      log('\n' + chalk.gray.underline(`executing seed:  `), chalk.green.bold(`${className}`));
      const seedFileObject: any = require(seedFile);
      await runSeed(seedFileObject[className]);
    } catch (error) {
      console.error('Could not run seed ', error);
      process.exit(1);
    }
  }

  log('\n👍 ', chalk.gray.underline(`finished seeding`));
  process.exit(0);
};

const handleError = (error) => {
  console.error(error);
  process.exit(1);
};

run();