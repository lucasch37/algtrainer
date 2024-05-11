const saveAlgset = (algset) => {
    let index = 0;
    const algsets = JSON.parse(localStorage.getItem("algsets"));
    for (let i = 0; i < algsets.length; i++) {
        if (algsets[i].name === algset.name) {
            index = i;
        }
    }
    algsets[index] = algset;
    localStorage.setItem("algsets", JSON.stringify(algsets));
    // console.log(
    //     JSON.parse(JSON.parse(localStorage.getItem("algsets"))[0]).name
    // );
};

export default saveAlgset;
