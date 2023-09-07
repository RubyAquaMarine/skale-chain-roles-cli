#!/usr/bin/env node
const yargs = require("yargs")
const argv = yargs
    .string("address") // Specify that the "address" option should be treated as a string
    .argv;

const ethers = require('ethers');
const token_linker_abi = require('../abi/skale_token_linker.json');
const token_manager_abi = require('../abi/skale_token_manager.json');
const config_controller_abi = require('../abi/skale_config_controller.json');
const config = require('../setConfig.json');
const credentials = require('../keys.json');
//--------------------------------------ADJUST-----------------------------------||
const providerOrigin = new ethers.providers.JsonRpcProvider(config.rpc.schain_Europa); // SKALE CHAIN
const walletOrigin = new ethers.Wallet(credentials.account.privateKey);
//--------------------------------------ADJUST-----------------------------------||

const accountOrigin = walletOrigin.connect(providerOrigin);
const TOKEN_LINKER_ADDR = config.skale.token_linker;
const TOKEN_MANAGER_ADDR = config.skale.token_manager;
const CONFIG_CONTROLLER_ADDR = config.skale.config_controller;


// MANUALLY grant DEFAULT_ADMIN_ROLE
const GRANT_ROLE_SMART_CONTRACT = config.skale.token_manager;// the address of the smart contract

const ENABALE_DEFAULT_ADMIN = false;

async function GrantRole(ASSIGN_TO_ADDR) {

    //   await setDefaultAdminRole(true, GRANT_ROLE_SMART_CONTRACT, ASSIGN_TO_ADDR);

    // await setDeployerAdminRole(true, ENABALE_DEFAULT_ADMIN, ASSIGN_TO_ADDR);

    await addToWhiteList(true, ENABALE_DEFAULT_ADMIN, ASSIGN_TO_ADDR);// must have DeployerAdminRole before running this function

    //   await setRegistrarRole(true, ENABALE_DEFAULT_ADMIN, ASSIGN_TO_ADDR);

    //   await setTokenRegisterRole(true, ENABALE_DEFAULT_ADMIN, ASSIGN_TO_ADDR);

    //   await setChainConnectorRole(true, ENABALE_DEFAULT_ADMIN, ASSIGN_TO_ADDR);

    //  await setDeployerRole(true, ENABALE_DEFAULT_ADMIN, ASSIGN_TO_ADDR);

    // await setupTokenDeployer(ASSIGN_TO_ADDR);

}

async function setupTokenDeployer(tokenFactoryAddress) {
    await setTokenRegisterRole(true, false, tokenFactoryAddress);
    await setRegistrarRole(true, false, tokenFactoryAddress);
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


async function setDefaultAdminRoles(contract, roleAddr) {
    // DEFAULT_ADMIN_ROLE
    const out = ethers.utils.arrayify('0x0000000000000000000000000000000000000000000000000000000000000000');
    let res = await contract.hasRole(out, roleAddr);
    if (res) {
        console.log("RegisterAddress already has DEFAULT_ADMIN_ROLE", res);
        return
    }
    console.log("RegisterAddress  DEFAULT_ADMIN_ROLE", res);

    res = await contract.grantRole(out, roleAddr);
    const rec = await res.wait();
    console.log("receipt: ", rec);
}


async function setRegistrarRole(grantRole, grantDefaultAdminRole, roleAddr) {

    console.log("RegisterAddress", roleAddr);

    const contract = new ethers.Contract(TOKEN_LINKER_ADDR, token_linker_abi, accountOrigin);
    // DEFAULT_ADMIN_ROLE
    if (grantDefaultAdminRole) {
        await setDefaultAdminRoles(contract, roleAddr)
    }

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

async function setChainConnectorRole(grantRole, grantDefaultAdminRole, roleAddr) {
    const contract = new ethers.Contract(TOKEN_LINKER_ADDR, token_linker_abi, accountOrigin);
    // DEFAULT_ADMIN_ROLE
    if (grantDefaultAdminRole) {
        await setDefaultAdminRoles(contract, roleAddr)
    }
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
async function setTokenRegisterRole(grantRole, grantDefaultAdminRole, roleAddr) {
    const contract = new ethers.Contract(TOKEN_MANAGER_ADDR, token_manager_abi, accountOrigin);
    // DEFAULT_ADMIN_ROLE
    if (grantDefaultAdminRole) {
        await setDefaultAdminRoles(contract, roleAddr)
    }
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


async function setDeployerAdminRole(grantRole, grantDefaultAdminRole, roleAddr) {
    const contract = new ethers.Contract(CONFIG_CONTROLLER_ADDR, config_controller_abi, accountOrigin);
    // DEFAULT_ADMIN_ROLE
    if (grantDefaultAdminRole) {
        await setDefaultAdminRoles(contract, roleAddr)
    }
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

async function addToWhiteList(grantRole, grantDefaultAdminRole, roleAddr) {
    const contract = new ethers.Contract(CONFIG_CONTROLLER_ADDR, config_controller_abi, accountOrigin);
    // DEFAULT_ADMIN_ROLE
    if (grantDefaultAdminRole) {
        await setDefaultAdminRoles(contract, roleAddr)
    }

    // check DEPLOYER_ADMIN_ROLE
    console.log("privateKey must have DEPLOYER_ADMIN_ROLE on CONFIG_CONTROLLER_ADDR before whitelisting new deployer_roles ")



    let res = await contract.isAddressWhitelisted(roleAddr);
    if (res) {
        console.log("RegisterAddress already has been whitelisted", res);
        return
    }
    console.log("RegisterAddress  Whitelisted", res);
    if (grantRole === true) {
        res = await contract.addToWhitelist(roleAddr, { gasLimit: 10000000 });
        const rec = await res.wait();
        console.log("receipt: ", rec);
    }
}

/*
DEPLOYER_ROLE 
whitelisting other 3rd party contracts
*/
async function setDeployerRole(grantRole, grantDefaultAdminRole, roleAddr) {
    const contract = new ethers.Contract(CONFIG_CONTROLLER_ADDR, config_controller_abi, accountOrigin);
    // DEFAULT_ADMIN_ROLE
    if (grantDefaultAdminRole) {
        await setDefaultAdminRoles(contract, roleAddr)
    }
    const DEPLOYER_ROLE = ethers.utils.id("DEPLOYER_ROLE");
    let res = await contract.hasRole(ethers.utils.arrayify(DEPLOYER_ROLE), roleAddr);
    if (res) {
        console.log("RegisterAddress already has DEPLOYER_ROLE", res);
        return
    }
    console.log("RegisterAddress  DEPLOYER_ROLE", res);
    if (grantRole === true) {
        res = await contract.grantRole(ethers.utils.arrayify(DEPLOYER_ROLE), roleAddr);
        const rec = await res.wait();
        console.log("receipt: ", rec);
    }

}

GrantRole(argv.address);
//module.exports.GrantRole = GrantRole;