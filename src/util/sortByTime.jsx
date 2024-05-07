const sortByTime = (algs, sortBy) => {
    const timeData = JSON.parse(localStorage.getItem("times"));
    if (timeData) {
        const bestTimes = [];
        for (let i = 0; i < algs.length; i++) {
            const times = [];
            for (let j = 0; j < timeData.length; j++) {
                if (timeData[j].name === algs[i].name) {
                    times.push(timeData[j]);
                }
            }
            if (times.length > 0) {
                if (sortBy === "best") {
                    let lowest = times[0].time;
                    for (let j = 0; j < times.length; j++) {
                        if (times[j].time < lowest) {
                            lowest = times[j].time;
                        }
                    }
                    const data = {
                        name: algs[i].name,
                        best: lowest,
                    };
                    bestTimes.push(data);
                } else if (sortBy === "avg") {
                    let total = 0;
                    for (let j = 0; j < times.length; j++) {
                        total += times[j].time;
                    }
                    const data = {
                        name: algs[i].name,
                        best: Math.round(total / times.length),
                    };
                    console.log(data.best);
                    bestTimes.push(data);
                }
            }
        }
        algs.sort((a, b) => a.name.localeCompare(b.name));
        algs.sort((a, b) => {
            const bestTimeA = bestTimes.find((item) => item.name === a.name);
            const bestTimeB = bestTimes.find((item) => item.name === b.name);
            if (bestTimeA && bestTimeB) {
                return bestTimeA.best - bestTimeB.best;
            } else if (bestTimeA) {
                return -1; // 'a' has a best time, move it before 'b'
            } else if (bestTimeB) {
                return 1; // 'b' has a best time, move it before 'a'
            } else {
                // If both 'a' and 'b' have no best times, sort them alphabetically
                return a.name.localeCompare(b.name);
            }
        });
    }
};

export default sortByTime;
