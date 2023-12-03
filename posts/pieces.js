const PIECE_SET = new Map([
    ["O1R", [
        [[[0,0],"R"]],
        [[[0,0],"B"]],
    ].sort()],
    ["O1B", [
        [[[0,0],"B"]],
        [[[0,0],"L"]],
    ].sort()],
    ["I2", [
        [[[0,0],"R"], [[0,1],"B"]],
        [[[0,0],"B"], [[0,1],"L"]],
    ].sort()],
    ["I3R", [
        [[[0,0],"R"], [[0,1],"B"], [[0,2],"R"]],
        [[[0,0],"L"], [[0,1],"B"], [[0,2],"Y"]],
    ].sort()],
    ["I3B", [
        [[[0,0],"B"], [[0,1],"R"], [[0,2],"B"]],
        [[[0,0],"B"], [[0,1],"Y"], [[0,2],"B"]],
    ].sort()],
    ["L3R", [
        [[[0,0],"R"], [[1,0],"B"], [[1,1],"R"]],
        [[[0,0],"L"], [[1,0],"B"], [[1,1],"Y"]],
    ].sort()],
    ["L3B", [
        [[[0,0],"B"], [[1,0],"R"], [[1,1],"B"]],
        [[[0,0],"B"], [[1,0],"Y"], [[1,1],"B"]],
    ].sort()],
    ["L4BS", [
        [[[2,0],"R"], [[1,0],"B"], [[0,0],"R"], [[0,1], "B"]],
        [[[2,1],"B"], [[2,0],"L"], [[1,0],"B"], [[0,0], "Y"]],
    ].sort()],
    ["L4RS", [
        [[[2,0],"B"], [[1,0],"R"], [[0,0],"B"], [[0,1], "R"]],
        [[[2,1],"B"], [[2,0],"Y"], [[1,0],"B"], [[0,0], "L"]],
    ].sort()],
    ["G4BS", [
        [[[2,1],"B"], [[2,0],"R"], [[1,0],"B"], [[0,0], "R"]],
        [[[2,0],"B"], [[1,0],"Y"], [[0,0],"B"], [[0,1], "L"]],
    ].sort()],
    ["G4RS", [
        [[[2,1],"R"], [[2,0],"B"], [[1,0],"R"], [[0,0], "B"]],
        [[[2,0],"B"], [[1,0],"L"], [[0,0],"B"], [[0,1], "Y"]],
    ].sort()],
    ["S4", [
        [[[0,0],"R"], [[0,1],"B"], [[1,1],"R"], [[1,2], "B"]],
        [[[0,0],"Y"], [[1,0],"B"], [[1,1],"L"], [[2,1], "B"]],
    ].sort()],
    ["Z4", [
        [[[0,0],"R"], [[1,0],"B"], [[1,1],"R"], [[2,1], "B"]],
        [[[0,0],"L"], [[0,1],"B"], [[1,1],"Y"], [[1,2], "B"]],
    ].sort()],
    ["T4R", [
        [[[0,0],"R"], [[1,0],"B"], [[2,0],"R"], [[1,1], "R"]],
        [[[0,0],"B"], [[1,0],"L"], [[2,0],"B"], [[1,1], "B"]],
    ].sort()],
    ["T4B", [
        [[[0,0],"B"], [[1,0],"R"], [[2,0],"B"], [[1,1], "B"]],
        [[[0,0],"L"], [[1,0],"B"], [[2,0],"Y"], [[1,1], "Y"]],
    ].sort()],
    ["O4", [
        [[[0,0],"B"], [[1,0],"R"], [[0,1],"R"], [[1,1], "B"]],
        [[[0,0],"B"], [[1,0],"L"], [[0,1],"Y"], [[1,1], "B"]],
    ].sort()],
    ["L4", [
        [[[0,0],"B"], [[1,0],"R"], [[2,0],"B"], [[3,0], "R"]],
        [[[0,0],"B"], [[1,0],"Y"], [[2,0],"B"], [[3,0], "L"]],
    ].sort()],
    ["L8", [
        [[[0,0],"B"], [[1,0],"R"], [[2,0],"B"], [[3,0], "R"], [[4,0],"B"], [[5,0],"R"], [[6,0],"B"], [[7,0], "R"]],
        [[[0,0],"B"], [[1,0],"Y"], [[2,0],"B"], [[3,0], "L"], [[4,0],"B"], [[5,0],"Y"], [[6,0],"B"], [[7,0], "L"]],
    ].sort()],
]);

const ROTATIONS = [
    (x,y) => [x,y],
    (x,y) => [-y,x],
    (x,y) => [-x,-y],
    (x,y) => [y,-x],
];

const transform = (side, f) => {
    const results = [];
    for (const cell of side) {
        let [[x,y], colour] = cell;
        let [x_,y_] = f(x,y);
        // console.log(cell, x,y,colour,x_,y_);
        if (0 <= x_ && x_ < 8 && 0 <= y_ && y_ < 8) {
            results.push([[x_,y_], colour]);
        } else {
            return null;
        }
    }
    return results.sort();
}

const SETS = new Map();
for (const [pieceName, sides] of PIECE_SET.entries()) {
    const placementSet = new Set();
    for (const side of sides) {
        for (let i = -8; i <= 8; i++) {
            for (let j = -8; j <= 8; j++) {
                for (const rotation of ROTATIONS) {
                    const pos = transform(side, (x,y) => rotation(x+i,y+j));
                    if (pos !== null) {
                        placementSet.add(JSON.stringify(pos));
                    }
                }
            }
        }
    }
    SETS.set(pieceName, placementSet);
}
const ALL_PLACEMENTS = new Map();
for (const [pieceName, placementStrs] of SETS.entries()) {
    const list = [];
    for (const placementStr of placementStrs) {
        const placement = JSON.parse(placementStr);
        list.push(placement);
    }
    ALL_PLACEMENTS.set(pieceName, list);
}

const NUM_PIECES = PIECE_SET.size;
const PIECE_NAME_INDEX = new Map();

const f = () => {
    let i = 0;
    for (const pieceName of PIECE_SET.keys()) {
        PIECE_NAME_INDEX.set(pieceName, i);
        i += 1;
    }
}
f();