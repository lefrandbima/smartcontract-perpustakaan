// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract SimpleLibrary {
    // Struct untuk menyimpan data buku
    struct Book {
        string isbn;
        string title;
        uint256 year;
        string author;
    }

    mapping(string => Book) private books;

    address private admin;

    event BookAdded(string indexed isbn, string title, uint256 year, string author);

    event BookUpdated(string indexed isbn, string title, uint256 year, string author);

    event BookDeleted(string indexed isbn);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Hanya admin yang dapat melakukan ini");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // Function untuk add buku
    function addBook(string calldata _isbn, string calldata _title, uint256 _year, string calldata _author) public onlyAdmin {
        require(bytes(_isbn).length > 0, "ISBN tidak boleh kosong");
        require(bytes(_title).length > 0, "Judul tidak boleh kosong");
        require(_year > 0, "Tahun harus lebih dari 0");

        // Untuk ISBN unik
        require(books[_isbn].year == 0, "Buku dengan ISBN tersebut sudah ada");

        Book memory newBook = Book(_isbn, _title, _year, _author);
        books[_isbn] = newBook;
        emit BookAdded(_isbn, _title, _year, _author);
    }

    // Function untuk mengupdate buku 
    function updateBook(string calldata _isbn, string calldata _title, uint256 _year, string calldata _author) public onlyAdmin {
        require(bytes(_isbn).length > 0, "ISBN tidak boleh kosong");

        require(books[_isbn].year > 0, "Buku dengan ISBN tersebut tidak ditemukan");

        books[_isbn] = Book(_isbn, _title, _year, _author);
        emit BookUpdated(_isbn, _title, _year, _author);
    }

    // Function delete buku berdasarkan ISBN
    function deleteBook(string calldata _isbn) public onlyAdmin {
        require(bytes(_isbn).length > 0, "ISBN tidak boleh kosong");

        require(books[_isbn].year > 0, "Buku dengan ISBN tersebut tidak ditemukan");

        delete books[_isbn];
        emit BookDeleted(_isbn);
    }

    // Function untuk get buku berdasarkan ISBN
    function getBookByISBN(string calldata _isbn) public view returns (string memory, string memory, uint256, string memory) {
        require(bytes(_isbn).length > 0, "ISBN tidak boleh kosong");

        Book memory book = books[_isbn];
        require(book.year > 0, "Buku dengan ISBN tersebut tidak ditemukan");

        return (book.isbn, book.title, book.year, book.author);
    }
}
