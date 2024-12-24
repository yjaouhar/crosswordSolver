function crosswordSolver(emptyPuzzle, words) {
    let puzzl = table(emptyPuzzle)
    if (!checkpuzzl(puzzl,words)){
        console.log("Error");
        return
    }
let cordoner = position(puzzl)
    console.log(cordoner);
}

function position(puzzl) {
    let cordoner = []
    for (let i = 0; i < puzzl.length; i++) {
        for (let j = 0; j < puzzl[i].length; j++) {
           if (puzzl[i][j]!=="."&&!isNaN(puzzl[i][j])){
            cordoner.push({x:i,y:j,count:parseInt(puzzl[i][j])})
           }
            
        }
        
    }
    return cordoner
}

function checkpuzzl(puzzl,words) {
    for (let i = 0; i < puzzl.length; i++) {
        for (let j = 0; j < puzzl[i].length; j++) {
            if (puzzl[i][j]!=="."&&isNaN(puzzl[i][j])){
                return false
            }
        }
    }
   for (let i = 0; i < words.length; i++) {
     for (let j = i+1; j < words.length; j++) {
        if (words[i]===words[j]){
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


const emptyPuzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta']


crosswordSolver(emptyPuzzle, words)