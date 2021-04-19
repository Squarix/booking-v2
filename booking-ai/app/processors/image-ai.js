const _ = require('lodash');
const path = require('path');
const fs = require('fs').promises;

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { getYoloCommand } = require('./helpers');

const colorsCmd = `python ${path.join(__dirname, '..', 'python', 'colors.py')} `;

module.exports = async function (job, done) {
  console.log('Image-ai queue Job: ' + job.id + ' started!');

  const filePath = path.join(__dirname, '..', '..', '..', 'booking-api', 'uploads', job.data.path);
  const yoloCommand = getYoloCommand(filePath);
  const [{stdout }, { stdout: colorStdout }] = await Promise.all([exec(yoloCommand), exec(colorsCmd + filePath)]);
  const predictions = stdout.split('\n');
  predictions.splice(0, 1);

  const formattedPredictions = _.flatten(
    predictions.map(prediction => {
      return prediction.split(': ');
    })
  ).filter(v => v && v.indexOf('%') === -1);

  console.log('Predictions: ', formattedPredictions);
  console.log('Colors: ', colorStdout);

  console.log('Image-ai queue Job: ' + job.id + ' finished!');
  done();
}