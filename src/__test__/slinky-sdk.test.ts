// #region IMPORTS
import { type Metadata } from '../interfaces/metadata'
import { createMetadata } from '../utils/createMetadata'
import { generateMessageObjectsFromMetadata } from '../utils/generateMessageObjectsFromMetadata'

// #region TEST DATA
const validMetadata: Metadata<'action'> = {
	type: 'action',
	icon: 'https://example.com/icon.png',
	title: 'My Miniapp',
	description: 'This is a test miniapp',
	label: 'Test App',
	disabled: false,
	actions: [
		{
			label: 'Execute Action',
			contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
			contractABI: [],
			transactionParameters: [
				{ label: 'Edad', type: 'uint256', value: BigInt(42) },
				{
					label: 'Address',
					type: 'string',
					value: '0xabcdefabcdefabcdefabcdefabcdefabcdef'
				}
			],
			blockchainActionType: 'write',
			functionName: 'someFunction',
			chainId: 'Ethereum'
		}
	]
}

// #region TEST SUITE
describe('Slinky SDK - createMetadata', () => {
	it('debería crear metadatos válidos cuando se proporciona un objeto metadata correcto', () => {
		const result = createMetadata(validMetadata)
		expect(result).toHaveProperty('metadata')
		expect(result).toHaveProperty('message')
		expect(result.metadata).toEqual(validMetadata)
	})
})

describe('Slinky SDK - generateMessageObjectsFromMetadata', () => {
	it('debería generar objetos de mensaje válidos cuando se proporciona metadata correcta', () => {
		const result = generateMessageObjectsFromMetadata(validMetadata)
		expect(result).toBeDefined()
		expect(Array.isArray(result)).toBe(true)
		expect(result?.length).toBeGreaterThan(0)
		result?.forEach(message => {
			expect(message).toHaveProperty('_destinationContract')
			expect(message).toHaveProperty('_encodedFunctionCall')
			expect(message).toHaveProperty('_destinationAddress')
			expect(message).toHaveProperty('_destinationChain')
			expect(message).toHaveProperty('_gasLimit')
		})
	})

	it('debería retornar undefined si metadata no tiene acciones', () => {
		const metadataWithoutActions = { ...validMetadata, actions: [] }
		const result = generateMessageObjectsFromMetadata(metadataWithoutActions)
		expect(result).toBeUndefined()
	})
})
// #endregion
