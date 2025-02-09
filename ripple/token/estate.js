const xrpl = require("xrpl");

const XRPL_SERVER = "wss://s.altnet.rippletest.net:51233"; // XRPL Testnet server



// Define the necessary fields
const standbySeedField = { value: "sEdTK8kbf5D1LFneqzg5GkgjsWj4yRw" }; // Replace with a valid seed
const standbyTokenUrlField = { value: "https://example.com/metadata" }; // Replace with your token URL
const standbyFlagsField = { value: "8" }; // Replace with your flags value
const standbyResultField = { value: "" };
const standbyBalanceField = { value: "" }

// Function to get the network
function getNet() {
    return XRPL_SERVER;
}

async function mintToken() {
    results = 'Connecting to ' + getNet() + '....'
    standbyResultField.value = results
    let net = getNet()
    const standby_wallet = xrpl.Wallet.fromSeed(standbySeedField.value)
    const client = new xrpl.Client(net)
    await client.connect()
    results += '\nConnected. Minting NFT.'
    standbyResultField.value = results 

    // define the transaction
    
  const transactionJson = {
    "TransactionType": "NFTokenMint",
    "Account": standby_wallet.classicAddress,
    "URI": xrpl.convertStringToHex(standbyTokenUrlField.value),
    "Flags": parseInt(standbyFlagsField.value),


    "NFTokenTaxon": 0 //Required, but if you have no use for it, set to zero.

}

// send the transaction and wait
const tx = await client.submitAndWait(transactionJson, { wallet: standby_wallet} )

// list of nfts owned by the wallet
const nfts = await client.request({
    method: "account_nfts",
    account: standby_wallet.classicAddress
  })

  // report of results in json file
  results += '\n\nTransaction result: '+ tx.result.meta.TransactionResult
  results += '\n\nnfts: ' + JSON.stringify(nfts, null, 2)
  standbyBalanceField.value = (await client.getXrpBalance(standby_wallet.address))
  standbyResultField.value = results    
  console.log("standby result: ", standbyResultField)
  client.disconnect()
} //End of mintToken()

// Call the function
mintToken().catch(console.error);

