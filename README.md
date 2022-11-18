# BugBuzzer

### BugBuzzer is a token gated community platform for Developers and Organizations to Crowdsource Bug Reporting, Technical Q&A forum, and one on one live tech support.

![MicrosoftTeams-image (38)](https://user-images.githubusercontent.com/69969675/195766702-e59b751c-49cb-450c-b912-babaa9a111ab.png)

### Problem we are solving

The problem we are solving is that in current tech forums, developers invest their time to contribute and help other builders but in return, they are being given an illusion of getting value in the form of “Upvotes, Rating/Reputation” and real value is being taken by platforms only.


### Tech stack and Integrations

**Klaytn:** We have used Klaytn for our NFT contracts of BugBuzzer developer memberships.

**EPNS:** We have used EPNS to update developers by triggering notifications for actions such as NFT membership batch token minting, while purchasing NFT to get specialised access of expert, while purchasing tutorial etc.

**World coin:** Solution by worldcoin to decentralised world id without compromising access of original data of people is hour of need in Web3 world so we integrated it to enable our users to login to BugBuzzer without sharing access of personal documents.

**Filecoin:** Filecoin is used in: 1) Meta data of BugBuzzer NFT memberships 2) To store tutorial articles on Web3 storage and 3) for Q&A forum our Lens Publication (POST NFTs) meta data is also stored in IPFS.

**Covalent:** We have used covalent to fetch all the NFT memberships of developers from BugBuzzer smart contract.

**Livepeer**: Livepeer is used in one to one token gated tech support live streaming between developers and organisations. Any organisation and individuals should have NFT if they want to have one to one tech support or guidance from expert developers of BugBuzzer community.

## It includes:

### Add Tutorial

![Screenshot 2022-10-14 at 11 03 42 AM](https://user-images.githubusercontent.com/69969675/195769840-92ade5e8-daf7-4fdf-9505-2f6695d92360.png)

### Categories

![MicrosoftTeams-image (28)](https://user-images.githubusercontent.com/69969675/195770304-6bbee27a-532a-41eb-903b-70e2f9197051.png)

### Buy and Read full tutorial

![Screenshot 2022-10-14 at 11 13 52 AM](https://user-images.githubusercontent.com/69969675/195771162-5a6e5ff9-489a-4784-aa03-335e5e2206af.png)
![Screenshot 2022-10-14 at 11 25 32 AM](https://user-images.githubusercontent.com/69969675/195772821-613dd30e-defd-451c-81fc-d31cf104142a.png)

### NFT Learner Club

![MicrosoftTeams-image (31)](https://user-images.githubusercontent.com/69969675/195772931-c38671af-e76a-429a-b9c1-d6caa3200037.png)
![MicrosoftTeams-image (32)](https://user-images.githubusercontent.com/69969675/195773065-530c51f6-e89a-434c-9634-559821732677.png)

### Buy NFT

![Screenshot 2022-10-14 at 11 37 33 AM](https://user-images.githubusercontent.com/69969675/195774631-29f25f7c-4a76-4f89-b05e-b000f64f6b67.png)

### Profile

#### My Tutorial

![Screenshot 2022-10-14 at 11 41 11 AM](https://user-images.githubusercontent.com/69969675/195774954-56cfb06c-bba2-4a74-8a68-61ffdda260e5.png)

#### My NFT

![MicrosoftTeams-image (33)](https://user-images.githubusercontent.com/69969675/195775745-6df406df-8a5c-4b86-bf0d-2438e46b742c.png)

### Blockchain: Mumbai Testnet

https://github.com/mansijoshi17/BugBuzzer-Chainlink/blob/master/hardhat.config.js

```
require("dotenv").config({ path: "./.env" });
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");


const pk_1 = process.env.REACT_APP_PRIVATE_KEY;
const { POLYGONSCAN_API_KEY } = process.env;

console.log(pk_1);
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/jKmzc-2X15D5tE3FrPvsEynO6bnh0FSm`,

      accounts: [pk_1],
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
 }
};
```

### IPFS/Filecoin

```
  function addData(Item) {
        const blob = new Blob(
            [
                JSON.stringify(Item),
            ],
            { type: "application/json" }
        );
        const files = [
            new File([blob], "data.json"),
        ];
        return files;
    }
    async function storeFiles(Item) {
        var array = [];
        // TO GET CURRENT USER WALLET ADDRESS
        let currentUser = login()
        const Cuser = Moralis.User.current(currentUser)
        UntoucheDdata.set("Current_User", user)
        let files = addData(Item)
        const cid = await client.put(files);
        UntoucheDdata.set("CID", cid);
        UntoucheDdata.save();
        axios.get(`https://${cid}.ipfs.infura-ipfs.io/data.json`)
            .then(function (response) {
                array.push(response.data);
                setData(array);
            })
            .catch(function (error) {
            })
        return cid;
    }
```
