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
const walletOrigin = new ethers.Wallet(credentials.account.privateKeyEuropa);
//--------------------------------------ADJUST-----------------------------------||

const accountOrigin = walletOrigin.connect(providerOrigin);
const TOKEN_LINKER_ADDR = config.skale.token_linker;
const TOKEN_MANAGER_ADDR = config.skale.token_manager;
const CONFIG_CONTROLLER_ADDR = config.skale.config_controller;
const COMM_LOCKER_ADDR = config.skale.community_locker;
const MARIONETTE_ADDR = config.skale.marionette;
const MESS_PROXY_ADDR = config.skale.message_proxy;
const MSW_ADDR = config.skale.multisig_wallet;

// The address you want to check or assign
const ASSIGN_TO_ADDR = '0xd7Bf7C81383493fecED8B5b4338A5F4cE584A09b';
// the address of the smart contract
const GRANT_ROLE_SMART_CONTRACT = config.skale.token_manager;

async function run() {

     await setupTokenDeployer(ASSIGN_TO_ADDR);

    //  await addToWhiteList(true, ASSIGN_TO_ADDR);

    //  await setDefaultAdminRole(true, GRANT_ROLE_SMART_CONTRACT, ASSIGN_TO_ADDR);

    //  await setRegistrarRole(true, ASSIGN_TO_ADDR);

    //  await setTokenRegisterRole(true, ASSIGN_TO_ADDR);

    //  await setChainConnectorRole(true, ASSIGN_TO_ADDR);

    //  await setDeployerRole(true, ASSIGN_TO_ADDR);

    //  await setDeployerAdminRole(true, ASSIGN_TO_ADDR);

    //  await setMarionette(true, ASSIGN_TO_ADDR);

    //  await setCommunityLocker(true, ASSIGN_TO_ADDR);

    //  await setMessageProxy(true, ASSIGN_TO_ADDR);

}

async function setupTokenDeployer(tokenFactoryAddress) {
    await setTokenRegisterRole(true, tokenFactoryAddress);
    await setRegistrarRole(true, tokenFactoryAddress);
}

async function setDefaultAdminRole(grantRole, contractAddress, roleAddr) {
    const contract = new ethers.Contract(contractAddress, token_linker_abi, accountOrigin);
    // DEFAULT_ADMIN_ROLE
    const out = ethers.utils.arrayify('0x0000000000000000000000000000000000000000000000000000000000000000');
    let res = await contract.hasRole(out, roleAddr);
    if (res) {
        console.log("RegisterAddress already has DEFAULT_ADMIN_ROLE", res);
        return
    }
    console.log("RegisterAddress  DEFAULT_ADMIN_ROLE", res);
    if (grantRole === true) {
        let res = await contract.grantRole(out, roleAddr);
        const rec = await res.wait();
        console.log("receipt: ", rec);
    }
}

async function setRegistrarRole(grantRole, roleAddr) {

    console.log("RegisterAddress", roleAddr);

    const contract = new ethers.Contract(TOKEN_LINKER_ADDR, token_linker_abi, accountOrigin);
    const REGISTRAR_ROLE = ethers.utils.id("REGISTRAR_ROLE");

    let res = await contract.hasRole(ethers.utils.arrayify(REGISTRAR_ROLE), roleAddr);
    if (res) {
        console.log("RegisterAddress already has REGISTRAR_ROLE", res);
        return
    }
    console.log("RegisterAddress  REGISTRAR_ROLE", res);
    if (grantRole === true) {
        let res = await contract.grantRole(ethers.utils.arrayify(REGISTRAR_ROLE), roleAddr);
        const rec = await res.wait();
        console.log("receipt: ", rec);
    }
}

async function setChainConnectorRole(grantRole, roleAddr) {
    const contract = new ethers.Contract(TOKEN_LINKER_ADDR, token_linker_abi, accountOrigin);
    const CHAIN_CONNECTOR_ROLE = ethers.utils.id("CHAIN_CONNECTOR_ROLE");
    let res = await contract.hasRole(ethers.utils.arrayify(CHAIN_CONNECTOR_ROLE), roleAddr);
    if (res) {
        console.log("RegisterAddressalready has CHAIN_CONNECTOR_ROLE", res);
        return
    }
    console.log("RegisterAddress  CHAIN_CONNECTOR_ROLE", res);
    if (grantRole === true) {
        res = await contract.grantRole(ethers.utils.arrayify(CHAIN_CONNECTOR_ROLE), roleAddr);
        const rec = await res.wait();
        console.log("receipt: ", rec);
    }
}
async function setTokenRegisterRole(grantRole, roleAddr) {
    const contract = new ethers.Contract(TOKEN_MANAGER_ADDR, token_manager_abi, accountOrigin);
    const TOKEN_REGISTRAR_ROLE = ethers.utils.id("TOKEN_REGISTRAR_ROLE");
    let res = await contract.hasRole(ethers.utils.arrayify(TOKEN_REGISTRAR_ROLE), roleAddr);
    if (res) {
        console.log("RegisterAddress already has TOKEN_REGISTRAR_ROLE", res);
        return
    }
    console.log("RegisterAddress  TOKEN_REGISTRAR_ROLE", res);
    if (grantRole === true) {
        res = await contract.grantRole(ethers.utils.arrayify(TOKEN_REGISTRAR_ROLE), roleAddr);
        const rec = await res.wait();
        console.log("receipt: ", rec);
    }

}


