function crosswordSolver(emptyPuzzle, words) {
    if (!isValidInput(emptyPuzzle, words)) {
        console.log('Error');
        return;
    }

    const grid = emptyPuzzle.split('\n').map(row => row.split(''));
    const wordSlots = getWordSlots(grid);
    
    if (wordSlots.length !== words.length) {
        console.log('Error');
        return;
    }

    const result = solve(grid, wordSlots, words);
    if (!result) {
        console.log('Error');
        return;
    }
    console.log(result)
    console.log(result.map(row => row.join('')).join('\n'));
}

function isValidInput(puzzle, words) {
    return puzzle && 
           words && 
           new Set(words).size === words.length;
}

function getWordSlots(grid) {
    const slots = [];
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '2') {
                slots.push({row: i, col: j, direction: 'horizontal'});
                slots.push({row: i, col: j, direction: 'vertical'});
            } else if (grid[i][j] === '1') {
                if (j + 1 < grid[i].length && grid[i][j + 1] !== '.') {
                    slots.push({row: i, col: j, direction: 'horizontal'});
                } else if (i + 1 < grid.length && grid[i + 1][j] !== '.') {
                    slots.push({row: i, col: j, direction: 'vertical'});
                }
            }
        }
    }
    console.log(slots)
    return slots;
}

function canPlaceWord(grid, word, slot) {
    const {row, col, direction} = slot;
    
    if (direction === 'horizontal') {
        if (col + word.length > grid[row].length) return false;
        for (let i = 0; i < word.length; i++) {
            if (grid[row][col + i] === '.') return false;
            if (grid[row][col + i] !== '0' && grid[row][col + i] !== '1' && 
                grid[row][col + i] !== '2' && grid[row][col + i] !== word[i]) {
                return false;
            }
        }
    } else {
        if (row + word.length > grid.length) return false;
        for (let i = 0; i < word.length; i++) {
            if (grid[row + i][col] === '.') return false;
            if (grid[row + i][col] !== '0' && grid[row + i][col] !== '1' && 
                grid[row + i][col] !== '2' && grid[row + i][col] !== word[i]) {
                return false;
            }
        }
    }
    return true;
}


function placeWord(grid, word, slot) {
    const {row, col, direction} = slot;
    if (direction === 'horizontal') {
        for (let i = 0; i < word.length; i++) {
            grid[row][col + i] = word[i];
        }
    } else {
        for (let i = 0; i < word.length; i++) {
            grid[row + i][col] = word[i];
        }
    }
}

function solve(grid, slots, words, usedWords = new Set(), slotIndex = 0) {
    if (slotIndex === slots.length) {
        return grid;
    }

    const currentSlot = slots[slotIndex];
    const gridCopy = [...grid];
   // console.log(gridCopy)

    for (const word of words) {
        if (!usedWords.has(word) && canPlaceWord(gridCopy, word, currentSlot)) {
            usedWords.add(word);
            placeWord(gridCopy, word, currentSlot);
            
            const result = solve(gridCopy, slots, words, usedWords, slotIndex + 1);
            if (result) return result;
            
            usedWords.delete(word);
        }
    }
    return null;
}

const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa','alan', 'ciao', 'anta' ]

crosswordSolver(puzzle, words)