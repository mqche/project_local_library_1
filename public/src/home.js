function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {   
  let total = accounts.reduce(total => {
  return total + 1}, 0); 
  return total;
}

function booksBorrowedCount(books) {
  let counter = 0;
  for (let book of books) {
    if (!book.borrows[0].returned) counter++;
  }
  return counter;
}

function getMostCommonGenres(books) {
  const newObject = {};
  const newArray = [];
  // loop books arr and grabs book.genre vals for ea. book and rtrns arr
  const genres = books.map((book) => book.genre);
  // loop books arr, newObject has current genre as key ? add equal 1 as value : create key with value of 1. newObject = {genre: count, genre2: count2, ...}
  for (const book of books) {
    newObject[book.genre] ? (newObject[book.genre] += 1) : (newObject[book.genre] = 1);
  }
  // loop breaks newObject's keys and values: {genre: count, genre2: count2, ...}, makes an object, assigns keys to "name:" as values, and assigns values to "count:" as values, pushes to newArr
  for (let i = 0; i < Object.keys(newObject).length; i++) {
    newArray.push({
      name: Object.keys(newObject)[i],
      count: Object.values(newObject)[i],
    });
  }
  // sort array via count and then shorten arr to 5 elements with slice
  return newArray.sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, 5);
}

// [
//   { name: "Cristina Buchanan", count: 112 },
//   { name: "Tami Hurst", count: 83 },
//   { name: "Chrystal Lester", count: 80 },
//   ...
// ]
function getMostPopularBooks(books) {
  const newArr = [];
  const bookNames = books.map((book) => book.title);
  const bookCount = books.map((book) => book.borrows.length);
  for (let i = 0; i < bookNames.length; i++) {
    newArr.push({
      name: bookNames[i],
      count: bookCount[i],
    });
  }
  return newArr.sort((a, b) => (a.count > b.count ? -1 : 1)).slice(0, 5);
}

/*
  [
    { name: "Cristina Buchanan", count: 112 },
    { name: "Tami Hurst", count: 83 },
    { name: "Chrystal Lester", count: 80 },
    ...
  ]
*/

function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else {
      return 0;
    }
  })
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, {authorId, borrows}) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  },{});
  console.log("count:", count);

  for (let id in count) {
    const sum = count[id].reduce((a,b) => a + b);
    count[id] = sum;
  }
  console.log("reduced:",count);

  const sorted = _sortObjectByValues(count);
  console.log("sorted:",sorted);

  return sorted.map((authorId) => {
    console.log(authors.find(({id}) => {
      return id === authorId;     
    }));
    const {name: {first, last}} = authors.find(({id}) => id === Number(authorId));
    const name = `${first} ${last}`;
    return {name, count : count[authorId]};
  }).slice(0,5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
