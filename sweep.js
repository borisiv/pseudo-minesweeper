"use strict";
const fs = require("fs");
const readFile = (file = './input.txt') => {
	return new Promise((resp, rej) => {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) rej(err);
			else resp(data);
		});
	});
}
const incrementNeighbours = (A,i,j) => {
	const increment = (i,j) => {
		if (i >= 0 && i < A.length && j >= 0 && j < A[i].length && !isNaN(A[i][j])) A[i][j]++;
	};
	for(let y = i - 1; y <= i + 1; y++){
		for(let z = j - 1; z <= j + 1; z++){
			increment(y,z);
		}
	}
};
readFile()
.then(data => {
	const A = data.replace(/o/ig, 0).split("\r\n").map(item => item.split(" "));
	A.forEach((arr, i)=>{
		arr.forEach((item, j)=>{
			if (item == "X"){
				incrementNeighbours(A, i, j);
			}
		});
	});
	let res = "";
	A.forEach((arr, i)=>{
		res += arr.toString().replace(/,/g, " ");
		if (i !== A.length - 1) res += "\r\n";
	});
  console.log(res);
	fs.writeFile('done.txt', res, 'utf8', err => {
	  if (err) throw err;
	  console.log('The file done.txt has been saved!');
	});
})
.catch(e => console.log(e));
