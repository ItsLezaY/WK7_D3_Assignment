const getRacerData = async (season, round) => {
    try {
        const response = await axios.get(`http://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
        console.log(response);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error); // Log the error
    }
}

const racerTable = '#racerTable';

const createRacerRow = (position, name, nationality, sponsor, points) => {
    const html = `
        <tr>
            <td>${position}</td>
            <td>${name}</td>
            <td>${nationality}</td>
            <td>${sponsor}</td>
            <td>${points}</td>
        </tr>
    `;
    document.querySelector(racerTable).querySelector('tbody').insertAdjacentHTML('beforeend', html);
}

const loadData = async () => {
    const season = document.getElementById('season').value;
    const round = document.getElementById('round').value;

    if (season && round) {
        const data = await getRacerData(season, round);
        const racers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 7);

        // Clear existing table content
        document.querySelector(racerTable).querySelector('tbody').innerHTML = '';

        racers.forEach(racer => {
            const position = racer.position;
            const name = `${racer.Driver.givenName} ${racer.Driver.familyName}`;
            const nationality = racer.Driver.nationality;
            const sponsor = racer.Constructors[0].name;
            const points = racer.points;

            createRacerRow(position, name, nationality, sponsor, points);
        });
    } else {
        alert('Please enter both season and round.');
    }
}

const clearData = () => {
    document.querySelector(racerTable).querySelector('tbody').innerHTML = '';
}

document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    await loadData();
});

document.getElementById('clearData').addEventListener('click', function() {
    clearData();
});


