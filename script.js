//load all pokemon
function loadPokemon(){
  document.querySelector('.availablePokemon').innerHTML = '';
for (let i = 1; i < 808; i++) {
  let baseURL = "https://pokeapi.co/api/v2/pokemon";
  let url = baseURL + "/" + `${i}`;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let newpokemon = document.createElement("img");
      newpokemon.setAttribute("src", data.sprites.front_default);
      newpokemon.setAttribute("class", "pokemon");
      newpokemon.setAttribute("data-pokemon-name", data.name);
      newpokemon.style = `order:${i}`;
      newpokemon.addEventListener("click", clearDisplay);
      newpokemon.addEventListener("click", populateInfo);
      document.querySelector(".availablePokemon").appendChild(newpokemon);
    });
}
}
loadPokemon();

let searchLabel = document.querySelector('.searchLabel');
let searchIcon = document.querySelector('.searchIcon');
let search = document.querySelector('.search');
let searchBox = document.querySelector('.searchBox');
let searchExtended = false;
let searchPhrase = '';

//slide search bar in or out
searchLabel.addEventListener('click', function(){
  if(searchExtended){
    search.style.transform = 'translateX(-220px)';
    searchExtended = false;
  }else{
    search.style.transform = 'translateX(0)';
    searchExtended = true;
  }
})

//event listener for search bar
searchIcon.addEventListener('click', function(e){
  searchPhrase = searchBox.value;
  document.querySelector('.availablePokemon').innerHTML = '';
  searchResult(searchPhrase);
});


//populate pokemon based on search  
function searchResult(keyword){
  for(let i = 1; i < 808; i++) {
  let baseURL = "https://pokeapi.co/api/v2/pokemon";
  let url = baseURL + "/" + `${i}`;  
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
    if(data.name.toLowerCase().includes(keyword.toLowerCase())){
      console.log(i);
      let newpokemon = document.createElement("img");
      newpokemon.setAttribute("src", data.sprites.front_default);
      newpokemon.setAttribute("class", "pokemon");
      newpokemon.setAttribute("data-pokemon-name", data.name);
      newpokemon.style = `order:${i}`;
      newpokemon.addEventListener("click", clearDisplay);
      newpokemon.addEventListener("click", populateInfo);
      document.querySelector(".availablePokemon").appendChild(newpokemon);
    }
    });
}
  //clear search results and reload all pokemon
  let resetSearch = document.createElement('div');
  resetSearch.setAttribute('class','reset');
  let resetSymbol = document.createElement('p');
  resetSymbol.setAttribute('class', 'resetSymbol');
  resetSymbol.innerHTML = '⟲';
  resetSearch.appendChild(resetSymbol);
  resetSearch.addEventListener('click', loadPokemon);
  document.querySelector(".availablePokemon").appendChild(resetSearch);
  
}

let checkLoad = setInterval( () => {
if(document.readyState === 'complete'){
  clearInterval(checkLoad);
  let center = document.querySelector('.border');
  let top = document.querySelector('.top');
  let bottom = document.querySelector('.bottom');
  center.style.animationPlayState = 'paused';
  top.style.animationName = 'moveUp';
  bottom.style.animationName = 'moveDown';
}
}, 500);


function titleCase(input){
  let splitWords = [...input.split(' ')];
  let title = [];
  splitWords.forEach(function(word){
    let split = word.split('');
    split[0] = split[0].toUpperCase();
    title.push(split.join(''));
  })
  return title.join(' ');
}


function clearDisplay() {
  document.querySelector(".displayInfo").innerHTML = "";
}

