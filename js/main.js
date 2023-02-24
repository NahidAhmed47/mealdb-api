const searchDataLoad = search => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data));
};
// Display meals
const displayMeals = (meals) => {
  const parentDiv = document.getElementById("food-card-container");
  for (const meal of meals.meals) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card grid grid-cols-2 bg-base-100 shadow-xl">
                <figure><img class="w-fit" src="${meal.strMealThumb}" alt="Album"/></figure>
                <div class="card-body px-6 py-10">
                  <h2 class="text-3xl font-bold">${meal.strMeal}</h2>
                  <p>There are many variations of passages of available, but the majority have suffered</p>
                  <label onclick="loadMealDetails(${meal.idMeal})" for="my-modal-6" class="text-[#FFC107] underline">View Details</label>
         </div>
        `;
    parentDiv.appendChild(div);
  }
};
// get input value
const searchText = () => {
  const searchValue = document.getElementById("search-input").value;
  searchDataLoad(searchValue);
};
// Load meal id data
const loadMealDetails = async(idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data);
}
// display meal details
const displayMealDetails = data => {
    console.log(data.meals[0]);
    const parentDiv = document.getElementById('modal-div');
    const div = document.createElement('div');
    div.innerHTML = `
                 <input type="checkbox" id="my-modal-6" class="modal-toggle" />
                  <div class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                    <img class="w-[250px]" src="${data.meals[0].strMealThumb}"/>
                      <h3 id="modal-title" class="font-bold text-lg">Name: ${data.meals[0].strMeal}</h3>
                      <p class="py-4">Category: ${data.meals[0].strCategory}</p>
                      <p class="py-4">Food Origin: ${data.meals[0].strArea}</p>
                      <p class="py-4">Find YouTube: ${data.meals[0].strYoutube}</p>
                      <div class="modal-action">
                        <label for="my-modal-6" class="btn">Close</label>
                      </div>
                    </div>
                  </div>
    `;
    parentDiv.appendChild(div);
}
