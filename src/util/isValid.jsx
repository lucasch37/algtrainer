const isValid = (text) => {
    const valid = [
        "R",
        "L",
        "U",
        "D",
        "F",
        "B",
        "r",
        "l",
        "u",
        "d",
        "b",
        "f",
        "'",
        "2",
        "3",
        "x",
        "y",
        "z",
        "S",
        "E",
        "M",
    ];
    let checkAlg = false;
    let checkQuotes = false;
    let nameCount = 0;
    let algCount = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === `"`) {
            checkQuotes = false;
            checkAlg = !checkAlg;
        } else if (checkAlg) {
            if (text[i] !== " " && valid.indexOf(text[i]) === -1) {
                return false;
            } else if (text[i] !== " ") {
                if (
                    text[i + 1] !== `"` &&
                    text[i + 1] !== "'" &&
                    text[i + 1] !== " " &&
                    text[i + 1] !== "2" &&
                    text[i + 1] !== "3"
                ) {
                    return false;
                }
            }
        } else if (text[i] === "\n") {
            nameCount = 0;
        } else if (text[i] === ":") {
            checkQuotes = true;
            algCount++;
            nameCount++;
            if (nameCount > 1) {
                return false;
            }
        } else if (checkQuotes) {
            if (text[i] !== " " && text[i] !== `"`) {
                return false;
            }
        }
    }
    if (algCount > 200) {
        return false;
    }
    if (checkQuotes || checkAlg) {
        return false;
    }
    return true;
};

export default isValid;