function populateInfo(pokemon) {
  let baseURL = "https://pokeapi.co/api/v2/pokemon";
  let name = this.getAttribute("data-pokemon-name");
  let url = baseURL + "/" + name;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let display = document.querySelector(".displayInfo");
      let identity = document.createElement('div');
      identity.setAttribute('class', 'identity');
      display.appendChild(identity)
      if (document.querySelector(".displayImage")) {
        document
          .querySelector(".displayImage")
          .setAttribute("src", data.sprites.front_default);
      } else {
        let displayImage = document.createElement("img");
        displayImage.setAttribute("src", data.sprites.front_default);
        displayImage.setAttribute("class", "displayImage");
        document.querySelector(".platform").appendChild(displayImage);
      }
      let name = document.createElement("h2");
      let nameContent = data.name.toUpperCase();
      name.setAttribute("class", "name");
      name.innerHTML = nameContent;
      identity.appendChild(name);

      let type = document.createElement("h4");
      type.setAttribute("class", "type");
      if (data.types.length === 2) {
        let type1 = data.types[0].type.name;
        let type2 = data.types[1].type.name;
        type1 = titleCase(type1);
        type2 = titleCase(type2);
        type.innerHTML = `<span id = ${type1.toLowerCase()}>${type1}</span> / <span id = ${type2.toLowerCase()}>${type2}</span>`;
        identity.appendChild(type);
      } else {
        let type1 = data.types[0].type.name;
        type1 = titleCase(type1);
        type.innerHTML = `${type1}`;
        type.setAttribute("id", data.types[0].type.name);
        identity.appendChild(type);
      }
      let idNumber = document.createElement("p");
      idNumber.setAttribute("class", "idNumber");
      idNumber.innerHTML = "#" + data.id;
      identity.appendChild(idNumber);
    
      let information = document.createElement('div');
      information.setAttribute('class', 'information');
      display.appendChild(information);
      let getGeneration = data.id;
      let generation;
      switch(true){
          case(getGeneration < 152):
            generation = 'I';
            break;
          case(getGeneration < 252):
            generation = 'II';
            break;
          case(getGeneration < 387):
            generation = 'III';
            break;
          case(getGeneration < 494):
            generation = 'IV';
            break;
          case (getGeneration < 650):
            generation = 'V';
            break;
          case(getGeneration < 722):
            generation = 'VI';
            break;
          case(getGeneration < 810):
            generation = 'VII';
            break;
          case(getGeneration < 813):
            generation = 'VIII';
            break;
      }
      let displayGeneration = document.createElement('p');
      displayGeneration.setAttribute('class', 'displayGeneration');
      displayGeneration.innerHTML = `Generation ${generation}`;
      identity.appendChild(displayGeneration);
    
    
      let weight = (data.weight * .1).toFixed(1);
      let height = (data.height * .1).toFixed(1);
      let displayHtWt = document.createElement('p');
      displayHtWt.setAttribute('class', 'displayHtWt');
      displayHtWt.innerHTML = `Height: ${height}m | Weight: ${weight}kg`;
      information.appendChild(displayHtWt);
    
      let moves = data.moves;
      let movesTitle = document.createElement('p');
      movesTitle.setAttribute('class', 'movesTitle');
      movesTitle.innerHTML = 'Moves learned through leveling up (under level 10):';
      information.appendChild(movesTitle);
      let movesList = document.createElement('ul');
      movesList.setAttribute("class", "movesList");
      information.appendChild(movesList);
      moves.forEach(function(move){
        if(move.version_group_details[0].level_learned_at < 10 && move.version_group_details[0].move_learn_method.name === "level-up"){
          let listMove = document.createElement('li');
          listMove.innerHTML = titleCase(move.move.name);
          movesList.appendChild(listMove);
        }
      })
    let gamesTitle = document.createElement('p');
        gamesTitle.setAttribute('class', 'gamesTitle');
        gamesTitle.innerHTML = 'First Video Game Appearance:';
        information.appendChild(gamesTitle);
        let gameIndex1 = data.game_indices[data.game_indices.length -1];
        let gameIndex2 = data.game_indices[data.game_indices.length -2];
          let game1 = titleCase(gameIndex1.version.name);
          let game2 = titleCase(gameIndex2.version.name);
          let addGame = document.createElement('p');
          addGame.innerHTML = `${game1} & ${game2}`;
          addGame.setAttribute('class', 'listGames')
          information.appendChild(addGame);
    });
}

