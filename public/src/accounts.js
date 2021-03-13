function findAccountById(accounts, id) {
  for (let account of accounts) {
    if (account.id == id) return account;
  }
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2) =>
    acc2["name"].last < acc1["name"].last ? 1 : -1
  );
}

function numberOfBorrows(account, books) {
  // make count var -- create variable to count total borrowed
  let borrows = 0;
  // loop through books aob (array of objects) for matching authors object id # -- matching author with object id
  for (let book of books) {
    // what func takes arr and returns value? .forEa. -- look through .borrows log in books and match with account id para
    book.borrows.forEach((borrowLog) => {
      // if book's borrow log id matches user id, increment count var
      if (borrowLog.id === account.id) borrows++;
    });
  }
  // rtrn # of times user borrowed books
  return borrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let borrowArr = [];
  for (let book of books) {
    book.borrows.forEach((borrowLog) => {
      if (borrowLog.id === account.id && !borrowLog.returned) {
        let author = authors.find((author) => author.id === book.authorId);
        let bookEmbedAuthor = { ...book, author };
        borrowArr.push(bookEmbedAuthor);
      }
    });
  }
  return borrowArr;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
