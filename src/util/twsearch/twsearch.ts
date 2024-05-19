// import type { Alg } from "../../../alg";
// import {
//   KPattern,
//   KPuzzleDefinition,
//   KTransformationData,
// } from "../../../kpuzzle";
// import { from } from "../../../vendor/mit/p-lazy/p-lazy";

import { Alg } from "cubing/alg";
import { KPattern } from "cubing/kpuzzle";
import { KPuzzleDefinition } from "cubing/kpuzzle";
import { KTransformationData } from "cubing/kpuzzle";
import { from } from "./p-lazy";

export const twsearchPromise: Promise<typeof import("./twsearch")> = from(
    async () => import("./twsearch")
);

export interface TwsearchOptions {
    // TODO: start prune depth?
    generatorMoves?: string[];
    targetPattern?: KTransformationData;
    minDepth?: number;
    maxDepth?: number;
}

export async function wasmTwsearch(
    def: KPuzzleDefinition,
    pattern: KPattern,
    options?: TwsearchOptions
): Promise<Alg> {
    const { wasmTwsearch } = await twsearchPromise;
    return wasmTwsearch(def, pattern, options);
}

export async function wasmRandomScrambleForEvent(
    eventID: string
): Promise<Alg> {
    const { wasmRandomScrambleForEvent } = await twsearchPromise;
    return wasmRandomScrambleForEvent(eventID);
}
