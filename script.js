function calculateMinCost() {
  // Get the input element and split the input string into an array of rope lengths
  const ropeLengthsInput = document.getElementById('rope-lengths').value;
  const ropeLengths = ropeLengthsInput.split(',').map(Number);

  // Implement a function to find the minimum cost of connecting ropes
  function findMinimumCost(ropeLengths) {
    // Initialize the total cost and create a min heap
    let totalCost = 0;
    const minHeap = new MinHeap();

    // Insert all rope lengths into the min heap
    ropeLengths.forEach(length => minHeap.insert(length));

    // Continue connecting ropes until there is only one rope left in the heap
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

    return totalCost;
  }

  // Function to display the result in the "result" div
  function displayResult(minCost) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Minimum Cost: ${minCost}`;
  }

  // Calculate the minimum cost and display the result
  const minCost = findMinimumCost(ropeLengths);
  displayResult(minCost);
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
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return minValue;
  }

  sinkDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallest = index;

    if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
      smallest = leftChildIndex;
    }
    if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      this.sinkDown(smallest);
    }
  }

  size() {
    return this.heap.length;
  }
}
