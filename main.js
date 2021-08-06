//Declare houses array
const houses = [
    {
        name: "Ravenclaw",
        id: 1,
        crest: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpASkqyFIpcwjUwpDqaMa5GiMbzRVSgvUwvQ97X5zNNhpNM3-GA8hZ5NW4-keUGvc6YmvpbWxi&usqp=CAc"
    },
    {   
        name: "Slytherin",
        id: 2,
        crest: "https://cdn.shopify.com/s/files/1/1325/3287/products/HP8040B_e8302e85-66d4-43c7-883c-0fb5171792f6.png"
    },
    {
        name: "Gryffindor",
        id: 3,
        crest: "https://m.media-amazon.com/images/I/915wv-U37QL._AC_SL1500_.jpg"
    },
    {
        name: "Hufflepuff",
        id: 4,
        crest: "https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/88364/91134/Harry-Potter-Hufflepuff-Crest-Official-wall-mounted-cardboard-cutout-buy-now-at-star__21122.1507644096.jpg?c=2"
    }
];


//Render elements to DOM
const renderToDom = (divId, textToRender) => {
    const selectedDiv = document.querySelector(divId);
    selectedDiv.innerHTML = textToRender;
};

//  create welcome button
const welcomebtn = () => {
    const domstring =
        `<button type="button" id="welcome" class="welcomebtn btn btn-primary btn-lg">Let's Start Sorting</button> `

    renderToDom("#start-button", domstring)
};

//Create Student Form
const studentForm = ("click", function (){
    const nameForm =`
    
    <div id="newDivForm">
    <form id="studentName">
    <div class="mb-3">
    <label for="name"class="form-label">Enter First Year's Name</label>
    <input required type="text"  placeholder="Enter Name" class="form-control" id="name">
    </div>
    <button type="submit" id="submit-btn" class="btn btn-primary">Sort</button>
    </form>
    </div>`

    renderToDom("#form", nameForm) 
    
    const formElement = document.querySelector("#newDivForm");
    formElement.addEventListener("submit", formSubmit);

 
});


//Declare student's array and reset
const students = []

const formSubmit = (event) => {
    event.preventDefault();
    const {name, crest} = sortHouse()
     let addStudent = {
      name: document.querySelector("#name").value,
      house: name,
      crest: crest
    };

    students.push(addStudent);
    newCard(students);

    document.querySelector("#studentName").reset 

};

//Sort students to houses
const sortHouse = () => {
    let randomHouse = houses[Math.floor(Math.random() * houses.length)];
    return randomHouse
};
//Create button events
const btnClickEvent = (event) =>{
    if(event.target.id === "welcome"){
        studentForm();
        const removeButton = document.querySelector("#start-button")
        removeButton.remove()
    }
};

const buttonEvents = () => {
    document.querySelector("#first-yr").addEventListener("click", expel);

    document.querySelector("#start-button")
    document.addEventListener("click", btnClickEvent);
    
      
  };




//Expel students to Voldemort's Army
const voldyArmy = []

const newVoldy = (array) => {
    let newVoldyCard = ""
    array.forEach((obj) => {
    newVoldyCard += 
    `<div class="card" style="width: 18rem;">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1JC-78wkTzQF1vpoZjpXU6jg18RANuc3jvg&usqp=CAU alt="${obj.house}">
    <div class="card-body">
        <h5 class="card-title">"The Death Eaters"</h5>
        <p class="card-text">This student has been condemned to the dark side</p>
    </div>
    </div>`;
    })

    renderToDom("#voldy-army", newVoldyCard);
    
};

const expel = (event) => {
    const targetId = event.target.id
    const targetType = event.target.type

    if (targetType === "button") {
        voldyArmy.push(students.splice(targetId, 1)[0])      
        newCard(students)
        newVoldy(voldyArmy)
    }
};
const newCard= (array) => {
    let oldCard = ""
    array.forEach((obj) => {
    oldCard += 
    `<div class="card" style="width: 18rem;">
    <img src=${obj.crest} class="card-img-top" alt="${obj.house}">
    <div class="card-body">
        <h5 class="card-title">${obj.house}!</h5>
        <p class="card-text">${obj.name}</p>
        <button type="button" class="btn btn-primary">Expel Student</button>
    </div>
    </div>`;
    })

    renderToDom("#first-yr", oldCard);
    
};
// Starts the app
const init = () => {
  welcomebtn();
  buttonEvents();
};

init();