import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import '../styles/ChocolateCollector.css';
import { generateGrid, maxChocolatesWithPath } from '../Utilities/functions';

const ChocolateCollector = () => {
    const gridSize = 4;
    const [grid, setGrid] = useState([]);
    const [robot1Position, setRobot1Position] = useState([0, 0]);
    const [robot2Position, setRobot2Position] = useState([0, gridSize - 1]);
    const [robot1Path, setRobot1Path] = useState([[0, 0]]);
    const [robot2Path, setRobot2Path] = useState([[0, gridSize - 1]]);
    const [robot1Chocolates, setRobot1Chocolates] = useState(0);
    const [robot2Chocolates, setRobot2Chocolates] = useState(0);
    const [collectedChocolates, setCollectedChocolates] = useState({});
    const [activeRobot, setActiveRobot] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [isAutoMode, setIsAutoMode] = useState(false); // Auto/Manual Mode

    useEffect(() => {
        const newGrid = generateGrid(gridSize);
        setGrid(newGrid);
        const result = maxChocolatesWithPath(newGrid);
        setRobot1Path(result.path1);
        setRobot2Path(result.path2);

        // Set grid size in CSS
        document.documentElement.style.setProperty('--grid-size', gridSize);

        // Collect chocolates from starting positions
        const initialCollected = {};
        let initialRobot1Chocolates = 0;
        let initialRobot2Chocolates = 0;

        // Robot 1 starts at [0, 0]
        const robot1StartKey = '0-0';
        if (!initialCollected[robot1StartKey]) {
            initialRobot1Chocolates += newGrid[0][0];
            initialCollected[robot1StartKey] = true;
        }
        // Robot 2 starts at [0, gridSize - 1]
        const robot2StartKey = `0-${gridSize - 1}`;
        if (!initialCollected[robot2StartKey]) {
            initialRobot2Chocolates += newGrid[0][gridSize - 1];
            initialCollected[robot2StartKey] = true;
        }

        // Set initial states with collected chocolates
        setRobot1Chocolates(initialRobot1Chocolates);
        setRobot2Chocolates(initialRobot2Chocolates);
        setCollectedChocolates(initialCollected);
    }, [gridSize]);

    // Movement logic with chocolate collection check
    const moveRobot = (robot, position, setPosition, path, setPath, chocolates, setChocolates) => {
        const [row, col] = position;

        // Ensure the move is within the grid
        if (row < gridSize && col >= 0 && col < gridSize && grid[row]) {
            const positionKey = `${row}-${col}`; // Unique key for the cell

            // Check if chocolates from this cell have already been collected
            if (!collectedChocolates[positionKey]) {
                setChocolates(chocolates + grid[row][col]);

                // Mark this cell's chocolates as collected
                setCollectedChocolates(prev => ({ ...prev, [positionKey]: true }));
            }

            // Update position and path
            setPosition([row, col]);
            setPath([...path, [row, col]]);

            // Check if game is over
            if (row === gridSize - 1 && robot2Position[0] === gridSize - 1) {
                setGameOver(true);
            }
        }
    };

    // Function to determine valid moves
    const handleMovement = (event, position) => {
        const [row, col] = position;
        let newPosition = [row, col];

        switch (event.key) {
            case 'ArrowDown': // Move down
                if (row + 1 < gridSize) newPosition = [row + 1, col];
                break;
            case 'ArrowLeft': // Move diagonal down-left
                if (row + 1 < gridSize && col - 1 >= 0) newPosition = [row + 1, col - 1];
                break;
            case 'ArrowRight': // Move diagonal down-right
                if (row + 1 < gridSize && col + 1 < gridSize) newPosition = [row + 1, col + 1];
                break;
            default:
                return null; // Invalid move, return null
        }

        return newPosition;
    };

    // Function to handle manual movement via keyboard input
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (gameOver || isAutoMode) return; // Prevent movement if game is over or in auto mode

            let newPosition;
            if (activeRobot === 1) {
                newPosition = handleMovement(event, robot1Position);
                if (newPosition) {
                    moveRobot(1, newPosition, setRobot1Position, robot1Path, setRobot1Path, robot1Chocolates, setRobot1Chocolates);
                    setActiveRobot(2); // Switch to Robot 2
                }
            } else {
                newPosition = handleMovement(event, robot2Position);
                if (newPosition) {
                    moveRobot(2, newPosition, setRobot2Position, robot2Path, setRobot2Path, robot2Chocolates, setRobot2Chocolates);
                    setActiveRobot(1); // Switch to Robot 1
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [robot1Position, robot2Position, activeRobot, gameOver, robot1Path, robot2Path, isAutoMode]);

    // Function to handle automatic movement in auto mode
    useEffect(() => {
        let interval; // Declare interval variable
        if (isAutoMode && !gameOver) {
            interval = setInterval(() => {
                const moveAuto = (robot, position, setPosition, path, setPath, chocolates, setChocolates) => {
                    const nextMove = path.shift(); // Get the next step from the optimal path
                    if (nextMove) {
                        moveRobot(robot, nextMove, setPosition, path, setPath, chocolates, setChocolates);
                    }
                };

                // Move Robot 1
                if (robot1Path.length > 0) {
                    moveAuto(1, robot1Position, setRobot1Position, robot1Path, setRobot1Path, robot1Chocolates, setRobot1Chocolates);
                }

                // Move Robot 2
                if (robot2Path.length > 0) {
                    moveAuto(2, robot2Position, setRobot2Position, robot2Path, setRobot2Path, robot2Chocolates, setRobot2Chocolates);
                }

            }, 1000); // Move every second
        }

        return () => clearInterval(interval); // Clear interval on cleanup
    }, [isAutoMode, robot1Path, robot2Path, gameOver]);

    const resetGame = () => {
        setRobot1Position([0, 0]);
        setRobot2Position([0, gridSize - 1]);
        setRobot1Chocolates(0);
        setRobot2Chocolates(0);
        setRobot1Path([[0, 0]]);
        setRobot2Path([[0, gridSize - 1]]);
        setCollectedChocolates({});
        setGrid(generateGrid(gridSize));
        setGameOver(false);
    };

    return (
        <div className="chocolate-collector">
            <h1>Chocolate Collector</h1>

            {/* Toggle Switch for Auto/Manual Mode */}
            <div className="mode-toggle">
                <label>
                    <input
                        type="checkbox"
                        checked={isAutoMode}
                        onChange={() => setIsAutoMode(prev => !prev)}
                    />
                    {isAutoMode ? "Auto Mode" : "Manual Mode"}
                </label>
            </div>

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
                {gameOver && <h2>Game Over!</h2>}
            </div>
            <button onClick={resetGame}>Reset Game</button>
        </div>
    );
};

export default ChocolateCollector;

