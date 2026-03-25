const fs = require('fs');
const path = require('path');

function writeToCSV(data, fileName){
  try{
    const filePath = path.resolve(fileName);
    const header = 'Low,High,Last,WeightedAvg\n';
    const rows = data.map(d => '${d.low},${d.high},${d.last},${d.weightedAvg}').join('\n');
    fs.writeFileSync(filePath, header+rows, 'utf-8');
    console.log('CSV written to: ${filePath}')
  }
  catch(err){
    console.error('Error writing CSV:', err)
    throw err;
  }
}
module.exports = {writeToCSV};