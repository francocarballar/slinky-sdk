/**
 * @constant ABI
 * @description The ABI of the Teleporter contract
 */
export const ABI = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_destinationContract',
				type: 'address'
			},
			{
				internalType: 'bytes',
				name: '_encodedFunctionCall',
				type: 'bytes'
			}
		],
		name: 'createArbitraryMessage',
		outputs: [
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'messenger',
		outputs: [
			{
				internalType: 'contract ITeleporterMessenger',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_destinationContract',
				type: 'address'
			},
			{
				internalType: 'bytes',
				name: '_encodedFunctionCall',
				type: 'bytes'
			},
			{
				internalType: 'address',
				name: '_destinationAdress',
				type: 'address'
			},
			{
				internalType: 'bytes32',
				name: '_destinationChain',
				type: 'bytes32'
			},
			{
				internalType: 'uint256',
				name: '_gasLimit',
				type: 'uint256'
			}
		],
		name: 'sendMessage',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_newMessenger',
				type: 'address'
			}
		],
		name: 'updateMessenger',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
]

/**
 * @constant DESTINATION_ADDRESS
 * @description The address of the destination contract
 */
export const DESTINATION_ADDRESS = '0x76ceB8017741c7fEAcae7D1179b0d3eB4151dcc4'

/**
 * @constant DESTINATION_CHAIN
 * @description The chain ID of the destination chain
 */
export const DESTINATION_CHAIN =
	'0xdb76a6c20fd0af4851417c79c479ebb1e91b3d4e7e57116036d203e3692a0856'

/**
 * @constant FUNCTION_NAME
 * @description The name of the function to call on the destination contract
 */
export const FUNCTION_NAME = 'sendMessage'

/**
 * @constant GAS_LIMIT
 * @description The gas limit for the transaction
 */
export const GAS_LIMIT = BigInt(200000)
