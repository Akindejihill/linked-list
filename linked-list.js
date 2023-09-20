/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);

    //if the list is still empty just add the new node as the first node
    if(this.length === 0){
      this.head = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length = this.length + 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if(this.length > 0){
      newNode.next = this.head;
      this.head.prev = newNode;
    } else {
      this.tail = null;
    }
    this.head = newNode;
    this.length++
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 0){
      return -1;
    } else {
      const output = this.tail;
      this.tail = this.tail.prev;
      this.length--;
      return output;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0){
      return -1;
    } else {
      const output = this.head;
      this.head.next.prev = null; //remove 'prev' attribute from the second element/node
      this.head = this.head.next; //move the head pointer to the second element
      this.length--;
      return output;
    }
  }

  /** getAt(idx): get val at idx. */

  _get(idx) {
    if (idx >= this.length || idx < 0) {
      return -1;
    }
    const deltaAlpha = idx; //distance idx is from the first element
    const deltaOmega = this.length - 1 - idx; //distance idx is from the last element
    let currentNode;
    if( deltaAlpha <= deltaOmega){ //if idx is closer to the begining count forwards
      currentNode = this.head;
      for(let i = 0; i < idx; i++){
        currentNode = currentNode.next;
      }
    } else { //if idx is closer to the end, count backwards from the end
      currentNode = this.tail;
      for(let i = 0; i < deltaOmega; i++){
        currentNode = currentNode.prev;
      }
    }
    return currentNode;
  }

  getAt(idx){
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val (overwrite) */

  setAt(idx, val) {
    const currentNode = this._get(idx);
  
    //if the requested index doesn't exist return -1
    if (!currentNode){
      return -1;
    } else {
      currentNode.val = val;
    }

    return true;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);
    const currentNode = this._get(idx);
  
    //if the requested index doesn't exist return -1
    if (!currentNode){
      return -1;
    }

    if (currentNode.prev){
      currentNode.prev.next = newNode; //set the "next" property of the previous node to newNode
      newNode.prev = currentNode.prev; //set the "prev" property of the new node to the node before it
    } else {
      this.head = newNode;  //if there is no previous node, then set newNode to head
    }

    //place current node after newNode
    currentNode.prev = newNode; 
    newNode.next = currentNode;

    this.length++;
    return true;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {

    const prevNode = this._get(idx - 1);
    const nextNode = this._get(idx + 1);
    const val = this.getAt(idx);

    //set the next node's 'prev' property to the previous node
    if (nextNode) nextNode.prev = prevNode;
    //set the previous node's 'next' property to the following node
    if (prevNode) prevNode.next = nextNode;
    this.length--;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    let sigma = 0;
    let divisor = 0;
    let currentNode = this.head;
    for(let i = 0; i < this.length; i++)
    {
      if (typeof currentNode.val === 'number'){
        sigma = sigma + currentNode.val;
        divisor++;
      }
      currentNode = currentNode.next
      
    }
    return divisor !== 0? sigma/divisor : 0 ;
  }
}

module.exports = {Node, LinkedList};