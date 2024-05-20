import convertAlg from "./convertAlg";

const saveAlgs = (text) => {
    const names = [];
    const algs = [];
    let index = 0;
    let newLine = -1;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === `\n`) {
            newLine = i;
        } else if (text[i] === ":") {
            names.push(text.substring(newLine + 1, i));
        } else if (text[i] === `"`) {
            if (index === 0) {
                index = i;
            } else {
                algs.push(text.substring(index + 1, i));
                index = 0;
            }
        }
    }
    const algData = [];
    for (let i = 0; i < names.length; i++) {
        const data = {
            name: names[i],
            alg: algs[i],
            convertedAlg: convertAlg(algs[i]),
        };
        algData.push(data);
    }
    if (localStorage.getItem("algset")) {
        const algset = JSON.parse(localStorage.getItem("algset"));
        algset.algs = algData;
        algset.selectedAlgs = algData;
        algset.algText = text;
        localStorage.setItem("algset", JSON.stringify(algset));
        const algsets = JSON.parse(localStorage.getItem("algsets"));
        for (let i = 0; i < algsets.length; i++) {
            if (algsets[i].name === algset.name) {
                algsets[i] = algset;
            }
        }
        localStorage.setItem("algsets", JSON.stringify(algsets));
    }
    // } else {
    //     const algset = {
    //         name: "default",
    //         algs: algDataString,
    //         selectedAlgs: algDataString,
    //         times: JSON.stringify([]),
    //         algText: text,
    //         settings: JSON.stringify(["Planted", "All", "Custom"]),
    //     };
    //     localStorage.setItem("algset", JSON.stringify(algset));
    //     localStorage.setItem("algsets", JSON.stringify([algset]));
    // }
    // localStorage.setItem("algText", text);
    // localStorage.setItem("algData", algDataString);
    // localStorage.setItem("selectedAlgs", algDataString);
};

export default saveAlgs;
