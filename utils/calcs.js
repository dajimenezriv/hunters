/*
const getDiff = (startDate, endDate) => {
  let res = endDate - startDate; // milliseconds
  res /= 1000; if (res < 60) return `${Math.trunc(res)} seconds`;
  res /= 60; if (res < 60) return `${Math.trunc(res)} minutes`;
  res /= 60; if (res < 24) return `${Math.trunc(res)} hours`;
  return `${Math.trunc(res / 24)} days`;
};

const date0 = new Date(2022, 8, 30, 12, 55, 30);
const date1 = new Date(2022, 8, 30, 12, 55, 20);
const date2 = new Date(2022, 8, 30, 12, 53, 30);
const date3 = new Date(2022, 8, 30, 11, 55, 30);
const date4 = new Date(2022, 8, 29, 13, 55, 30);
const date5 = new Date(2022, 8, 28, 13, 55, 30);

console.log(getDiff(date1, date0));
console.log(getDiff(date2, date0));
console.log(getDiff(date3, date0));
console.log(getDiff(date4, date0));
console.log(getDiff(date5, date0));
*/

export const getDiff = (startDate, endDate) => {
  let res = endDate - startDate; // milliseconds
  res /= 1000; if (res < 60) return `${Math.trunc(res)} seconds`;
  res /= 60; if (res < 60) return `${Math.trunc(res)} minutes`;
  res /= 60; if (res < 24) return `${Math.trunc(res)} hours`;
  return `${Math.trunc(res / 24)} days`;
};

export default getDiff;
