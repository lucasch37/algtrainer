import { Alg } from "cubing/alg";
import { KPattern } from "cubing/kpuzzle";
import { wasmTwsearch } from "./twsearch";
import { cube2x2x2 } from "cubing/puzzles";

export async function solve222(pattern: KPattern): Promise<Alg> {
    return wasmTwsearch((await cube2x2x2.kpuzzle()).definition, pattern, {
        generatorMoves: "UFLR".split(""),
    });
}
