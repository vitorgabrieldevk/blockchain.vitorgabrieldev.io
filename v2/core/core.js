/*----------------------------------
|                                  |
|         Core Class               |
|   Handles blockchain & P2P       |
|                                  |
|----------------------------------*/

/*----------------------------------
|  Import required modules         |
|----------------------------------*/
const Blockchain = require('./src/models/block');
const P2P = require('./src/utils/p2p');
const blockchainService = require('./src/services/blockchainService');
const config = require('./config/config');
const peer = process.argv[3];
const peerlist = process.argv[4];

/*----------------------------------
|  Core class definition           |
|----------------------------------*/
class Core {
  /*----------------------------------
  |  Constructor - Initializes      |
  |  blockchain and P2P components  |
  |----------------------------------*/
  constructor() {
    this.blockchain = new Blockchain();
    this.p2p = new P2P(blockchainService);
    var peerList = peer || 6001;
    this.p2p.listen(peerList);
    
    // Connect to an existing peer (e.g., external peer IP)
    if (config.peerPublic.length > 1) {
      var peerConnection = peerlist || config.peerPublic;
      this.p2p.connectToPeer(peerConnection);
    } else if(config.environment === "development") {
      console.error("ERROR: Host de peer pública não está configurado em 'core/config/config.js'.");
    }
  }

  /*----------------------------------
  |  Get blockchain instance        |
  |----------------------------------*/
  getBlockchain() {
    return this.blockchain;
  }

  /*----------------------------------
  |  Get list of connected peers    |
  |----------------------------------*/
  getPeers() {
    return this.p2p.getPeers();
  }

  /*----------------------------------
  |  Add a new block to the chain   |
  |----------------------------------*/
  addBlock(blockData) {
    return this.blockchain.addBlock(blockData);
  }
}

/*----------------------------------
|  Export the Core class for use   |
|----------------------------------*/
module.exports = Core;
