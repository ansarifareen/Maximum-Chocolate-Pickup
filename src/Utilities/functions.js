
export const generateGrid = (size) => {
    return Array.from({ length: size }, () =>
        Array.from({ length: size }, () => Math.floor(Math.random() * 10) + 1)
    );
};

export const maxChocolatesWithPath = (grid) => {
    const path1 = [];
    const path2 = [];
    return { path1, path2 };
};



// export const maxChocolatesWithPath = (grid) => {
//     const n = grid.length;
//     const dp1 = Array.from({ length: n }, () => Array(n).fill(0)); // DP table for Robot 1
//     const dp2 = Array.from({ length: n }, () => Array(n).fill(0)); // DP table for Robot 2
//     const path1 = [];
//     const path2 = [];

//     // Initialize the DP table for Robot 1 (starting from top-left)
//     dp1[0][0] = grid[0][0];

//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < n; j++) {
//             if (i === 0 && j === 0) continue; // Skip the starting cell
//             dp1[i][j] = grid[i][j] + Math.max(
//                 (i > 0 ? dp1[i - 1][j] : 0),   // Move from above
//                 (j > 0 ? dp1[i][j - 1] : 0)    // Move from left
//             );
//         }
//     }

//     // Backtrack to find the path for Robot 1
//     let [i, j] = [n - 1, n - 1];
//     while (i > 0 || j > 0) {
//         path1.unshift([i, j]);
//         if (i > 0 && dp1[i][j] === dp1[i - 1][j] + grid[i][j]) {
//             i--;
//         } else {
//             j--;
//         }
//     }
//     path1.unshift([0, 0]); // Include the starting point

//     // Initialize the DP table for Robot 2 (starting from top-right)
//     dp2[0][n - 1] = grid[0][n - 1];

//     for (let i = 0; i < n; i++) {
//         for (let j = n - 1; j >= 0; j--) {
//             if (i === 0 && j === n - 1) continue; // Skip the starting cell
//             dp2[i][j] = grid[i][j] + Math.max(
//                 (i > 0 ? dp2[i - 1][j] : 0),   // Move from above
//                 (j < n - 1 ? dp2[i][j + 1] : 0) // Move from right
//             );
//         }
//     }

//     // Backtrack to find the path for Robot 2
//     [i, j] = [n - 1, 0];
//     while (i > 0 || j < n - 1) {
//         path2.unshift([i, j]);
//         if (i > 0 && dp2[i][j] === dp2[i - 1][j] + grid[i][j]) {
//             i--;
//         } else {
//             j++;
//         }
//     }
//     path2.unshift([0, n - 1]); // Include the starting point

//     return { path1, path2 };
// };

