import { puzzles } from "cubing/puzzles";
import { solve222 } from "./twsearch/solve222";

const solve2x2 = async (currentAlg) => {
    const kpuzzle = await puzzles["2x2x2"].kpuzzle();
    let solution = await solve222(
        kpuzzle.algToTransformation(currentAlg).toKPattern()
    );
    return solution.toString();
};

export default solve2x2;
