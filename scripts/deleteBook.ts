import { ethers } from "hardhat";
import { SimpleLibrary } from "../typechain";

async function main() {
    // contract instance
    const simpleLibrary = await ethers.getContract<SimpleLibrary>("SimpleLibrary");

    // get signer
    const [admin] = await ethers.getSigners();

    // Function deleteBook
    const addBook = await simpleLibrary.connect(admin).deleteBook('123hsher');
    await addBook.wait();

    console.log('Buku Telah Dihapus');
}

main().catch((err) => {
    console.log('error =', err);
    process.exitCode = 1;
});