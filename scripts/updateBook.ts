import { ethers } from "hardhat";
import { SimpleLibrary } from "../typechain";

async function main() {
    // contract instance
    const simpleLibrary = await ethers.getContract<SimpleLibrary>("SimpleLibrary");

    // get signer
    const [admin] = await ethers.getSigners();

    // Functions updateBook
    const addBook = await simpleLibrary.connect(admin).updateBook('123hsher', 'manusia 23', 2020, 'lefrand');
    await addBook.wait();

    const getBook = await simpleLibrary.getBookByISBN('123hsher');
    console.log('Buku Telah Diupdate :', getBook);
}

main().catch((err) => {
    console.log('error =', err);
    process.exitCode = 1;
});