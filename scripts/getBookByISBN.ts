import { ethers } from "hardhat";
import { SimpleLibrary } from "../typechain";

async function main() {
    // contract instance
    const simpleLibrary = await ethers.getContract<SimpleLibrary>("SimpleLibrary");

    // Function getBookByISBN
    const getBook = await simpleLibrary.getBookByISBN('123hsher');
    console.log('Detail buku :', getBook);
}

main().catch((err) => {
    console.log('error =', err);
    process.exitCode = 1;
});