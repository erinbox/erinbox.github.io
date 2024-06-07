// please import queue first. I have no idea how to do modules in JS properly lol

class Tree {
    // children should be a list of Trees
    constructor(children) {
        this._children = children;
    }

    get children() { return this._children; }
}

function* Tree__explore(tree) {
    const stack = [tree];
    while (stack.length > 0) {
        const node = stack.pop();
        yield node;
        for (const child of node.children()) {
            stack.push(child);
        }
    }
}

function* Tree__explorePath(tree) {
    const stack = [[tree, []]];
    while (stack.length > 0) {
        const [node, pathSoFar] = stack.pop();
        yield [node, pathSoFar];
        for (const [dir, child] of node.children().entries()) {
            stack.push([child, pathSoFar.concat([dir])]);
        }
    }
}

class DrawTree {
    /// Private use please
    constructor(tree, parent=null, depth=0, number=1) {
        this.x = -1.0;
        this.y = depth;
        this.tree = tree;
        this._children = [];
        const treeChildren = tree.children;
        for (let i = 0; i < treeChildren.length; i++) {
            const c = treeChildren[i];
            this._children.push(new DrawTree(
                c, this, depth+1, i+1,
            ));
        }
        this.parent = parent;
        this.thread = null;
        this.offset = 0;
        this.ancestor = this;
        this.mod = 0;
        this.change = 0;
        this.shift = 0;
        this.lmostSibling = null;
        this.number = number;
    }

    get children() { return this._children; }

    /// Makes a DrawTree from a Tree.
    static mk(tree) {
        const drawTree = new DrawTree(tree);
        const dt = DrawTree__firstWalk(drawTree);
        const min = DrawTree__secondWalk(dt);
        if (min < 0) {
            DrawTree__thirdWalk(dt, -min);
        }
        return dt;
    }

    /// Gets children.
    get children() { return this._children; }

    /// Gets a list of lines.

    _left() {
        if (this.thread !== null) {
            return this.thread;
        }
        else if (this._children.length > 0) {
            return this._children[0];
        } else {
            return null;
        }
    }

    _right() {
        if (this.thread !== null) {
            return this.thread;
        }
        else if (this._children.length > 0) {
            return this._children[this._children.length-1];
        } else {
            return null;
        }
    }

    _leftBrother() {
        let n = null;
        if (this.parent !== null) {
            for (const node of this.parent._children) {
                if (node === this) {
                    return n;
                } else {
                    n = node;
                }
            }
        }
        return n;
    }

    _getLeftmostSibling() {
        if (this.lmostSibling === null && this.parent !== null
            && this !== this.parent._children[0]
        ) {
            this.lmostSibling = this.parent._children[0];
        }
        return this.lmostSibling;
    }
}

const DrawTree__firstWalk = (v, distance=1.0) => {
    if (v._children.length === 0) {
        v.x = v._getLeftmostSibling() !== null
            ? v._leftBrother().x + distance
            : 0.0;
    } else {
        let defaultAncestor = v._children[0];
        for (const w of v._children) {
            DrawTree__firstWalk(w) // fix
            defaultAncestor = DrawTree__apportion(
                w,
                defaultAncestor,
                distance,
            );
        }
        DrawTree__executeShifts(v);

        const ell = v._children[0];
        const arr = v._children[v._children.length-1];
        const midpoint = (ell.x + arr.x) / 2;
        const w = v._leftBrother();
        if (w !== null) {
            v.x = w.x + distance;
            v.mod = v.x - midpoint;
        } else {
            v.x = midpoint;
        }
    }
    return v;
}

const DrawTree__apportion = (v, defaultAncestor, distance) => {
    const w = v._leftBrother();
    if (w !== null) {
        let vir = v;
        let vor = v;
        let vil = w;
        let vol = v._getLeftmostSibling();
        let sir = v.mod;
        let sor = v.mod;
        let sil = vil.mod;
        let sol = vol.mod;
        while (vil._right() !== null && vir._left() !== null) {
            vil = vil._right();
            vir = vir._left();
            vol = vol._left();
            vor = vor._right();
            vor.ancestor = v;
            const shift = (vil.x + sil) - (vir.x + sir) + distance;
            if (shift > 0) {
                const a = DrawTree__ancestor(vil, v, defaultAncestor);
                DrawTree__moveSubtree(a, v, shift);
                sir += shift;
                sor += shift;
            }
            sil += vil.mod;
            sir += vir.mod;
            sol += vol.mod;
            sor += vor.mod;
        }

        if (vil._right() !== null && vor._right() === null) {
            vor.thread = vil._right();
            vor.mod += sil - sor;
        } else {
            if (vir.left !== null && vol._left() === null) {
                vol.thread = vir._left();
                vol.mod += sir - sol;
            }
            defaultAncestor = v;
        }
    }
    return defaultAncestor;
}

const DrawTree__moveSubtree = (wl, wr, shift) => {
    const subtrees = wr.number - wl.number;
    wr.change -= shift / subtrees;
    wr.shift += shift;
    wl.change += shift / subtrees;
    wr.x += shift;
    wr.mod += shift;
}

