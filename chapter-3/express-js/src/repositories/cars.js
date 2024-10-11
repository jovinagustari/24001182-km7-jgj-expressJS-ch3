const fs = require("fs");
const cars = require("../../data/cars.json");
const { v4: uuidv4 } = require('uuid'); // Import uuid library

exports.getCars = (manufacture, type, transmission) => {
    const searchedCar = cars.filter((car) => {
        // Do filter logic here
        let result = true;
        if (manufacture) {
            const isFoundManufacture = car.manufacture
                .toLowerCase()
                .includes(manufacture.toLowerCase());
            result = result && isFoundManufacture;
        }
        if (type) {
            const isFoundType = car.type
                .toLowerCase()
                .includes(type.toLowerCase());
            result = result && isFoundType;
        }
        if (transmission) {
            const isFoundTransmission = car.transmission
                .toLowerCase()
                .includes(transmission.toLowerCase());
            result = result && isFoundTransmission;
        }

        return result;
    });
    return searchedCar;
};

exports.getCarById = (id) => {
    // find student by id
    const car = cars.find((car) => car.id == id);
    return car;
};

exports.createCar = (data) => {
    // Create a new car object
    const newCar = {
        id: uuidv4(), // Generate a new UUID
        ...data,      // Include the rest of the car data from the request
    };

    /* Add data to current array Cars */
    cars.push(newCar);

    // Save the latest data to json
    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );

    return newCar;
};

exports.updateCar = (id, data) => {
    // Find the existing car data
    const car = cars.find((car) => car.id == id);
    if (!car) {
        // Make a error class
        throw new NotFoundError("car is Not Found!");
    }

    // Update the data
    Object.assign(car, data);

    // Update the json data
    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );

    return car;
};

exports.deleteCarById = (id) => {
    // Find index
    const carIndex = cars.findIndex((car) => car.id == id);

    if (carIndex < 0) {
        // If no index found
        return null;
    }

    const deletedCar = cars.splice(carIndex, 1);

    // Update the json
    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );
    return deletedCar;
};