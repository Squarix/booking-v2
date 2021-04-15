const path = require('path');

function getYoloCommand(filePath) {
  const darknetPath = path.join(__dirname, '..', '..', 'darknet');
  return `cd ${darknetPath} && ./darknet detect cfg/yolov3.cfg yolov3.weights ${filePath}`;
}

module.exports = {
  getYoloCommand,
}