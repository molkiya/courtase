const casesColumnContainer = document.querySelector('#casesColumnContainer');
const casesColumn = document.querySelector('#casesColumn');
const cases = document.querySelector('#cases');
const otherinfoContainer = document.querySelector('#otherinfoContainer');

const API_KEY = 'YOUR_API_KEY';

async function getResponse(results) {
    const arrRandom = []
    arrRandom.push(
        Math.floor(Math.random(0.7e6) * 1e6)
    );
    try {
        results.length = 0;
        try {
            for (let randomCase of arrRandom) {
                let response = await fetch(
                    `https://api.case.law/v1/cases/${randomCase}/`,
                    headers={'Authorization': API_KEY }
                );
                results.push(await response.json());
            }
        } catch (e) {
            alert(`Something gone wrong ${e}`)
            console.log(e)
        }
        console.log(results)
    } catch (e) {
        console.log(e);
    }
}

async function createElements() {
    const results = [];
    await getResponse(results)
    results.map(item => {
        let docketNumber,
            date

        item.docket_number === "" ? docketNumber = "none" : docketNumber = item.docket_number
        item.decision_date === "" ? date = "none" : date = item.decision_date

        cases.innerHTML = `
            <h1>${item.name}</h1>
            <h2>${item.court.name}</h2>
            <a class="caseLink" href="${item.frontend_url}">Link for case</a>
        `

        otherinfoContainer.innerHTML = `
            <h3>Date: ${date}</h3>
            <h3>Number of case: ${docketNumber}</h3>
        `

        casesColumnContainer.appendChild(casesColumn)
        casesColumn.appendChild(cases)
        cases.appendChild(otherinfoContainer)
    })
}