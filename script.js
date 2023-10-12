function minCostOfRopes(arr) {
  arr.sort((a, b) => a - b); // Sort the array in ascending order

  let totalCost = 0;
  const n = arr.length;

  // Iterate through the sorted array and keep adding adjacent elements
  for (let i = 0; i < n - 1; i++) {
    const cost = arr[i] + arr[i + 1];
    totalCost += cost;
    arr[i + 1] = cost; // Replace the second element with the sum
  }

  return totalCost;
}

function calculateMinCost() {
  const ropeInput = document.getElementById("ropeInput").value;
  const ropeLengths = ropeInput.split(",").map(Number);
  
  const minCost = minCostOfRopes(ropeLengths);
  
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Minimum Cost of Ropes: " + minCost;
}
