import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import '../styles/ChocolateCollector.css';
import { generateGrid,maxChocolatesWithPath } from '../Utilities/functions'; 


const ChocolateCollector = () => {
    const gridSize = 4; // Define grid size in the code directly (you can change it here)
    const [grid, setGrid] = useState([]);
    const [robot1Position, setRobot1Position] = useState([0, 0]);
    const [robot2Position, setRobot2Position] = useState([0, gridSize - 1]);
    const [robot1Path, setRobot1Path] = useState([[0, 0]]);
    const [robot2Path, setRobot2Path] = useState([[0, gridSize - 1]]);
    const [robot1Chocolates, setRobot1Chocolates] = useState(0);
    const [robot2Chocolates, setRobot2Chocolates] = useState(0);
    const [activeRobot, setActiveRobot] = useState(1); // Always start with Robot 1
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const newGrid = generateGrid(gridSize);
        setGrid(newGrid);
        const result = maxChocolatesWithPath(newGrid);
        setRobot1Path(result.path1);
        setRobot2Path(result.path2);

        // Set grid size in CSS
        document.documentElement.style.setProperty('--grid-size', gridSize);
    }, [gridSize]);

    // Movement logic
    const moveRobot = (robot, position, setPosition, path, setPath, chocolates, setChocolates) => {
        const [row, col] = position;

        // Check if position is valid and within grid bounds
        if (row < gridSize && col >= 0 && col < gridSize && grid[row]) {
            // Update position and path
            setPosition([row, col]);
            setPath([...path, [row, col]]);
            setChocolates(chocolates + grid[row][col]);

            // Check if game is over
            if (row === gridSize - 1 && robot2Position[0] === gridSize - 1) {
                setGameOver(true);
            }
        }
    };

    // Handle robot movement
    const handleMovement = (event, position) => {
        const [row, col] = position;
        let newPosition = [row, col];

        switch (event.key) {
            case 'ArrowDown': // Move down
                if (row + 1 < gridSize) newPosition = [row + 1, col];
                break;
            case 'ArrowLeft': // Move diagonally left-down
                if (row + 1 < gridSize && col - 1 >= 0) newPosition = [row + 1, col - 1];
                break;
            case 'ArrowRight': // Move diagonally right-down
                if (row + 1 < gridSize && col + 1 < gridSize) newPosition = [row + 1, col + 1];
                break;
            default:
                break;
        }

        return newPosition;
    };

    // Keyboard movement and robot switching
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (gameOver) return;

            let newPosition;
            if (activeRobot === 1) {
                newPosition = handleMovement(event, robot1Position);
                moveRobot(1, newPosition, setRobot1Position, robot1Path, setRobot1Path, robot1Chocolates, setRobot1Chocolates);
                setActiveRobot(2); // Switch to Robot 2 after Robot 1's move
            } else {
                newPosition = handleMovement(event, robot2Position);
                moveRobot(2, newPosition, setRobot2Position, robot2Path, setRobot2Path, robot2Chocolates, setRobot2Chocolates);
                setActiveRobot(1); // Switch back to Robot 1 after Robot 2's move
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [robot1Position, robot2Position, activeRobot, gameOver, robot1Path, robot2Path]);

    const resetGame = () => {
        setRobot1Position([0, 0]);
        setRobot2Position([0, gridSize - 1]);
        setRobot1Chocolates(0);
        setRobot2Chocolates(0);
        setRobot1Path([[0, 0]]);
        setRobot2Path([[0, gridSize - 1]]);
        setGrid(generateGrid(gridSize));
        setGameOver(false);
    };

    return (
        <div className="chocolate-collector">
            <h1>Chocolate Collector</h1>
            <Grid
                grid={grid}
                robot1Position={robot1Position}
                robot2Position={robot2Position}
                robot1Path={robot1Path}
                robot2Path={robot2Path}
            />
            <div className="counters">
                <p>Robot 1 Chocolates: {robot1Chocolates}</p>
                <p>Robot 2 Chocolates: {robot2Chocolates}</p>
                <p>Total Chocolates: {robot1Chocolates + robot2Chocolates}</p>
            </div>
            {gameOver && <h2>Game Over!</h2>}
            <button onClick={resetGame}>Reset Game</button>
        </div>
    );
};

export default ChocolateCollector;


// import React, { useState, useEffect } from 'react';
// import Grid from './Grid';
// import '../styles/ChocolateCollector.css';
// import { generateGrid, maxChocolatesWithPath } from '../Utilities/functions';

