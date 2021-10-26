// 207bd7f40150417e1002a825942ac75437ca6319 API: KEY

const results = [];

async function getResponse(results) {

    const arrRandom = []

    for (let a = 0; a < 10; a++) {
        arrRandom.push(Math.floor(Math.random(0.7e6) * 1e6));
    }

    console.log(arrRandom)

    try {
        for (let randomCase of arrRandom) {
            let response = await fetch(
                `https://api.case.law/v1/cases/${randomCase}/`,
                headers={'Authorization': '207bd7f40150417e1002a825942ac75437ca6319'}
            );
            results.push(await response.json());
        }
    } catch (e) {
        console.log(new Error(e));
    }

    console.log(results)
}

getResponse(results)