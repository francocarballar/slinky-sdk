export interface ContractABI {
	inputs: Array<{
		internalType: string
		name: string
		type: string
	}>
	outputs: Array<{
		internalType?: string
		name?: string
		type: string
	}>
	stateMutability: 'view' | 'pure' | 'nonpayable' | 'payable'
	type: 'function' | 'constructor' | 'event' | 'fallback'
	name: string
}

export interface BlockchainAction {
	label: string
	contractAddress: `0x${string}`
	contractABI: ContractABI[]
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
