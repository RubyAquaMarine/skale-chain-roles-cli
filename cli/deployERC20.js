const ethers = require('ethers');

const token_linker_abi = require('../abi/skale_token_linker.json');
const token_manager_abi = require('../abi/skale_token_manager.json');
const marionette_abi = require('../abi/skale_marionette.json');
const config_controller_abi = require('../abi/skale_config_controller.json');
const comm_locker_abi = require('../abi/skale_community_locker.json');
const mess_proxy_abi = require('../abi/skale_message_proxy.json');

const config = require('../setConfig.json');
const credentials = require('../keys.json');
//--------------------------------------ADJUST-----------------------------------||
const providerOrigin = new ethers.providers.JsonRpcProvider(config.rpc.schain_Europa); // SKALE CHAIN
const walletOrigin = new ethers.Wallet(credentials.account.privateKeyAdmin);
//--------------------------------------ADJUST-----------------------------------||