var Web3 = require('web3')
var fs = require('fs')


var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
// var web3 = new Web3("https://eth-mainnet.alchemyapi.io/v2/your-api-key");
var BN = web3.utils.BN;

(async () => {
var accounts=await web3.eth.getAccounts();

console.log(accounts)
var account0 = accounts[0]
var account1 = accounts[1]

var contractName = 'ERC721PresetMinterPauserAutoId';

var abiFile = './build/'+contractName+'.abi';
var addrFile = contractName+'.address'
var address = fs.readFileSync(addrFile).toString();


var abi = JSON.parse(fs.readFileSync(abiFile).toString());
let contract = new web3.eth.Contract(abi,address);

//console.log(contract)

let name = await contract.methods.name().call({from:account0})
console.log(name)

let symbol = await contract.methods.symbol().call({from:account0})
console.log(symbol)

const tokenId = new BN('0');
console.log(tokenId.toNumber())

var gas = await contract.methods.mint(account1).estimateGas({ from: account0})
var result = await contract.methods.mint(account1).send({ from: account0, gas:gas });
console.log('mint',result.transactionHash)

let balance1 = await contract.methods.balanceOf(account1).call({from:account0})
console.log(balance1)

try{
let owner1 = await contract.methods.ownerOf(tokenId).call({from:account0})
console.log(owner1)
}catch(e){
  console.log(e)
}

try{
let tokenURI1 = await contract.methods.tokenURI(tokenId).call({from:account0})
console.log(tokenURI1)
}catch(e){
  console.log(e)
}

try{
var gas = await contract.methods.burn(tokenId).estimateGas({from: account1})
result = await contract.methods.burn(tokenId).send({ from: account1, gas:gas });
console.log('burn',result.transactionHash)
}catch(e){
  console.log(e)
}


process.exit(0)

})()




