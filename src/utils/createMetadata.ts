// #region IMPORTS

// Types and interfaces
import { type Metadata, type MetadataForMiniapp } from '../interfaces/metadata'

// Modules and libraries
import { generateMessageObjectsFromMetadata } from '../utils/generateMessageObjectsFromMetadata'

/**
 * @function createMetadata
 * @description Crea la metadata de miniapps para que puedan interactuar con las Layer 1
 * @param metadata - Metadata de la miniapp
 * @returns {MetadataForMiniapp} - Objeto de metadata para miniapps
 */
export const createMetadata = (metadata: Metadata): MetadataForMiniapp => {
	// Validar el parámetro metadata
	if (!metadata) {
		throw new Error('El objeto metadata es requerido')
	}

	if (typeof metadata !== 'object') {
		throw new Error('El parámetro metadata debe ser un objeto')
	}

	const requiredFields = ['icon', 'title', 'description', 'label']
	for (const field of requiredFields) {
		if (!metadata[field]) {
			throw new Error(`El campo '${field}' es requerido en el objeto metadata`)
		}
	}

	// Generar los objetos de mensaje a partir de la metadata
	let message
	try {
		message = generateMessageObjectsFromMetadata(metadata)
	} catch (error) {
		throw new Error(
			'Error al generar los objetos de mensaje: ' + +(error as Error).message
		)
	}

	// Retornar el objeto de metadata para miniapps
	return { metadata, message }
}
