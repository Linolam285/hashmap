import { LinkedList,Node,Hashmap } from "./script.js";
const test = new Hashmap(16,0.75) // or HashMap() if using a factory
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden');
console.log(`factor = ${test.factor}`)
console.log(`length = ${test.length}`)
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden');
console.log(test.values());
console.log("TESTS 2")
console.log(`factor = ${test.factor}`)
console.log(`length = ${test.length}`)
console.log(test.values());
console.log("TESTS 3");
test.set('moon', 'silver');
console.log(`factor = ${test.factor}`)
console.log(`length = ${test.length}`)
console.log("TESTS 4");


test.set('lion', 'golden');
console.log(test.values());
console.log(`factor = ${test.factor}`)
console.log(`length = ${test.length}`)


console.log("TESTS 5");
test.remove('lion');
console.log(test.values());
console.log(`factor = ${test.factor}`)
console.log(`length = ${test.length}`)
console.log(test.keys());
console.log(test.entries());

