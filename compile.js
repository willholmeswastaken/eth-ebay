const path = require('path'); //cross platform compatibility
const fs = require('fs');
const solc = require('solc');

const greetingsPath = path.resolve(__dirname, 'contracts', 'Greetings.sol'); //current working directory
const source = fs.readFileSync(greetingsPath, 'utf8'); //read raw source file 

var input = {
  language: 'Solidity',
  sources: {
    'Greetings.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts['Greetings.sol']) {
  console.log(
    contractName +
      ': ' +
      output.contracts['Greetings.sol'][contractName].evm.bytecode.object
  );
}
module.exports = output.contracts['Greetings.sol']['Greetings'];