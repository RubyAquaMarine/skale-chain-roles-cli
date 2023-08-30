# Skale Roles
I recommend giving `DEFAULT_ADMIN_ROLE` to a secure private key for the following skale-predeployed-contracts using the predeployed Skale MSW. After that, you can easily grant roles to other developers or newly deployed smart contract such as the [Token-Deployer](https://github.com/RubyAquaMarine)
- TokenManager, TokenLinker, ConfigController, 



# Scripts
make keys.json
```javascript
{
    "account": {
      "privateKey": "c7d02615d6a7391257a-",
      "privateKeyAdmin": "c7d02615d6a7391-"
    }
}
```

# Run

- set ```rpc``` and ```privateKey``` within any script
- run any script from ```/roles``` 

```shell
npm install
npm run grant
npm run check

```


## Node and NPM verions
node: v18.12.1
npm: 8.19.2

# Skale Network


## Test roles on each Skale Predeploy
 within  `/roles/`, change the `CHECK_ADDRESS_ROLE` to any address that you would like to check the `currently assigned roles`, or an address that you would like to `assign new roles` to. 

- Etherbase: `0xd2bA3e0000000000000000000000000000000000`
- - DEFAULT_ADMIN_ROLE
- - Ether Manager Role

- Marionette: `0xD2c0DeFACe000000000000000000000000000000`
- - DEFAULT_ADMIN_ROLE
- - Ima Role
- - Puppeteer Role

- TokenManagerLinker: `0xD2aAA00800000000000000000000000000000000`
- - DEFAULT_ADMIN_ROLE
- - REGISTRAR_ROLE


- TokenManager: `0xD2aAA00500000000000000000000000000000000` 
- - DEFAULT_ADMIN_ROLE
- - TOKEN_REGISTRAR_ROLE 

- Config Controller: `0xD2002000000000000000000000000000000000D2`
- - DEFAULT_ADMIN_ROLE
- - Deployer Role
- - Mtm Admin Role
- - Deployer Admin Role

- MSW : `0xD244519000000000000000000000000000000000`
- - Give important roles to this address

## Example using MSW 
Using the MSW with MSW cli tooling can lead to `user input errors` easily. Please be careful!
### Connect Skale Chains 
and Register Tokens to IMA for s2s(Europa is TargetChain)
- enter marionetter address `0xD2c0DeFACe000000000000000000000000000000` , abi, and method `execute` 
- Params:
- -  (Token Manager/Linker) address
- - value `0x` + `funcSignature` + Create payload with MSW CLI 
- - `npx msig encodeData staging-legal-crazy-castor TokenManagerLinker connectSchain staging-utter-unripe-menkar`
- - - output: `990c85e60000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001b73746167696e672d75747465722d756e726970652d6d656e6b6172000000000000000000000000000000000000000000000000000000000000000000`
- - paste into MSW UI `data`: `0x990c85e60000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001b73746167696e672d75747465722d756e726970652d6d656e6b6172000000000000000000000000000000000000000000000000000000000000000000`

