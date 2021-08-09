var Web3 = require('web3')
var fs = require('fs')
var deploy = require('../lib/deploy')


let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
// var web3 = new Web3("https://eth-mainnet.alchemyapi.io/v2/your-api-key");

(async () => {

let accounts=await web3.eth.getAccounts();
//console.log(accounts)

const contractName = 'ERC721PresetMinterPauserAutoId'

var address=await deploy.deploy(web3,accounts[0],
contractName,
['My nft', 'MNFT', 'https://localhost:8080/xyz/'])

if(address){
 console.log(address)
 var addrFile = contractName+'.address'
 fs.writeFileSync(addrFile,address);
}
process.exit(0);

})()



