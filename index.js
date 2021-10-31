const API_KEY = 'YOUR API KEY';

async function getResponse(results) {

    const arrRandom = []

    arrRandom.push(Math.floor(Math.random(0.7e6) * 1e6));

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
        } catch {
            alert(e)
        }
    } catch (e) {
        console.log(new Error(e));
    }
}

async function createElements() {
    let results = [];
    await getResponse(results);
    results.forEach(item => {

        const casesColumnContainer = document.querySelector('#casesColumnContainer');
        const casesColumn = document.querySelector('#casesColumn');
        const cases = document.querySelector('#cases');
        const otherinfoContainer = document.querySelector('#otherinfoContainer');

        cases.innerHTML = `
        <h1>${item.name}</h1>
        <h2>${item.court.name}</h2>
        <a href="${item.frontend_url}">Link for case</a>
        `

        otherinfoContainer.innerHTML = `
        <h3>Date: ${item.decision_date}</h3>
        <h3>Number of case: ${item.docket_number}</h3>
        `

        casesColumnContainer.appendChild(casesColumn)
        casesColumn.appendChild(cases)
        cases.appendChild(otherinfoContainer)

    })
}