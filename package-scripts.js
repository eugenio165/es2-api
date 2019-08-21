const { series, rimraf, } = require('nps-utils');

module.exports = {
  scripts: {
    seed: {
      script: series(
        'nps banner.seed',
        runFast('./commands/seed.ts'),
      ),
      description: 'Seeds generated records into the database'
    },
    banner: {
      build: banner('build'),
      serve: banner('serve'),
      testUnit: banner('test.unit'),
      testIntegration: banner('test.integration'),
      testE2E: banner('test.e2e'),
      migrate: banner('migrate'),
      seed: banner('seed'),
      revert: banner('revert'),
      clean: banner('clean')
    }
  }
};

function banner(name) {
  return {
      hiddenFromHelp: true,
      silent: true,
      description: `Shows ${name} banners to the console`,
      script: runFast(`./commands/banner.ts ${name}`),
  };
}

function runFast(path) {
  return `ts-node --transpileOnly ${path}`;
}
