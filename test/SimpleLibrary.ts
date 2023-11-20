import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";
import { SimpleLibrary } from "../typechain";


describe("SimpleLibrary Contract", function () {
  let SimpleLibrary;
  let simpleLibrary : SimpleLibrary;
  let owner: Signer;
  const ISBN = "3tejbh745q8rbjs";
  const TITLE = "Ensiklopedia Sejarah Indonesia";
  const YEAR = 2021;
  const AUTHOR = "Prof.Mulawarman";

  beforeEach(async function () {
    SimpleLibrary = await ethers.getContractFactory("SimpleLibrary");
    simpleLibrary = await SimpleLibrary.deploy();
    [owner] = await ethers.getSigners();
  });

  it("Harus Menambahkan Buku", async function () {
    await simpleLibrary.connect(owner).addBook(ISBN, TITLE, YEAR, AUTHOR);
    const bookData = await simpleLibrary.getBookByISBN(ISBN);
    const isbn = bookData[0];
    const title = bookData[1];
    const year = bookData[2];
    const author = bookData[3];
    expect(isbn).to.equal(ISBN);
    expect(title).to.equal(TITLE);
    expect(year).to.equal(YEAR);
    expect(author).to.equal(AUTHOR);
  });

  it("Harus Mengupdate Buku", async function () {
    await simpleLibrary.connect(owner).addBook(ISBN, TITLE, YEAR, AUTHOR);
    const updatedTitle = "Ensiklopedia Sejarah Indonesia";
    const updatedYear = 2023;
    const updatedAuthor = "Prof.Mulawarman & Prof.Sri Yuli";

    await simpleLibrary.connect(owner).updateBook(ISBN, updatedTitle, updatedYear, updatedAuthor);

    const updatedBook = await simpleLibrary.getBookByISBN(ISBN);
    const isbn = updatedBook[0];
    const title = updatedBook[1];
    const year = updatedBook[2];
    const author = updatedBook[3];
    expect(isbn).to.equal(ISBN);
    expect(title).to.equal(updatedTitle);
    expect(year).to.equal(updatedYear);
    expect(author).to.equal(updatedAuthor);
  });

  it("Harus Menghapus Buku", async function () {
    const ISBN = "3tejbh745q8rbjs";
    const TITLE = "Ensiklopedia Sejarah Indonesia";
    const YEAR = 2021;
    const AUTHOR = "Prof.Mulawarman";


    await simpleLibrary.addBook(ISBN, TITLE, YEAR, AUTHOR);

    try {
      await simpleLibrary.deleteBook(ISBN);
      const book = await simpleLibrary.getBookByISBN(ISBN);
      expect.fail();
    } catch (error) {
      expect((error as Error).message).to.include("Buku dengan ISBN tersebut tidak ditemukan");
    }
  });

  it("Tidak boleh mengizinkan non-admin untuk Menambahkan, Mengupdate dan Mendelete Buku", async function () {
    const signers: Signer[] = await ethers.getSigners();
 
    // Menggunakan signer dengan indeks tertentu (misalnya, indeks 1)
    const nonAdmin: Signer = signers[1];
 
    // Mengirimkan transaksi dari nonAdmin
    await expect(
      simpleLibrary.connect(nonAdmin).addBook(ISBN, TITLE, YEAR, AUTHOR)
    ).to.be.revertedWith("Hanya admin yang dapat melakukan ini");

    await expect(
        simpleLibrary.connect(nonAdmin).updateBook(ISBN, TITLE, YEAR, AUTHOR)
      ).to.be.revertedWith("Hanya admin yang dapat melakukan ini");

      await expect(
        simpleLibrary.connect(nonAdmin).deleteBook(ISBN)
      ).to.be.revertedWith("Hanya admin yang dapat melakukan ini");
  });
});
