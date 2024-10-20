import { type Metadata } from './metadata'
import { type BlockchainParameter } from './blockchainAction'

export interface Values {
	[key: string]: string | number | boolean
}

export interface ExtractsArgumentsTransaction {
	parameters: BlockchainParameter[]
	values: Values
}

export type Args = string | number | bigint | boolean

export interface GenerateTransactionData {
	metadata: Metadata
	values: Values
}

export interface TransactionData {
	abi: object[]
	address: `0x${string}`
	functionName: string
	args: Args[]
}
