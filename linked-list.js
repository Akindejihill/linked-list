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
      this.tail = newNode;
    }
    this.head = newNode;
    this.length++
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 0){
      return -1;
    } else {
      const output = this.tail.val;
      this.length--;
      //if there are no more elements, set the head and tail to null
      if (this.length === 0){
        this.tail = null;
        this.head = null;
      } else { //otherwise leave the head alone, and set the tail to the previous node
        this.tail = this.tail.prev;
      }
      return output;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0){
      return -1;
    } else {
      const output = this.head.val;
      //if there is a second node...
      if (this.head.next){ 
        this.head.next.prev = null; //remove 'prev' attribute from the second element/node
        this.head = this.head.next; //move the head pointer to the second element
      } else { //otherwise set the head and tail to null
        this.head = null;
        this.tail = null;
      }
      this.length--;
      return output;
    }
  }

  /** getAt(idx): get val at idx. */

  _get(idx) {
    if (idx >= this.length || idx < 0) {
      return false;
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
  
    //if the requested index doesn't exist create it and any preceeding missing nodes
    //the values of preceeding missing nodes will be set to null
    if (!currentNode){
      const numOfInserts = idx - (this.length -1);
      let currentNode = this.tail;
      //each loop appends a node to the end
      for (let i = 1; i <= numOfInserts; i++){
        //if this is the last loop, append the newNode instead of a fillerNode
        if (i === numOfInserts){
          if (currentNode){ 
            currentNode.next = newNode;
            newNode.prev = currentNode;
          }
          this.tail = newNode;
        } else { //otherwise append a filler node
          const fillerNode = new Node(null);
          if (currentNode){ 
            currentNode.next = fillerNode;
            fillerNode.prev = currentNode;
          }
          currentNode = fillerNode;
        }
      }
    } else {
    
      if (currentNode.prev){
        currentNode.prev.next = newNode; //set the "next" property of the previous node to newNode
        newNode.prev = currentNode.prev; //set the "prev" property of the new node to the node before it
      } 

      //place current node after newNode
      currentNode.prev = newNode; 
      newNode.next = currentNode;
    }

    this.length++;
    //if there is only one node set it as the head
    if (this.length === 1){
      this.head = newNode;
    }
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
    if (this.length === 0){
      this.head = null;
      this.tail = null;
    }
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