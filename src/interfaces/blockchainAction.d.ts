export interface BlockchainAction {
	label: string
	contractAddress: `0x${string}`
	contractABI: object[]
	transactionParameters: BlockchainParameter[]
	blockchainActionType: 'read' | 'write'
	functionName: string
	chainId: ChainId
}

export type BlockchainParameter = {
	label: string
	type: 'string' | 'uint256' | 'boolean'
	value?: string | bigint | boolean
}

export type ChainId = 'Ethereum' | 'Base' | 'Optimism'
