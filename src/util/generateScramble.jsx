import convertAlg from "./convertAlg";
import min2phase from "./min2phase";

const generateScramble = (alg) => {
    let newAlg = convertAlg(alg);
    const AUF = Math.floor(Math.random() * 4);
    switch (AUF) {
        case 0:
            break;
        case 1:
            newAlg = "U " + newAlg;
            break;
        case 2:
            newAlg = "U' " + newAlg;
            break;
        case 3:
            newAlg = "U2 " + newAlg;
            break;
    }
    const postAUF = Math.floor(Math.random() * 4);
    switch (postAUF) {
        case 0:
            break;
        case 1:
            newAlg += " U";
            break;
        case 2:
            newAlg += " U'";
            break;
        case 3:
            newAlg += " U2";
            break;
    }
    var cube = min2phase.fromScramble(newAlg);
    min2phase.initFull();
    var solution = min2phase.solve(cube);
    return solution;
};

export default generateScramble;
