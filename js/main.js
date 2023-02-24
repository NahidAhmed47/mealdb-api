const searchDataLoad = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data));
};
// Display meals
const displayMeals = (meals) => {
  const parentDiv = document.getElementById("food-card-container");
  parentDiv.innerText = '';
  for (const meal of meals.meals) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card grid grid-cols-2 bg-base-100 shadow-xl">
                <figure><img class="w-fit" src="${meal.strMealThumb}" alt="Album"/></figure>
                <div class="card-body px-6 py-10">
                  <h2 class="text-3xl font-bold">${meal.strMeal}</h2>
                  <p>There are many variations of passages of available, but the majority have suffered</p>
                  <label onclick="loadMealDetails(${meal.idMeal})" for="my-modal-6" class="text-[#FFC107] underline p-3 cursor-pointer">View Details</label>
         </div>
        `;
    parentDiv.appendChild(div);
  }
  let totalChild = parentDiv.children;
  console.log(totalChild);
};
// get input value
const searchText = () => {
  const search = document.getElementById("search-input");
  const searchValue = search.value;
  search.value = "";
  searchDataLoad(searchValue);
};
// Load meal id data
const loadMealDetails = async (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetails(data);
};
// display meal details
const displayMealDetails = (data) => {
  const parentDiv = document.getElementById("modal-div");
  const div = document.createElement("div");
  div.innerHTML = `
                 <input type="checkbox" id="my-modal-6" class="modal-toggle" />
                  <div class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                    <img class="w-[150px]" src="${data.meals[0].strMealThumb}"/>
                      <h3 id="modal-title" class="font-semibold text-lg"><span class="font-bold">Name:</span> ${data.meals[0].strMeal}</h3>
                      <p class="mt-3"><span class="font-bold">Category:</span> ${data.meals[0].strCategory}</p>
                      <p class="mt-1"><span class="font-bold">Country Origin:</span> ${data.meals[0].strArea}</p>
                      <p class="mt-1"><span class="font-bold">YouTube:</span> ${data.meals[0].strYoutube}</p>
                      <div class="modal-action">
                        <label onclick="pickItem()"  for="my-modal-6" class="btn border-none outline-none bg-[#FFC107] text-black">Pick Item</label>
                      </div>
                    </div>
                  </div>
    `;
  parentDiv.appendChild(div);
};
// Pick item empty
const pickItem = () => {
  const parentDiv = document.getElementById("modal-div");
  parentDiv.innerText = "";
};
