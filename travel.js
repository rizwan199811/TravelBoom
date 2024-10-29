function thankyou(){
    alert('Thank you for contacting us!')
}

document.getElementById('btnReset').addEventListener('click', function() {
    // document.getElementById('results').innerHTML = '';
    displayRecommendations([])
});



let data;
document.addEventListener("DOMContentLoaded", () => {
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        console.log(data)
    })
    .catch(error => console.error('Error fetching data:', error));

document.getElementById('searchButton').addEventListener('click', function(e) {
    e.preventDefault()
    const input = document.getElementById('searchInput').value.toLowerCase();
    console.log({input})
    let results = [];

    if (!data) {
        console.error('Data not yet fetched');
        return;
    }

    if(input == "beach" || input == "beaches"){
        data.beaches.forEach(beach => {
            results.push(beach)
        });
    }else if(input == "temples" || input == "temple"){
        data.temples.forEach(temple => {
            results.push(temple);
        });
    }else if(input == "country" || input == "countries"){
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push(city);
            });
        });
    }

    console.log(results)
    displayRecommendations(results);
});



function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = 'No results found.';
        return;
    }

    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
        <img src="${result.imageUrl}" alt="Image of ${result.name}" class="img-fluid">
                        <div class="card-body">
                            <h4 class="card-title">${result.name}</h4>
                            <p class="card-text">${result.description}</p>
                            <a href="#" class="btn-visit">Visit</a>
                        </div>`;
        resultsDiv.appendChild(item);
    });
}

function displayRecommendations(results) {
    const recommendationContainer = document.getElementById('recommendation-container'); // Add this container in HTML
    recommendationContainer.innerHTML = ''; // Clear any existing content

    results.forEach(result => {     
            const column = document.createElement("div");
            column.classList.add("col-md-4", "mb-4"); // Bootstrap column

            const card = document.createElement("div");
            card.classList.add("recommendation-card");

            card.innerHTML = `
            <img src="${result.imageUrl}" alt="Image of ${result.name}" class="img-fluid">
            <div class="card-body">
                <h4 class="card-title">${result.name}</h4>
                <p class="card-text">${result.description}</p>
                <a href="#" class="btn-visit">Visit</a>
            </div>
        `;
            column.appendChild(card);
            recommendationContainer.appendChild(column);
       
    });
}
})