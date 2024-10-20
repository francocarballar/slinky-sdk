// #region IMPORTS

// Types and interfaces
import {
	type GenerateTransactionData,
	type TransactionData
} from '../interfaces/transaction'

// Constants
import {
	ABI,
	DESTINATION_ADDRESS,
	DESTINATION_CHAIN,
	FUNCTION_NAME,
	GAS_LIMIT
} from '../constants'

// Modules and libraries
import { encodeFunctionData } from 'viem'
import { extractTransactionArguments } from './extractTransactionArguments'

// #region MODULE
/**
 * @function generateTransactionData
 * @description Genera datos de transacción para los metadatos y valores de entrada proporcionados.
 * @param {Metadata} metadata - Metadatos de la transacción.
 * @param {Values} values - Valores de entrada para la transacción.
 * @returns Una matriz de datos de transacción.
 */
export const generateTransactionData = ({
	metadata,
	values
}: GenerateTransactionData): TransactionData[] => {
	if (!metadata?.actions?.length) {
		throw new Error('No actions available in metadata')
	}

	return metadata.actions.map(action => {
		const {
			contractAddress,
			transactionParameters,
			contractABI,
			functionName
		} = action

		const args = extractTransactionArguments({
			values,
			parameters: transactionParameters
		})

		const encodedFunctionCall = encodeFunctionData({
			abi: contractABI,
			functionName,
			args
		})

		// #region RETURN
		return {
			abi: ABI,
			address: contractAddress,
			functionName: FUNCTION_NAME,
			args: [
				contractAddress,
				encodedFunctionCall,
				DESTINATION_ADDRESS,
				DESTINATION_CHAIN,
				GAS_LIMIT
			]
		}
	})
}
