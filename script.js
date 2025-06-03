export class LinkedList {
    constructor() {
      this.head = null;
      this.length = 0;
    }
    prepend(value,key) {
      if (this.head == null) {
          this.head = new Node(value,key);
          this.length++;
          return;
      }
      let n = new Node(value,key);
      n.nextNode = this.head;
      this.head = n;
      this.length++;
    }
    append(value,key) {
      if (this.head == null) {
          this.head = new Node(value,key);
          this.length++;
          return;
      }
      let h = this.head;
      while (h.nextNode != null) {
        h = h.nextNode;
      }
      h.nextNode = new Node(value,key);
      this.length++;
    }
    size() {
      return this.length;
    }
    getHead() {
      return this.head;
    }
    tail() {
      let h = this.head;
      while (h.nextNode != null) {
        h = h.nextNode;
      }
      return h;
    }
    at(index) {
      let n = index;
      let h = this.head;
      while (h != null) {
        if (n == 0) {
          return h;
        }
        h = h.nextNode;
        n--;
      }
      return null;
    }
    pop() {
      if (!this.head) return;
      if (!this.head.nextNode) {
        this.head = null;
        this.length--;
        return;
      }
      let h = this.head;
      while (h.nextNode.nextNode != null) {
        h = h.nextNode;
      }
      h.nextNode = null;
      this.length--;
    }
    contains(value) {
      let h = this.head;
      while (h != null) {
        if (h.value == value) {
          return true;
        }
        h = h.nextNode;
      }
      return false;
    }
    find(value) {
      let ind = 0;
      let h = this.head;
      while (h != null) {
        if (h.value == value) {
          return ind;
        }
        ind++;
        h = h.nextNode;
      }
      return null;
    }
    toString() {
      let h = this.head;
      while (h != null) {
        console.log(`(${h.value}) ->`);
        h = h.nextNode;
      }
      console.log("null");
      return;
    }
    insertAt(index, value,key) {
      const newNode = new Node(value,key);
      if (index == 0) {
        newNode.nextNode = this.head;
        this.head = newNode;
        this.length++;
        return;
      }
      let current = this.head;
      let prev = null;
      let i = 0;
      while (current !== null && i < index) {
        i++;
        prev = current;
        current = current.nextNode;
      }
      if (i === index && prev) {
        newNode.nextNode = current;
        prev.nextNode = newNode;
        this.length++;
      }
    }
    removeAt(index) {
      let h = this.head;
      let prev = null;
      let ind = index;
      while (h != null) {
          if (index == 0 && ind == 0) {
              this.head = h.nextNode;
              this.length--;
              return;
          } else if (ind == 0) {
              prev.nextNode = h.nextNode;
              h.nextNode = null;
              this.length--;
              return;
          }
          ind--;
          prev = h;
          h = h.nextNode;
      }
      
    }
    
  }
  
export class Node {
    constructor(value = null,key) {
      this.value = value;
      this.key = key;
      this.nextNode = null;
    }
  }

export class Hashmap {
  constructor(capacity,load) {
    this.load = load
    this.factor = 0;
    this.capacity = capacity;
    this.length = 0;
    this.buckets = [];
    for (let i = 0; i < capacity; i++) {
        this.buckets[i] = new LinkedList();
    }
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode%this.capacity;
  }
  set(key,value) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
        throw new Error("Trying to access index out of bounds");
    }
    let elem = this.buckets[index].head;
    while (elem != null) {
        if (elem.key === key) {
            // if it is the same key, we replace the value;then stop
            elem.value = value;
            return;
        }
        elem = elem.nextNode;
    }
    // else its a new key;
    this.buckets[index].append(value,key);
    this.length++;
    this.factor = this.length / this.capacity;
    if (this.factor > this.load) {
      this.rehash();
    }
    return;

  }
  rehash() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = [];
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = new LinkedList();
    }
  
    this.length = 0;
    for (let i = 0; i < oldBuckets.length; i++) {
      let node = oldBuckets[i].head;
      while (node != null) {
        this.set(node.key, node.value); 
        node = node.nextNode;
      }
    }
  
    this.factor = this.length / this.capacity;
  }
  get(key) {
    
    let index = this.hash(key);
    let elem = this.buckets[index].head;
    while (elem!=null) {
        if (elem.key == key) {
            return elem.value;
        }
        elem = elem.nextNode;
    }
    return null;
  }
  has(key) {
    
    let index = this.hash(key);
    let elem = this.buckets[index].head;
    while (elem!=null){
        if (elem.key == key) {
            return true;
        }
        elem = elem.nextNode;
    }
    return null;
  }
  remove(key) {
    
    if (!this.has(key)) {
        return false;
    }
    let index = this.hash(key);
    let elem = this.buckets[index].head;
    let n = 0;
    while (elem!=null){
        if (elem.key == key) {
            this.buckets[index].removeAt(n);
            this.length--;
            return true;
        }
        n++;
        elem = elem.nextNode;
    }
    
    return false;
  }
  lengthHash() {
    return this.length;
  }
  clear() {
    for (let i = 0; i < this.capacity; i++) {
      while (this.buckets[i].head) {
        this.buckets[i].pop();
      }     
    }
    this.factor = 0;
    this.length = 0;
    return;
  }
  keys() {
    let res = [];
    for (let i = 0; i < this.capacity; i++) {
      let h = this.buckets[i].head;
      while (h!=null) {
        if (h.key != null) {
          res.push(h.key);
        }
        h = h.nextNode;
      }     
    }
    return res;
  }
  values() {
    let res = [];
    for (let i = 0; i < this.capacity; i++) {
      let h = this.buckets[i].head;
      while (h!=null) {
        if (h.value != null) {
          res.push(h.value);
        }
        h = h.nextNode;
      }     
    }
    return res;
  }
  entries() {
    let res = [];
    for (let i = 0; i < this.capacity; i++) {
      let h = this.buckets[i].head;
      while (h!=null) {
        if (h.value != null && h.key != null) {
          res.push([h.key,h.value]);
        }
        h = h.nextNode;
      }     
    }
    return res;
  }
}
