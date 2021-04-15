const _ = require('lodash');
const path = require('path');
const fs = require('fs').promises;

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { getYoloCommand } = require('./helpers');

module.exports = async function (job, done) {
  console.log('Image-ai queue Job: ' + job.id + ' started!');

  const filePath = path.join(__dirname, '..', '..', '..', 'booking-api', 'uploads', job.data.path);
  const yoloCommand = getYoloCommand(filePath);
  const { stdout } = await exec(yoloCommand);
  const predictions = stdout.split('\n');
  predictions.splice(0, 1);

  const formattedPredictions = _.flatten(
    predictions.map(prediction => {
      return prediction.split(': ');
    })
  ).filter(v => v);

  console.log('Image-ai queue Job: ' + job.id + ' finished!');
  done();
}