function crosswordSolver(emptyPuzzle, words) {
    let puzzl = table(emptyPuzzle)
    for (let i = 0; i < puzzl.length; i++) {
       for (let j = 0; j < puzzl[i].length; j++) {
            if (puzzl[i][j]!=="."){
               puzzl= print(words,puzzl,i,j)
            }
       }
        
    }

    console.log(puzzl);
}

function print(words,puzzl ,x,y) {
  
    if ( puzzl[x][y]==="1"){
      
        
    } else if ( puzzl[x][y]==="2") {
    //     console.log("x:",x,"y:",y);
    //     for (let i=0 ; i<y ; i++){
    //         puzzl[y][i]="*"
    //     }
    }else{
        puzzl[x][y]=words[x][y]
    }
    //  
    return puzzl
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


/* output:
`casa
i..l
anta
o..n`
*/


