fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))

try {
    const res = await fetch("url");
    const data = res.json();
    console.log(data);
}
catch (err) {
    console.log(err);
};

// document.getElementById("abc");

console.log(1);
setTimeout(() => {
    console.log(2);
}, 3000)
console.log(3);
console.log(15);
console.log(15);
console.log(15);