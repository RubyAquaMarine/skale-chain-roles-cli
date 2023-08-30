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

 within  `/roles/`, change the `CHECK_ADDRESS_ROLE` to any address that you would like to check the `currently assigned roles`, or an address that you would like to `assign new roles` to. 


## Node and NPM verions
node: v18.12.1
npm: 8.19.2