const DrawTree__executeShifts = v => {
    let shift = 0;
    let change = 0;
    for (let i = v._children.length - 1; i >= 0; i--) {
        const w = v._children[i];
        w.x += shift;
        w.mod += shift;
        change += w.change;
        shift += w.shift + change;
    }
}

const DrawTree__ancestor = (vil, v, defaultAncestor) =>
    v.parent._children.includes(vil.ancestor)
        ? vil.ancestor
        : defaultAncestor;

const DrawTree__secondWalk = (v, m=0, depth=0, min=null) => {
    v.x += m;
    v.y = depth;

    if (min === null || v.x < min) {
        min = v.x;
    }

    for (const w of v._children) {
        min = DrawTree__secondWalk(w, m + v.mod, depth+1, min);
    }

    return min;
}

const DrawTree__thirdWalk = (tree, n) => {
    tree.x += n;
    for (const c of tree._children) {
        DrawTree__thirdWalk(c, n);
    }
}

const makeElement = (name) => document.createElementNS(SVG_NAMESPACE, name);

const pointSvg = (x, y) => {
    const point = makeElement("circle");
    point.setAttribute("r", `${0.2}`); // todo: decide
    point.setAttribute("cx", `${x}`);
    point.setAttribute("cy", `${y}`);
    point.setAttribute("stroke", "#000000");
    point.setAttribute("stroke-width", "0.05");
    point.setAttribute("fill", "#FFFFFF");
    return point;
}

const squareSvg = (x, y) => {
    const point = makeElement("rect");
    point.setAttribute("x", `${x-0.2}`);
    point.setAttribute("y", `${y-0.2}`);
    point.setAttribute("width", `${0.4}`);
    point.setAttribute("height", `${0.4}`);
    point.setAttribute("rx", `${0.05}`);
    point.setAttribute("stroke", "#000000");
    point.setAttribute("stroke-width", "0.05");
    point.setAttribute("fill", "#FFFFFF");
    return point;
}

const lineSvg = (x1, y1, x2, y2) => {
    const line = makeElement("line");
    line.setAttribute("x1", `${x1}`);
    line.setAttribute("y1", `${y1}`);
    line.setAttribute("x2", `${x2}`);
    line.setAttribute("y2", `${y2}`);
    line.setAttribute("stroke-width", "0.05");
    line.setAttribute("stroke", "#000000");
    return line;
}

const drawTreeToSvg = (drawTree, square=false) => {
    const svg = makeElement("svg");
    svg.setAttribute("width", `100%`);
    svg.setAttribute("height", `300px`);
    let lowerX = null; let upperX = null; let lowerY = null; let upperY = null;
    const lineGroup = makeElement("g");
    svg.appendChild(lineGroup);
    const pointGroup = makeElement("g");
    svg.appendChild(pointGroup);
    const queue = new Queue([drawTree]);
    while (queue.size() > 0) {
        const nextTree = queue.pop();
        const x1 = nextTree.x; const y1 = nextTree.y;
        lowerX = lowerX === null ? x1 : Math.min(lowerX, x1);
        upperX = upperX === null ? x1 : Math.max(upperX, x1);
        lowerY = lowerY === null ? y1 : Math.min(lowerX, y1);
        upperY = upperY === null ? y1 : Math.max(upperY, y1);
        const point = (square ? squareSvg : pointSvg)(x1, y1);
        pointGroup.appendChild(point);

        let subTreeLevel = null;
        let avg = null;
        let minXAmongChildren = null;
        let maxXAmongChildren = null;
        for (const subTree of nextTree.children()) {
            const [sX, sY] = [subTree.x, subTree.y];
            if (subTreeLevel === null) {
                subTreeLevel = sY;
                avg = (y1+sY)/2;
            }
            minXAmongChildren = minXAmongChildren === null
                ? sX : Math.min(minXAmongChildren, sX);
            maxXAmongChildren = maxXAmongChildren === null
                ? sX : Math.max(maxXAmongChildren, sX);

            const [lx1, ly1, lx2, ly2] = square
                ? [sX, avg, sX, sY]
                : [x1, y1, sX, sY];
            const line = lineSvg(lx1, ly1, lx2, ly2);
            lineGroup.appendChild(line);

            queue.push(subTree);
        }

        if (square && nextTree.children().length > 0) {
            lineGroup.appendChild(lineSvg(
                x1, y1, x1, avg,
            ));
            lineGroup.appendChild(lineSvg(
                minXAmongChildren, avg, maxXAmongChildren, avg,
            ));
        }
    }

    // one is null iff the others are
    if (lowerX === null) {
        lowerX = 0; upperX = 0; lowerY = 0; upperY = 0;
    } else {
        // boundaries
        lowerX -= 1; lowerY -= 1; upperX += 1; upperY += 1;
    }
    svg.setAttribute("viewBox", `${lowerX} ${lowerY} ${upperX-lowerX} ${upperY-lowerY}`);
    return svg;
}
