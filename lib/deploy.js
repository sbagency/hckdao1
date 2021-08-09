var fs = require('fs')


const deploy=async (web3,account,contractName,args)=>{
try{
//console.log(account,contractName,args)

var abiFile = './build/'+contractName+'.abi';
var binFile = './build/'+contractName+'.bin';
var addrFile = contractName+'.address'


var abi = JSON.parse(fs.readFileSync(abiFile).toString());
var bin = fs.readFileSync(binFile).toString()
let contract = new web3.eth.Contract(abi);

// https://docs.moonbeam.network/getting-started/local-node/deploy-contract/

let tx=contract.deploy({data: bin,arguments: args})
let gas = await tx.estimateGas()
let result=await tx.send({ from: account,gas: gas })
return result.options.address

} catch (e){
  console.log(e)
  return false
}

}

exports.deploy = deploy;



