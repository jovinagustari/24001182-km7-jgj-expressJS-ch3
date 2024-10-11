const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = (manufacture, type, transmission) => {
    return carRepository.getCars(manufacture, type, transmission);
};

exports.getCarById = (id) => {
    const car = carRepository.getCarById(id);
    if (!car) {
        throw new NotFoundError("Car is Not Found!");
    }

    return car;
};

exports.createCar = async (data, file) => {
    // Upload file to image kit
    if (file?.image) {
        data.image = await imageUpload(file.image);
    }

    // Create the data
    return carRepository.createCar(data);
};

exports.updateCar = async (id, data, file) => {
    // find car is exist or not (validate the data)
    const existingCar = carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    // replicated existing data with new data
    data = {
        ...existingCar, // existing car
        ...data,
    };

    // Upload file to image kit
    if (file?.image) {
        data.image = await imageUpload(file.image);
    }

    // if exist, we will update the car data
    const updatedCar = carRepository.updateCar(id, data);
    if (!updatedCar) {
        throw new InternalServerError(["Failed to update car!"]);
    }

    return updatedCar;
};

exports.deleteCarById = (id) => {
    // find car is exist or not (validate the data)
    const existingCar = carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    // if exist, we will delete the car data
    const deletedCar = carRepository.deleteCarById(id);
    if (!deletedCar) {
        throw new InternalServerError(["Failed to delete car!"]);
    }

    return deletedCar;
};