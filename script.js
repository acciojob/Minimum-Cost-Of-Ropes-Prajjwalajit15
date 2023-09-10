function calculateMinCost() {
  // Get the input string and split it into an array of integers
  const inputElement = document.getElementById('ropesInput');
  const inputString = inputElement.value;
  const ropeLengths = inputString.split(',').map(Number);

  // Create a min heap (priority queue) to store rope lengths
  const minHeap = new MinHeap();

  // Insert all rope lengths into the min heap
  ropeLengths.forEach(length => minHeap.insert(length));

  // Initialize the total cost
  let totalCost = 0;

  // Connect ropes until there is only one rope left in the heap
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes from the heap
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    // Calculate the cost of connecting these two ropes
    const cost = rope1 + rope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the combined rope back into the heap
    minHeap.insert(cost);
  }

  // Display the minimum cost in the result div
  const resultElement = document.getElementById('result');
  resultElement.textContent = totalCost;
}

// MinHeap implementation (binary heap)
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] < this.heap[parentIndex]) {
        // Swap the elements if the current element is smaller than its parent
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const minValue = this.heap[0];
    // Replace the root with the last element
    this.heap[0] = this.heap.pop();
    // Sink down to maintain the heap property
    this.sinkDown(0);
    return minValue;
  }

  sinkDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallest = index;

    // Find the index of the smallest child
    if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
      smallest = leftChildIndex;
    }
    if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
      smallest = rightChildIndex;
    }

    // Swap with the smallest child if needed and continue sinking down
    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.sinkDown(smallest);
    }
  }

  size() {
    return this.heap.length;
  }
}