async function setDeployerAdminRole(grantRole, roleAddr) {
    const contract = new ethers.Contract(CONFIG_CONTROLLER_ADDR, config_controller_abi, accountOrigin);
    const DEPLOYER_ADMIN_ROLE = ethers.utils.id("DEPLOYER_ADMIN_ROLE");
    let res = await contract.hasRole(ethers.utils.arrayify(DEPLOYER_ADMIN_ROLE), roleAddr);
    if (res) {
        console.log("RegisterAddress already has DEPLOYER_ADMIN_ROLE", res);
        return
    }
    console.log("RegisterAddress  DEPLOYER_ADMIN_ROLE", res);
    if (grantRole === true) {
        res = await contract.grantRole(ethers.utils.arrayify(DEPLOYER_ADMIN_ROLE), roleAddr);
        const rec = await res.wait();
        console.log("receipt: ", rec);
    }
}

async function addToWhiteList(grantRole, roleAddr) {
    const contract = new ethers.Contract(CONFIG_CONTROLLER_ADDR, config_controller_abi, accountOrigin);
    let res = await contract.isAddressWhitelisted(roleAddr);
    if (res) {
        console.log("RegisterAddress already has been whitelisted", res);
        return
    }
    console.log("RegisterAddress  Whitelisted", res);
    if (grantRole === true) {
        res = await contract.addToWhitelist(roleAddr);
        const rec = await res.wait();
        console.log("receipt: ", rec);
    }
}

/*
DEPLOYER_ROLE 
whitelisting other 3rd party contracts
*/
async function setDeployerRole(grantRole, roleAddr) {
    const contract = new ethers.Contract(CONFIG_CONTROLLER_ADDR, config_controller_abi, accountOrigin);
    const DEPLOYER_ROLE = ethers.utils.id("DEPLOYER_ROLE");
    let res = await contract.hasRole(ethers.utils.arrayify(DEPLOYER_ROLE), roleAddr);
    if (res) {
        console.log("RegisterAddress already has DEPLOYER_ROLE", res);
        return
    }
    console.log("RegisterAddress  DEPLOYER_ROLE", res);
    if (grantRole === true) {
        res = await contract.grantRole(ethers.utils.arrayify(DEPLOYER_ADMIN_ROLE), roleAddr);
        const rec = await res.wait();
        console.log("receipt: ", rec);
    }
}

async function setMarionette(grantRole, roleAddr) {
    const contract = new ethers.Contract(MARIONETTE_ADDR, marionette_abi, accountOrigin);

    const PUPPETEER_ROLE = ethers.utils.id("PUPPETEER_ROLE");

    let res = await contract.hasRole(ethers.utils.arrayify(PUPPETEER_ROLE), roleAddr);

    if (res) {
        console.log("RegisterAddress already has PUPPETEER_ROLE", res);
        return
    }
    console.log("RegisterAddress  PUPPETEER_ROLE", res);
    if (grantRole === true) {
        res = await contract.grantRole(ethers.utils.arrayify(DEPLOYER_ADMIN_ROLE), roleAddr);
        const rec = await res.wait();
        console.log("receipt: ", rec);
    }
}




async function setCommunityLocker(grantRole, roleAddr) {
    const contract = new ethers.Contract(COMM_LOCKER_ADDR, comm_locker_abi, accountOrigin);

    const CONSTANT_SETTER_ROLE = ethers.utils.id("CONSTANT_SETTER_ROLE");

    let res = await contract.hasRole(ethers.utils.arrayify(CONSTANT_SETTER_ROLE), roleAddr);

    if (res) {
        console.log("RegisterAddress already has CONSTANT_SETTER_ROLE", res);
        return
    }
    console.log("RegisterAddress  CONSTANT_SETTER_ROLE", res);
    if (grantRole === true) {
        res = await contract.grantRole(ethers.utils.arrayify(DEPLOYER_ADMIN_ROLE), roleAddr);
        const rec = await res.wait();
        console.log("receipt: ", rec);
    }
}




async function setMessageProxy(grantRole, roleAddr) {
    const contract = new ethers.Contract(MESS_PROXY_ADDR, mess_proxy_abi, accountOrigin);

    const EXTRA_CONTRACT_REGISTRAR_ROLE = ethers.utils.id("EXTRA_CONTRACT_REGISTRAR_ROLE");

    let res = await contract.hasRole(ethers.utils.arrayify(EXTRA_CONTRACT_REGISTRAR_ROLE), roleAddr);

    if (res) {
        console.log("RegisterAddress already has EXTRA_CONTRACT_REGISTRAR_ROLE", res);
        return
    }
    console.log("RegisterAddress  EXTRA_CONTRACT_REGISTRAR_ROLE", res);
    /*
    res = await contract.grantRole(ethers.utils.arrayify(DEPLOYER_ADMIN_ROLE), roleAddr);
    const rec = await res.wait();
    console.log("receipt: ", rec);
    */
}





run();