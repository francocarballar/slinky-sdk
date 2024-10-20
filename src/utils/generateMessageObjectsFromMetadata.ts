// #region IMPORTS

// Types and interfaces
import { type Metadata, type MessageObject } from '../interfaces/metadata'
import { type BlockchainAction } from '../interfaces/blockchainAction'

// Modules and libraries
import { getAddress } from '@ethersproject/address'
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

	if (metadataObject.actions.length === 0) {
		return undefined
	}

	return metadataObject.actions.map((action: BlockchainAction) => {
		if (!action.contractAddress) {
			throw new Error('Contract address is required for each action')
		}
		try {
			action.contractAddress = getAddress(
				action.contractAddress
			) as `0x${string}`
		} catch (error) {
			console.error(error)
			throw new Error(
				`Invalid contract address format: ${action.contractAddress}`
			)
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
			if (!['string', 'uint256', 'boolean', 'address'].includes(param.type)) {
				throw new Error(`Invalid parameter type: ${param.type}`)
			}
			if (param.value === undefined) {
				throw new Error('Parameter value is required')
			}
			if (param.type === 'string') {
				try {
					param.value = getAddress(param.value as string)
				} catch (error) {
					console.error(error)
					throw new Error(`Invalid address value: ${param.value}`)
				}
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

		// Validate if the ABI is valid
		if (
			!action.contractABI ||
			!Array.isArray(action.contractABI) ||
			action.contractABI.length === 0
		) {
			throw new Error('Invalid or missing contract ABI')
		}

		// Validate if the function exists in the ABI
		const functionInABI = action.contractABI.find(
			item => item.name === action.functionName
		)
		if (!functionInABI) {
			console.error('Provided ABI:', action.contractABI)
			console.error('Function name:', action.functionName)
			throw new Error(
				`Function "${action.functionName}" not found in the provided ABI`
			)
		}

		let encodedFunctionCall
		try {
			encodedFunctionCall = encodeFunctionData({
				abi: action.contractABI,
				functionName: action.functionName,
				args: action.transactionParameters.map(param => param.value)
			})
		} catch (error) {
			throw new Error(
				`Failed to encode function call for function "${action.functionName}": ` +
					(error as Error).message
			)
		}

		if (!encodedFunctionCall) {
			throw new Error(
				`Encoded function call for "${action.functionName}" resulted in an empty or invalid value.`
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
