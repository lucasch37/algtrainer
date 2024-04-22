//removes rotations, slice moves, wide moves from algs (min2phase doesn't work with them)

const convertAlg = (alg) => {
    const moves = alg.split(" ");
    const rotationCases = ["x", "x'", "x2", "y", "y'", "y2", "z", "z'", "z2"];
    for (let i = 0; i < moves.length; i++) {
        if (moves[i].length === 2) {
            const char1 = moves[i][0];
            if (moves[i][1] === "3") {
                moves[i] = char1 + "'";
            }
        } else if (moves[i].length === 3) {
            if (moves[i][1] === 2) {
                moves[i] = moves[i][0] + moves[i][1];
            } else {
                moves[i] = moves[i][0];
            }
        }
        if (rotationCases.indexOf(moves[i]) !== -1) {
            for (let j = i; j < moves.length; j++) {
                moves[j] = changeMove(moves[j], moves[i]);
            }
            moves[i] = "";
        } else {
            switch (moves[i]) {
                case "M":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "x'");
                    }
                    moves[i] = "R L'";
                    break;
                case "M'":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "x");
                    }
                    moves[i] = "R' L";
                    break;
                case "M2":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "x2");
                    }
                    moves[i] = "R2 L2";
                    break;
                case "S":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "z");
                    }
                    moves[i] = "F' B";
                    break;
                case "S'":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "z'");
                    }
                    moves[i] = "F B'";
                    break;
                case "S2":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "z2");
                    }
                    moves[i] = "F2 B2";
                    break;
                case "E":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "y'");
                    }
                    moves[i] = "U D'";
                    break;
                case "E'":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "y");
                    }
                    moves[i] = "U' D";
                    break;
                case "E2":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "y2");
                    }
                    moves[i] = "U2 D2";
                    break;
                case "r":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "x");
                    }
                    moves[i] = "L";
                    break;
                case "r'":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "x'");
                    }
                    moves[i] = "L'";
                    break;
                case "r2":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "x2");
                    }
                    moves[i] = "L2";
                    break;
                case "l":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "x'");
                    }
                    moves[i] = "R";
                    break;
                case "l'":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "x");
                    }
                    moves[i] = "R'";
                    break;
                case "l2":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "x2");
                    }
                    moves[i] = "R2";
                    break;
                case "u":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "y");
                    }
                    moves[i] = "D";
                    break;
                case "u'":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "y'");
                    }
                    moves[i] = "D'";
                    break;
                case "u2":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "y2");
                    }
                    moves[i] = "D2";
                    break;
                case "d":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "y'");
                    }
                    moves[i] = "U";
                    break;
                case "d'":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "y");
                    }
                    moves[i] = "U'";
                    break;
                case "d2":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "y2");
                    }
                    moves[i] = "U2";
                    break;
                case "f":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "z");
                    }
                    moves[i] = "B";
                    break;
                case "f'":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "z'");
                    }
                    moves[i] = "B'";
                    break;
                case "f2":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "z2");
                    }
                    moves[i] = "B2";
                    break;
                case "b":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "z'");
                    }
                    moves[i] = "B'";
                    break;
                case "b'":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "z");
                    }
                    moves[i] = "B";
                    break;
                case "b2":
                    for (let j = i; j < moves.length; j++) {
                        moves[j] = changeMove(moves[j], "z2");
                    }
                    moves[i] = "B2";
                    break;
            }
        }
    }
    return moves.join(" ");
};

const changeMove = (alg, axis) => {
    const x = ["F", "D", "B", "U"];
    const y = ["F", "R", "B", "L"];
    const z = ["R", "U", "L", "D"];
    let char2 = "";
    if (alg.length > 1) {
        char2 = alg[1];
    }
    let index;
    switch (axis) {
        case "x":
            index = x.indexOf(alg[0]);
            if (index !== -1) {
                if (index === 3) {
                    return x[0] + char2;
                } else {
                    return x[index + 1] + char2;
                }
            }
            return alg;
        case "x'":
            index = x.indexOf(alg[0]);
            if (index !== -1) {
                if (index === 0) {
                    return x[3] + char2;
                } else {
                    return x[index - 1] + char2;
                }
            }
            return alg;
        case "x2":
            index = x.indexOf(alg[0]);
            if (index !== -1) {
                if (index === 2) {
                    return x[0] + char2;
                } else if (index === 3) {
                    return x[1] + char2;
                } else {
                    return x[index + 2] + char2;
                }
            }
            return alg;
        case "y":
            index = y.indexOf(alg[0]);
            if (index !== -1) {
                if (index === 3) {
                    return y[0] + char2;
                } else {
                    return y[index + 1] + char2;
                }
            }
            return alg;
        case "y'":
            index = y.indexOf(alg[0]);
            if (index !== -1) {
                if (index === 0) {
                    return y[3] + char2;
                } else {
                    return y[index - 1] + char2;
                }
            }
            return alg;
        case "y2":
            index = y.indexOf(alg[0]);
            if (index !== -1) {
                if (index === 2) {
                    return y[0] + char2;
                } else if (index === 3) {
                    return y[1] + char2;
                } else {
                    return y[index + 2] + char2;
                }
            }
            return alg;
        case "z":
            index = z.indexOf(alg[0]);
            if (index !== -1) {
                if (index === 3) {
                    return z[0] + char2;
                } else {
                    return z[index + 1] + char2;
                }
            }
            return alg;
        case "z'":
            index = z.indexOf(alg[0]);
            if (index !== -1) {
                if (index === 0) {
                    return z[3] + char2;
                } else {
                    return z[index - 1] + char2;
                }
            }
            return alg;
        case "z2":
            index = z.indexOf(alg[0]);
            if (index !== -1) {
                if (index === 2) {
                    return z[0] + char2;
                } else if (index === 3) {
                    return z[1] + char2;
                } else {
                    return z[index + 2] + char2;
                }
            }
            return alg;
    }
};

export default convertAlg;
