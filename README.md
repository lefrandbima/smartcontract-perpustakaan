# Smart Contract Perpustakaan

This project contains a basic Library Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

Installation:
```shell
npm install
yarn install
```

Deployment:
```shell
npx hardhat run deploy
yarn deploy
```

Run Script:
```shell
yarn script scripts/addBook.ts --network localhost
yarn script scripts/deleteBook.ts --network localhost
yarn script scripts/getBookByISBN.ts --network localhost
yarn script scripts/updateBook.ts --network localhost
```

Testing:
```shell
yarn test test/SimpleLibrary.ts
```
