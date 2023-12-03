class Node {
    /* All args are natural numbers. */
    constructor(args) {
        this.left = args.left;
        this.right = args.right;
        this.up = args.up;
        this.down = args.down;
        this.col = args.col;
        this.size = args.size;
        this.rowLabel = args.rowLabel;
    }
}

const HEAD = 0;

class Solver {
    constructor(ones, num_cols) {
        const rowMap = new Map();
        const columnMap = new Map();

        // Only left and right of head are used.
        const nodes = [];
        const head = new Node({left: 0, right: 0, up: 0, down: 0, col: 0, size: 0});
        nodes.push(head);
        // The index of column header c is c+1 due to head.
        // row label is not used.
        for (let c = 0; c < num_cols; c++) {
            nodes.push(new Node({
                left: c,
                right: c+2,
                up: c+1,
                down: c+1,
                col: c+1,
                size: 0,
            }));
        }

        // if there are any columns, head should link to the next one
        if (num_cols > 0) {
            nodes[0].right = 1;
        }
        // the last column's right wraps around to head
        nodes[nodes.length-1].right = 0;

        // the main stuff
        for (const [i, onesRow] of ones.entries()) {
            for (const j of onesRow) {
                // the new node's index
                const n = nodes.length;
                let row = rowMap.get(i);
                if (row === undefined) {
                    row = [];
                    rowMap.set(i, row);
                }
                // j+1 is column header for column j
                let column = columnMap.get(j);
                if (column === undefined) {
                    column = [j+1];
                    columnMap.set(j, column);
                }
                // If the row isn't empty, take the last
                // row element and make its right point to the
                // new element
                if (row.length > 0) {
                    nodes[row[row.length-1]].right = n;
                }
                const left = row.length > 0 ? row[row.length-1] : n;
                const up = column[column.length-1];
                nodes[up].down = n;

                row.push(n);
                column.push(n);
                nodes.push(new Node({
                    left: left,
                    right: row[0],
                    up: up,
                    down: j+1,
                    col: j+1,
                    rowLabel: i,
                }));
            }
        }

        // last tidy-up
        for (const row of rowMap.values()) {
            nodes[row[0]].left = row[row.length-1];
        }
        for (const column of columnMap.values()) {
            // i+1 is the node index of column i. subtracting
            // 1 because the column node is present also.
            nodes[column[0]].size = column.length-1;
            nodes[column[0]].up = column[column.length-1];
        }

        this.x = nodes;
        this.o = new Array(num_cols);
    }

    * search(k) {
        // if (this.x[HEAD].right === HEAD) {
        //     yield [
        //         "solution",
        //         this.o.slice(0, k).map(o_ => this.x[o_].rowLabel),
        //     ];
        // }

        let c = this.colWithLeast1s();
        this.cover(c);
        for (let r = this.x[c].down; r !== c; r = this.x[r].down) {
            this.o[k] = r;
            for (let j = this.x[r].right; j !== r; j = this.x[j].right) {
                this.cover(this.x[j].col);
            }

            const solutionType = this.x[HEAD].right === HEAD
                ? "solution" : "partial";
            yield [
                solutionType,
                this.o.slice(0, k+1).map(o_ => this.x[o_].rowLabel),
            ];

            yield* this.search(k+1);

            r = this.o[k];
            c = this.x[r].col;
            for (let j = this.x[r].left; j !== r; j = this.x[j].left) {
                this.uncover(this.x[j].col);
            }
        }
        this.uncover(c);
    }

    colWithLeast1s() {
        let s = Infinity;
        let j = this.x[HEAD].right;
        let minCol = j;
        for (; j !== HEAD; j = this.x[j].right) {
            const jNode = this.x[j];
            if (jNode.size < s) {
                minCol = j;
                s = jNode.size;
            }
        }
        return minCol;
    }

    cover(c) {
        this.x[this.x[c].right].left = this.x[c].left;
        this.x[this.x[c].left].right = this.x[c].right;
        for (let i = this.x[c].down; i !== c; i = this.x[i].down) {
            for (let j = this.x[i].right; j !== i; j = this.x[j].right) {
                this.x[this.x[j].down].up = this.x[j].up;
                this.x[this.x[j].up].down = this.x[j].down;
                this.x[this.x[j].col].size -= 1;
            }
        }
    }

    uncover(c) {
        const f = i => this.this.x[i];
        for (let i = this.x[c].up; i !== c; i = this.x[i].up) {
            for (let j = this.x[i].left; j !== i; j = this.x[j].left) {
                this.x[this.x[j].col].size += 1;
                this.x[this.x[j].down].up = j;
                this.x[this.x[j].up].down = j;
            }
        }
        this.x[this.x[c].right].left = c;
        this.x[this.x[c].left].right = c;
    }
}


/* `ones` is an array of arrays, each of which contains natural-number
indices of ones in the matrix. `num_cols` is the number of columns.
For example,

ones = [
    [0,2,4,5],
    [5,7],
    [1,6,7],
    [3],
], num_cols = 7 corresponds to the matrix

[
    [1,0,1,0,1,1,0,0],
    [0,0,0,0,0,1,0,1],
    [0,1,0,0,0,0,1,1],
    [0,0,0,1,0,0,0,0],
].

*/
function* dlxSolveOnes(ones, num_cols) {
    const solver = new Solver(ones, num_cols);
    yield* solver.search(0);
}

function* dlxSolveMatrix(matrix) {
    const ones = [];
    let num_cols = undefined;
    for (const row of matrix) {
        const onesRow = [];
        if (num_cols !== undefined && row.length !== num_cols) {
            throw new Exception("Rows of different lengths passed in");
        }
        num_cols = row.length;
        for (const [i, cell] of row.entries()) {
            if (cell) {
                onesRow.push(i);
            }
        }
        ones.push(onesRow);
    }
    yield* dlxSolveOnes(ones, num_cols);
}

// const example = [
//     [0,0,1,0,1,1,0],
//     [1,0,0,1,0,0,1],
//     [0,1,1,0,0,1,0],
//     [1,0,0,1,0,0,0],
//     [0,1,0,0,0,0,1],
//     [0,0,0,1,1,0,1],
//     // [1,1,1,0,0,1,0],
// ];
// for (const solution of solve_matrix(example)) {
//     console.log(solution);
// }