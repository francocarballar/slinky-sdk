import {
	type Args,
	type ExtractsArgumentsTransaction
} from '../interfaces/transaction'

/**
 * @function extractTransactionArguments
 * @description Extrae argumentos de los parámetros de transacción y los valores de entrada.
 * @param {BlockchainParameter[]} parameters - Los parámetros necesarios para la transacción.
 * @param {Values} values - Los valores de entrada proporcionados.
 * @returns {Args} Los argumentos extraídos para la transacción.
 */
export const extractTransactionArguments = ({
	values,
	parameters
}: ExtractsArgumentsTransaction): Args[] => {
	return parameters.map(param => {
		const value = values[param.label]
		if (value === undefined) {
			throw new Error(`Missing value for ${param.label}`)
		}
		return param.type === 'uint256' ? BigInt(value as number) : value
	})
}
