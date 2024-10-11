const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
    // Validate the query
    const validateQuery = z.object({
        manufacture: z.string().optional(),
        type: z.string().optional(),
        transmission: z.string().optional()
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
};

exports.validateGetCarById = (req, res, next) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};

exports.validateCreateCar = (req, res, next) => {
    // Validation body schema
    const validateBody = z.object({
        plate: z.string().optional().nullable(),
        manufacture: z.string().optional().nullable(),
        model: z.string().optional().nullable(),
        rentPerDay: z.string().optional().nullable(),
        capacity: z.string().optional().nullable(),
        description: z.string().optional().nullable(),
        availableAt: z.string().optional().nullable(),
        transmission: z.string().optional().nullable(),
        available: z.string().optional().nullable(),
        type: z.string().optional().nullable(),
        year: z.string().optional().nullable(),
        options: z.string().optional().nullable(),
        specs: z.string().optional().nullable(),
    });
       
    // The file is not required
    const validateFileBody = z
        .object({
            image: z
                .object({
                    name: z.string(),
                    data: z.any(),
                })
                .nullable().optional(),
        })
        .nullable().optional();

    // Validate
    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    // Validate
    const resultValidateFiles = validateFileBody.safeParse(req.files);
    if (!resultValidateFiles.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateFiles.error.errors);
    }

    // Convert to car data format
    req.body = {
        ...req.body,
        rentPerDay: parseInt(req.body["rentPerDay"]) || null, // Convert to number or null if invalid
        capacity: parseInt(req.body["capacity"]) || null,
        availableAt: new Date(req.body["availableAt"]),
        year: parseInt(req.body["year"]) || null,
        available: req.body["available"] === "true", // Convert string to boolean
        options: req.body["options"] ? JSON.parse(req.body["options"]) : [], // Parse stringified array
        specs: req.body["specs"] ? JSON.parse(req.body["specs"]) : [],
    };

    next();
};

exports.validateUpdateCar = (req, res, next) => {
    // zod validation
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    // Validation body schema
    const validateBody = z.object({
        plate: z.string().optional().nullable(),
        manufacture: z.string().optional().nullable(),
        model: z.string().optional().nullable(),
        rentPerDay: z.string().optional().nullable(),
        capacity: z.string().optional().nullable(),
        description: z.string().optional().nullable(),
        availableAt: z.string().optional().nullable(),
        transmission: z.string().optional().nullable(),
        available: z.string().optional().nullable(),
        type: z.string().optional().nullable(),
        year: z.string().optional().nullable(),
        options: z.string().optional().nullable(),
        specs: z.string().optional().nullable(),
    });

    // The file is not required
    const validateFileBody = z
        .object({
            image: z
                .object({
                    name: z.string(),
                    data: z.any(),
                })
                .nullable().optional(),
        })
        .nullable().optional();

    // Validate
    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateBody.error.errors);
    }

    // Validate
    const resultValidateFiles = validateFileBody.safeParse(req.files);
    if (!resultValidateFiles.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateFiles.error.errors);
    }

    // Convert to car data format
    req.body = {
        ...req.body,
        rentPerDay: parseInt(req.body["rentPerDay"]) || null, // Convert to number or null if invalid
        capacity: parseInt(req.body["capacity"]) || null,
        availableAt: new Date(req.body["availableAt"]),
        year: parseInt(req.body["year"]) || null,
        available: req.body["available"] === "true", // Convert string to boolean
        options: req.body["options"] ? JSON.parse(req.body["options"]) : [], // Parse stringified array
        specs: req.body["specs"] ? JSON.parse(req.body["specs"]) : [],
    };

    next();
};

exports.validateDeleteCarById = (req, res, next) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};