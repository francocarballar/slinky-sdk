import { BlockchainAction } from '@interfaces/blockchainAction'

export interface Metadata<T extends ActionType = 'action'> {
	[key: string]: unknown
	type: T
	icon: string
	title: string
	description: string
	label: string
	disabled: boolean
	actions?: BlockchainAction[]
}

export type ActionType = 'action' | 'message' | 'post' | 'external-link'

export interface MessageObject {
	_destinationContract: `0x${string}`
	_encodedFunctionCall: string
	_destinationAddress: `0x${string}`
	_destinationChain: Uint8Array
	_gasLimit: number
}

export interface MetadataForMiniapp {
	metadata: Metadata
	message: MessageObject[] | undefined
}
