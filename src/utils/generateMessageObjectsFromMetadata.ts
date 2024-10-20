// #region IMPORTS

// Types and interfaces
import { type Metadata, type MessageObject } from '../interfaces/metadata'
import { type BlockchainAction } from '../interfaces/blockchainAction'

// Modules and libraries
import { hexlify, zeroPad } from '@ethersproject/bytes'
import { encodeFunctionData } from 'viem'

/**
 * @function generateMessageObjectsFromMetadata
 * @param {Metadata} metadataObject
 * @description Genera el objeto de mensaje requerido por el contrato SL1Sender.sol a partir de un objeto de metadatos
 * @returns {MessageObject[] | undefined} Un arreglo de objetos de mensaje o indefinido si no hay acciones en los metadatos
 */
export function generateMessageObjectsFromMetadata (
	metadataObject: Metadata
): MessageObject[] | undefined {
	if (!metadataObject) {
		throw new Error('Metadata object is required')
	}
	if (!metadataObject.actions || !Array.isArray(metadataObject.actions)) {
		throw new Error('Metadata actions must be an array')
	}

	if (!metadataObject.actions || metadataObject.actions.length === 0) {
		return undefined
	}

	return metadataObject.actions.map((action: BlockchainAction) => {
		if (!action.contractAddress) {
			throw new Error('Contract address is required for each action')
		}
		if (!/^0x[a-fA-F0-9]{40}$/.test(action.contractAddress)) {
			throw new Error('Invalid contract address format')
		}
		if (
			!action.transactionParameters ||
			!Array.isArray(action.transactionParameters)
		) {
			throw new Error('Transaction parameters must be an array')
		}
		if (!action.chainId) {
			throw new Error('Chain ID is required for each action')
		}

		for (const param of action.transactionParameters) {
			if (!param.type) {
				throw new Error('Parameter type is required')
			}
			if (!['string', 'uint256', 'boolean'].includes(param.type)) {
				throw new Error(`Invalid parameter type: ${param.type}`)
			}
			if (param.value === undefined) {
				throw new Error('Parameter value is required')
			}
		}

		const chainIdMap: { [key: string]: number } = {
			Ethereum: 1,
			Base: 8453,
			Optimism: 10
		}

		const chainIdNumber = chainIdMap[action.chainId]
		if (!chainIdNumber) {
			throw new Error(`Invalid chainId: ${action.chainId}`)
		}
		const destinationChain = zeroPad(hexlify(chainIdNumber), 32)

		let encodedFunctionCall
		try {
			encodedFunctionCall = encodeFunctionData({
				abi: action.contractABI,
				functionName: action.functionName,
				args: action.transactionParameters.map(param => param.type)
			})
		} catch (error) {
			throw new Error(
				'Failed to encode function call: ' + (error as Error).message
			)
		}

		return {
			destinationContract: action.contractAddress,
			encodedFunctionCall: encodedFunctionCall,
			destinationAddress: action.contractAddress,
			destinationChain: destinationChain,
			gasLimit: 1000000
		}
	})
}
