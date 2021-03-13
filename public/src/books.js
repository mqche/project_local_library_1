const { findAccountById } = require("./accounts");

function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

const findBookById = (books, id) => {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  let noReturn = books.filter(book => !book.borrows[0].returned);
  let returned = books.filter(book => book.borrows[0].returned);
  return [noReturn, returned];
}

function getBorrowersForBook(book, accounts) {
  let finalArr = [];
  for (let borrowArr of book.borrows) {
let arr = []
          let returnObj = {};
          returnObj['returned'] = borrowArr['returned'];
          arr.push(returnObj)
    for (let account of accounts) {
      if (account.id === borrowArr.id) {
        let mergeArrs = {...account, ...returnObj}
        finalArr.push(mergeArrs);
      }
    }  
 } 
 return finalArr.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
