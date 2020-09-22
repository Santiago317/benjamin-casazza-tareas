const prompt = require('prompt');
const IPFS = require("ipfs-mini");
const ipfs = new IPFS({host: 'ipfs.infura.io', port:5001, protocol:'https'});
prompt.start();
prompt.get(['ipfs'], function (err, result) {
console.log('Command-line input received:');
console.log('  IPS: ' + result.ipfs);


ipfs.add(result.ipfs, (err,hash)=> {
   if(err){
   return console.log(err);
   }
   console.log('https://ipfs.infura.io/ipfs/'+hash)
})
});

