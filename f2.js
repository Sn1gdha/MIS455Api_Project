let allMeals = [];
window.onload = function() {
    fetchAllMeals();  // Fetch and display all meals when the page loads
};

function fetchAllMeals() {
    // API URL to get all meals (limit to 20 for performance reasons)
    var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            allMeals = data.meals;
            displayAllMeals();
        });
}

function displayAllMeals() {
    var oldContent = document.getElementById("displayArea");
    oldContent.textContent = ""; // Clear previous results

    if (allMeals && allMeals.length > 0) {
        allMeals.forEach((meal, index) => {
            var newDiv = document.createElement("div");
            newDiv.classList.add("card");

            console.log(`#${index}-${meal.strMeal}`);

            newDiv.innerHTML = `
                <h4>${meal.strMeal}</h4>
                <img src="${meal.strMealThumb}">
                <button onclick="showModal('${meal.strMeal}', '${meal.strMealThumb}', \`${meal.strInstructions}\`, '${meal.idMeal}', '${meal.strArea}', '${meal.strTags}')">
                    View Details
                </button>
            `;

            oldContent.appendChild(newDiv);
        });
    } else {
        oldContent.innerHTML = "<p>No meals found.</p>";
    }
}


function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');

document.querySelector('.search-btn').addEventListener('click', () => {
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
        searchInput.style.opacity = '1';
        searchInput.focus();
    } else {
        searchInput.style.opacity = '0';
    }
});

function connect() {
    var searchTerm = document.getElementById("searchBox").value;
    document.getElementById("searchBox").value = "";

    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => process(data));
}

function process(data) {
    allMeals = data.meals;
    var oldContent = document.getElementById("displayArea");
    oldContent.textContent = "";
    console.log("Meal Titles-");

    for (let i = 0; i < 5 && i < allMeals.length; i++) {
        var meal = allMeals[i];
        var newDiv = document.createElement("div");
        newDiv.classList.add("card");

        console.log(`#${i}-${meal.strMeal}`);

        newDiv.innerHTML = `
            <h4>${meal.strMeal}</h4>
            <img src="${meal.strMealThumb}">
            <button onclick="showModal('${meal.strMeal}', '${meal.strMealThumb}', \`${meal.strInstructions}\`, '${meal.idMeal}', '${meal.strArea}', '${meal.strTags}')">
                View Details
            </button>
        `;

        oldContent.appendChild(newDiv);
    }

    if (allMeals.length > 4) {
        var showMoreButton = document.createElement("button");
        showMoreButton.classList.add("show-more");
        showMoreButton.textContent = "Show More";
        showMoreButton.onclick = function () {
            showAllMeals(data);
            showMoreButton.remove();
        };

        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('show-more-container');
        buttonContainer.appendChild(showMoreButton);

        oldContent.appendChild(buttonContainer);
    }
}

function showAllMeals(data) {
    var oldContent = document.getElementById("displayArea");

    for (let i = 4; i < allMeals.length; i++) {
        var meal = allMeals[i];
        var newDiv = document.createElement("div");
        newDiv.classList.add("card");

        console.log(`#${i}-${meal.strMeal}`);

        newDiv.innerHTML = `
            <h4>${meal.strMeal}</h4>
            <img src="${meal.strMealThumb}">
            <button onclick="showModal('${meal.strMeal}', '${meal.strMealThumb}', \`${meal.strInstructions}\`)">
                View Details
            </button>
        `;

        oldContent.appendChild(newDiv);
    }
}

function showModal(title, image, instructions, idMeal, area, tags) {
    document.getElementById("modalMealTitle").innerText = title;
    document.getElementById("modalMealImage").src = image;
    document.getElementById("modalMealInstructions").innerText = instructions;
    document.getElementById("modalMealId").innerText = `ID: ${idMeal}`;
    document.getElementById("modalMealArea").innerText = `Area: ${area}`;
    document.getElementById("modalMealTags").innerText = `Tags: ${tags}`;
    document.getElementById("instructionModal").style.display = "block";
}

function closeModal() {
    document.getElementById("instructionModal").style.display = "none";
}
function showAllRecipes() {
    var oldContent = document.getElementById("displayArea");

    // Loop through all meals and display them
    allMeals.forEach((meal, index) => {
        var newDiv = document.createElement("div");
        newDiv.classList.add("card");

        console.log(`#${index}-${meal.strMeal}`);

        newDiv.innerHTML = `
            <h4>${meal.strMeal}</h4>
            <img src="${meal.strMealThumb}">
            <button onclick="showModal('${meal.strMeal}', '${meal.strMealThumb}', \`${meal.strInstructions}\`, '${meal.idMeal}', '${meal.strArea}', '${meal.strTags}')">
                View Details
            </button>
        `;

        oldContent.appendChild(newDiv);
    });
}