import { Web3 } from 'web3';

class Web3Service {
  constructor() {
    this.web3 = null;
    this.accounts = [];
    this.networkId = null;
    this.contracts = {};
  }

  async init() {
    try {
      // Modern dapp browsers
      if (window.ethereum) {
        this.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      // Legacy dapp browsers
      else if (window.web3) {
        this.web3 = new Web3(window.web3.currentProvider);
      }
      // Fallback to localhost
      else {
        const provider = new Web3.providers.HttpProvider('http://localhost:7545');
        this.web3 = new Web3(provider);
      }

      this.accounts = await this.web3.eth.getAccounts();
      this.networkId = await this.web3.eth.net.getId();
      
      return true;
    } catch (error) {
      console.error('Failed to load web3:', error);
      return false;
    }
  }

  async loadContract(contractName, abi, address) {
    try {
      const contract = new this.web3.eth.Contract(abi, address);
      this.contracts[contractName] = contract;
      return contract;
    } catch (error) {
      console.error(`Failed to load contract ${contractName}:`, error);
      return null;
    }
  }

  getContract(contractName) {
    return this.contracts[contractName];
  }

  async getBlockchainInfo() {
    try {
      const blockNumber = await this.web3.eth.getBlockNumber();
      const block = await this.web3.eth.getBlock(blockNumber);
      const balance = await this.web3.eth.getBalance(this.accounts[0]);
      
      return {
        blockNumber,
        block,
        balance: this.web3.utils.fromWei(balance, 'ether'),
        account: this.accounts[0],
        networkId: this.networkId
      };
    } catch (error) {
      console.error('Failed to get blockchain info:', error);
      return null;
    }
  }

  async sendTransaction(contract, method, params = [], value = 0) {
    try {
      const gasEstimate = await contract.methods[method](...params).estimateGas({
        from: this.accounts[0],
        value: value
      });

      const result = await contract.methods[method](...params).send({
        from: this.accounts[0],
        gas: gasEstimate,
        value: value
      });

      return result;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }

  async callMethod(contract, method, params = []) {
    try {
      const result = await contract.methods[method](...params).call();
      return result;
    } catch (error) {
      console.error('Call failed:', error);
      throw error;
    }
  }
}

export default new Web3Service();