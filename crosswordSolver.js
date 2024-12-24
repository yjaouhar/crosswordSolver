function crosswordSolver(emptyPuzzle, words) {
    let puzzl = table(emptyPuzzle)
    const word2 = new Set(words)
    console.log(word2.size);
    console.log(words);
    
    
    if (!checkpuzzl(puzzl, words)|| word2.size!==words.length) {
        console.log("Error---");
        return
    }

    let cordoner = position(puzzl, words)
    if (cordoner.length !== words.length) {
        console.log("Error++++");
        return

    }
    let res = Solvecrosword(puzzl, cordoner, words)
   

    if ( res === null) {
        console.log("Error");
        return
    }
    console.log(res);
}

function position(puzzl) {
    let cordoner = []


    for (let i = 0; i < puzzl.length; i++) {
        for (let j = 0; j < puzzl[i].length; j++) {
            if (puzzl[i][j] !== "." && !isNaN(puzzl[i][j])) {
                if (puzzl[i][j] === "2") {
                    cordoner.push({ x: i, y: j, direc: "H" })
                    cordoner.push({ x: i, y: j, direc: "V" })
                } else if (puzzl[i][j] === "1") {
                    if (j + 1 < puzzl[i].length && puzzl[i][j + 1] !== ".") {
                        cordoner.push({ x: i, y: j, direc: "H" })
                    } else if (i + 1 < puzzl.length && puzzl[i + 1][j] != ".") {
                        cordoner.push({ x: i, y: j, direc: "V" })
                    }
                }

            }

        }

    }
    return cordoner
}


function Solvecrosword(grid, slots, words, usedWords = new Set(), slotIndex = 0) {
    if (slotIndex === slots.length) {
        return grid;
    }

    const currentSlot = slots[slotIndex];
    const gridCopy = [...grid];
    // console.log(gridCopy)

    for (const word of words) {
        if (!usedWords.has(word) && haveplace(gridCopy, word, currentSlot)) {
            
            
            usedWords.add(word);
            placeword(gridCopy, word, currentSlot);
            const result = Solvecrosword(gridCopy, slots, words, usedWords, slotIndex + 1);
            if (result) return result;

            usedWords.delete(word);
        }
    }
    return null;

}

function placeword(puzzl, word, worckcordon) {
    let { x, y, direc } = worckcordon
    console.log(puzzl[x])
    if (direc === "H") {

        for (let i = 0; i < word.length; i++) {
            
            puzzl[x][y + i] = word[i]
        }
    } else if (direc === "V") {

        for (let i = 0; i < word.length; i++) {

            puzzl[x + i][y] = word[i]
        }
    }

}

function haveplace(puzzl, word, worckcordon) {
    let { x, y, direc } = worckcordon;
   
    if (direc === "H") {
        for (let i = 0; i < word.length; i++) {
           
            if ((y + word.length > puzzl[x].length) || (puzzl[x][y + i] === ".") || ((ishavenumber(puzzl[x][y + i]))&&(puzzl[x][i]!==word[i]))) {
               
                
                return false
            }
        }

    } else {
        for (let i = 0; i < word.length; i++) {
            
            if ((x + word.length > puzzl.length) || (puzzl[x + i][y] === ".") || ((ishavenumber(puzzl[x][y + i]))&&(puzzl[i][y]!==word[i]))) {
               
                return false
            }
        }
    }

    return true

}

function ishavenumber(str) {
    if ((str !== "0") || (str !== "1") || (str !== "2")) {
        return false
    }
    return true
}


function checkpuzzl(puzzl, words) {
    for (let i = 0; i < puzzl.length; i++) {
        for (let j = 0; j < puzzl[i].length; j++) {
            if (puzzl[i][j] !== "." && isNaN(puzzl[i][j])) {
                return false
            }
        }
    }
    
    return true

}
function table(emptyPuzzle) {
    let puzzle = emptyPuzzle.split("\n")
    let mt = []
    for (let i = 0; i < puzzle.length; i++) {
        mt.push(puzzle[i].split(""))
    }
    return mt
}


const Puzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta']


crosswordSolver(Puzzle, words)