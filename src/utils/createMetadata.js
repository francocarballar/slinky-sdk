"use strict";
// #region IMPORTS
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetadata = void 0;
// Modules and libraries
var generateMessageObjectsFromMetadata_1 = require("@utils/generateMessageObjectsFromMetadata");
/**
 * @function createMetadata
 * @description Crea la metadata de miniapps para que puedan interactuar con las Layer 1
 * @param metadata - Metadata de la miniapp
 * @returns {MetadataForMiniapp} - Objeto de metadata para miniapps
 */
var createMetadata = function (metadata) {
    // Validar el parámetro metadata
    if (!metadata) {
        throw new Error('El objeto metadata es requerido');
    }
    if (typeof metadata !== 'object') {
        throw new Error('El parámetro metadata debe ser un objeto');
    }
    var requiredFields = ['icon', 'title', 'description', 'label'];
    for (var _i = 0, requiredFields_1 = requiredFields; _i < requiredFields_1.length; _i++) {
        var field = requiredFields_1[_i];
        if (!metadata[field]) {
            throw new Error("El campo '".concat(field, "' es requerido en el objeto metadata"));
        }
    }
    // Generar los objetos de mensaje a partir de la metadata
    var message;
    try {
        message = (0, generateMessageObjectsFromMetadata_1.generateMessageObjectsFromMetadata)(metadata);
    }
    catch (error) {
        throw new Error('Error al generar los objetos de mensaje: ' + +error.message);
    }
    // Retornar el objeto de metadata para miniapps
    return { metadata: metadata, message: message };
};
exports.createMetadata = createMetadata;
