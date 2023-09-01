const form = document.getElementById("car-form")
const titleElement = document.querySelector("#title")
const priceElement = document.querySelector("#price")
const urlElement = document.querySelector("#url")
const cardBody = document.querySelectorAll(".card-body")[1]
const clear = document.querySelector("#clear-cars")



//we need to star UI OBject

const ui = new UI()
const storage = new Storage()


//loading all events

eventListeners()

function eventListeners() {
    form.addEventListener("submit", addCar)


    document.addEventListener("DOMContentLoaded", function () {
        let cars = storage.getCarsFromStorage()
        ui.loadAllCars(cars)
    })

    cardBody.addEventListener("click", deleteCar)
    clear.addEventListener("click",clearAllCars)
}

function addCar(e) {
    e.preventDefault()
    const title = titleElement.value
    const price = priceElement.value
    const url = urlElement.value

    if (title === "" || price === "" || url === "") {
        //error
        ui.dissplayMessages("Please fill in all fields.", "danger")
    }
    else {
        //new car
        const newCar = new Car(title, price, url)
        ui.addCarToUI(newCar) //add cars to interface
        storage.addCarToStorage(newCar)
        ui.dissplayMessages("Added successfully", "success")
    }
    ui.clearInputs(titleElement, priceElement, urlElement)

}

function deleteCar(e) {
    if (e.target.id === "delete-car") {
        ui.deleteCarFromUI(e.target)
        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        ui.dissplayMessages("Delete successfully", "success")
    }
}
function clearAllCars(){
    
    if(confirm("Are you sure to delete all cars?")){
        ui.clearAllCarsFromUI()
        storage.clearAllCarsFromStorage()
    }
}
