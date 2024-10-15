import React from 'react';
import '../styles/Grid.css';

const Grid = ({ grid, robot1Position, robot2Position, robot1Path, robot2Path }) => {
    return (
        <div className="grid" style={{ gridTemplateColumns: `repeat(${grid.length}, 0fr)` }}>
            {grid.map((row, rowIndex) =>
                row.map((chocolates, colIndex) => {
                    const isRobot1 = robot1Position[0] === rowIndex && robot1Position[1] === colIndex;
                    const isRobot2 = robot2Position[0] === rowIndex && robot2Position[1] === colIndex;
                    const isBothRobots = isRobot1 && isRobot2;

                    const isRobot1Path = robot1Path?.some(([r, c]) => r === rowIndex && c === colIndex);
                    const isRobot2Path = robot2Path?.some(([r, c]) => r === rowIndex && c === colIndex);

                    let cellClass = '';
                    
                    // Set specific background colors for (0, 0) and (0, n-1)
                    if (rowIndex === 0 && colIndex === 0) {
                        cellClass = 'cell robot1-start'; // Pink color
                    } else if (rowIndex === 0 && colIndex === grid[0].length - 1) {
                        cellClass = 'cell robot2-start'; // Green color
                    } else if (isBothRobots) {
                        cellClass = 'cell both-robots';
                    } else if (isRobot1) {
                        cellClass = 'cell robot1';
                    } else if (isRobot2) {
                        cellClass = 'cell robot2';
                    } else if (isRobot1Path) {
                        cellClass = 'cell robot1-path';
                    } else if (isRobot2Path) {
                        cellClass = 'cell robot2-path';
                    } else {
                        cellClass = 'cell'; // Default cell class
                    }

                    return (
                        <div key={`${rowIndex}-${colIndex}`} className={cellClass}>
                            {chocolates}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Grid;
