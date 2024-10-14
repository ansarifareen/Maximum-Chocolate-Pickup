
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
//     const path1 = [];
//     const path2 = [];

//     const numRows = grid.length;
//     const numCols = grid[0].length;

//     // Logic for Robot 1 starting from (0,0)
//     let row1 = 0, col1 = 0;
//     while (row1 < numRows) {
//         path1.push([row1, col1]);
//         // Move down, diagonal left, or diagonal right
//         if (row1 + 1 < numRows) {
//             if (col1 > 0 && grid[row1 + 1][col1 - 1] >= grid[row1 + 1][col1] && grid[row1 + 1][col1 - 1] >= grid[row1 + 1][col1 + 1]) {
//                 row1++;
//                 col1--; // Move diagonal left
//             } else if (col1 + 1 < numCols && grid[row1 + 1][col1 + 1] >= grid[row1 + 1][col1]) {
//                 row1++;
//                 col1++; // Move diagonal right
//             } else {
//                 row1++; // Move down
//             }
//         } else {
//             break; // Stop if at the last row
//         }
//     }

//     // Logic for Robot 2 starting from (0,n-1)
//     let row2 = 0, col2 = numCols - 1;
//     while (row2 < numRows) {
//         path2.push([row2, col2]);
//         // Move down, diagonal left, or diagonal right
//         if (row2 + 1 < numRows) {
//             if (col2 > 0 && grid[row2 + 1][col2 - 1] >= grid[row2 + 1][col2] && grid[row2 + 1][col2 - 1] >= grid[row2 + 1][col2 + 1]) {
//                 row2++;
//                 col2--; // Move diagonal left
//             } else if (col2 + 1 < numCols && grid[row2 + 1][col2 + 1] >= grid[row2 + 1][col2]) {
//                 row2++;
//                 col2++; // Move diagonal right
//             } else {
//                 row2++; // Move down
//             }
//         } else {
//             break; // Stop if at the last row
//         }
//     }

//     return { path1, path2 };
// };
