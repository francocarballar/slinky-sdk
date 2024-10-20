import { BlockchainAction } from './blockchainAction'

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
	destinationContract: `0x${string}`
	encodedFunctionCall: string
	destinationAddress: `0x${string}`
	destinationChain: Uint8Array
	gasLimit: number
}

export interface MetadataForMiniapp {
	metadata: Metadata
	message: MessageObject[] | undefined
}