// const ChocolateCollector = () => {
//     const gridSize = 5; // Define grid size
//     const [grid, setGrid] = useState([]);
//     const [robot1Position, setRobot1Position] = useState([0, 0]);
//     const [robot2Position, setRobot2Position] = useState([0, gridSize - 1]);
//     const [robot1Path, setRobot1Path] = useState([[0, 0]]);
//     const [robot2Path, setRobot2Path] = useState([[0, gridSize - 1]]);
//     const [robot1Chocolates, setRobot1Chocolates] = useState(0);
//     const [robot2Chocolates, setRobot2Chocolates] = useState(0);
//     const [gameOver, setGameOver] = useState(false);
//     const [mode, setMode] = useState("Auto");
//     const [intervalId, setIntervalId] = useState(null);

//     useEffect(() => {
//         const newGrid = generateGrid(gridSize);
//         setGrid(newGrid);
//         const result = maxChocolatesWithPath(newGrid);
//         setRobot1Path(result.path1);
//         setRobot2Path(result.path2);
//     }, [gridSize]);

//     useEffect(() => {
//         if (mode === "Auto") {
//             startAutomaticMode(); // Start automatic movement when in Auto mode
//         } else {
//             clearInterval(intervalId); // Stop automatic movement when in Manual mode
//         }

//         return () => clearInterval(intervalId); // Clear interval on unmount or mode change
//     }, [mode]); // Run this effect when the mode changes

//     const toggleMode = () => {
//         setMode((prevMode) => (prevMode === "Auto" ? "Manual" : "Auto"));
//     };

//     const startAutomaticMode = () => {
//         const id = setInterval(() => {
//             if (robot1Path.length > 0) {
//                 moveRobot(1, robot1Path[0], setRobot1Position, robot1Path, setRobot1Path, robot1Chocolates, setRobot1Chocolates);
//             }

//             if (robot2Path.length > 0) {
//                 moveRobot(2, robot2Path[0], setRobot2Position, robot2Path, setRobot2Path, robot2Chocolates, setRobot2Chocolates);
//             }

//             // Stop if both paths are exhausted
//             if (robot1Path.length === 0 && robot2Path.length === 0) {
//                 setGameOver(true);
//                 clearInterval(id); // Stop the interval when the game is over
//             }
//         }, 1000); // Move every second
//         setIntervalId(id); // Store interval ID
//     };

//     const moveRobot = (robot, path, setPosition, setPath, chocolates, setChocolates) => {
//         // Check if the path is valid
//         if (!path || path.length === 0) {
//             console.warn(`Robot ${robot} has no path left to follow.`);
//             return; // Exit if there are no positions to move to
//         }
    
//         // Get the next position from the path
//         const nextPosition = path[0];
    
//         // Ensure that nextPosition is defined and is an array
//         if (!Array.isArray(nextPosition) || nextPosition.length !== 2) {
//             console.error(`Invalid position for robot ${robot}:`, nextPosition);
//             return; // Exit if the position is invalid
//         }
    
//         const [row, col] = nextPosition; // Destructure the row and column
    
//         // Update robot's position and chocolates collected
//         setPosition([row, col]);
//         setChocolates(chocolates + grid[row][col]);
//         setPath(path.slice(1)); // Remove the first element from the path
    
//         // Log the current state for debugging
//         console.log(`Robot ${robot} moved to [${row}, ${col}]. Chocolates: ${chocolates + grid[row][col]}`);
//     };
    

//     const resetGame = () => {
//         setRobot1Position([0, 0]);
//         setRobot2Position([0, gridSize - 1]);
//         setRobot1Chocolates(0);
//         setRobot2Chocolates(0);
//         const newGrid = generateGrid(gridSize);
//         setGrid(newGrid);
//         const result = maxChocolatesWithPath(newGrid);
//         setRobot1Path(result.path1);
//         setRobot2Path(result.path2);
//         setGameOver(false);
//         clearInterval(intervalId); // Clear interval on reset
//     };

//     return (
//         <div className="chocolate-collector">
//             <h1>Chocolate Collector</h1>
//             <button className="toggle-mode" onClick={toggleMode}>
//                 {mode}
//             </button>
//             <Grid
//                 grid={grid}
//                 robot1Position={robot1Position}
//                 robot2Position={robot2Position}
//                 robot1Path={robot1Path}
//                 robot2Path={robot2Path}
//             />
//             <div className="counters">
//                 <p>Robot 1 Chocolates: {robot1Chocolates}</p>
//                 <p>Robot 2 Chocolates: {robot2Chocolates}</p>
//                 <p>Total Chocolates: {robot1Chocolates + robot2Chocolates}</p>
//             </div>
//             {gameOver && <h2>Game Over!</h2>}
//             <button onClick={resetGame}>Reset Game</button>
//         </div>
//     );
// };

// export default ChocolateCollector;
