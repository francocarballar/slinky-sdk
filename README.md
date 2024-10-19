# Slinky SDK

## Descripción

**Slinky SDK** es una biblioteca TypeScript que permite a los desarrolladores integrar fácilmente miniaplicaciones con contratos inteligentes en diversas blockchains Layer 1. Esta SDK proporciona funciones para generar metadatos y enviar mensajes cross-chain, facilitando la interoperabilidad entre distintas blockchains.

## Instalación

Para instalar el SDK, simplemente utiliza `npm` o `yarn`:

```bash
npm install slinky-sdk
```

o

```bash
yarn add slinky-sdk
```

## Uso Básico

Slinky SDK proporciona dos funciones principales: `generateMessageObjectsFromMetadata` y `createMetadata`. A continuación, se describe cómo utilizar cada una de ellas.

### Importación

Puedes importar las funciones desde el SDK de la siguiente manera:

```typescript
import { generateMessageObjectsFromMetadata, createMetadata } from 'slinky-sdk'
```

### Ejemplo de Uso

#### `createMetadata`

Esta función crea metadatos que pueden ser utilizados para la interacción con las Layer 1. Acepta un objeto `metadata` que contiene información de la miniaplicación.

```typescript
import { createMetadata } from 'slinky-sdk'

const metadata = {
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
				{ type: 'uint256', value: 42 },
				{ type: 'address', value: '0xabcdefabcdefabcdefabcdefabcdefabcdef' }
			],
			blockchainActionType: 'write',
			functionName: 'someFunction',
			chainId: 'Ethereum'
		}
	]
}

try {
	const metadataForMiniapp = createMetadata(metadata)
	console.log(metadataForMiniapp)
} catch (error) {
	console.error('Error creating metadata:', error.message)
}
```

#### `generateMessageObjectsFromMetadata`

Esta función genera objetos de mensaje requeridos por el contrato `SL1Sender.sol` a partir de un objeto de metadatos. Estos mensajes pueden ser utilizados para enviar transacciones cross-chain.

```typescript
import { generateMessageObjectsFromMetadata } from 'slinky-sdk'

const metadata = {
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
				{ type: 'uint256', value: 42 },
				{ type: 'address', value: '0xabcdefabcdefabcdefabcdefabcdefabcdef' }
			],
			blockchainActionType: 'write',
			functionName: 'someFunction',
			chainId: 'Ethereum'
		}
	]
}

try {
	const messageObjects = generateMessageObjectsFromMetadata(metadata)
	console.log(messageObjects)
} catch (error) {
	console.error('Error generating message objects:', error.message)
}
```

## API

### `createMetadata(metadata: Metadata): MetadataForMiniapp`

- **Descripción**: Crea metadatos para miniaplicaciones que puedan interactuar con las Layer 1.
- **Parámetros**:
  - `metadata` (Metadata): Objeto que contiene información sobre la miniaplicación, incluidas las acciones que debe realizar.
- **Retorna**: Un objeto `MetadataForMiniapp` que contiene los metadatos y los objetos de mensaje.
- **Errores**: Lanza un error si el `metadata` no tiene los campos requeridos o si la generación de mensajes falla.

### `generateMessageObjectsFromMetadata(metadataObject: Metadata): MessageObject[] | undefined`

- **Descripción**: Genera objetos de mensaje para interactuar con contratos inteligentes en blockchains Layer 1 a partir de un objeto de metadatos.
- **Parámetros**:
  - `metadataObject` (Metadata): Objeto que contiene la información necesaria para generar los mensajes.
- **Retorna**: Un arreglo de `MessageObject` o `undefined` si no hay acciones en los metadatos.
- **Errores**: Lanza un error si el `metadataObject` no es válido o si ocurre un problema durante la codificación.

## Buenas Prácticas

- **Validar Datos**: Antes de pasar los datos a las funciones del SDK, asegúrate de que el objeto `metadata` tenga todos los campos requeridos y que estos estén correctamente formateados.
- **Manejo de Errores**: Utiliza bloques `try...catch` para manejar errores cuando llames a las funciones del SDK, ya que hay validaciones internas que lanzarán excepciones si los datos no son válidos.
- **Pruebas**: Realiza pruebas para asegurarte de que las direcciones de los contratos, los parámetros y otros valores cumplen con los formatos requeridos antes de realizar una integración en producción.

## Pruebas

Slinky SDK está diseñado para ser probado con **Jest**. Puedes escribir pruebas para validar que los objetos `Metadata` y los mensajes generados estén correctamente formateados.

Ejemplo de una prueba básica con Jest:

```typescript
import { createMetadata } from 'slinky-sdk'

describe('createMetadata', () => {
	it('debería crear metadatos válidos cuando se proporciona un objeto metadata correcto', () => {
		const metadata = {
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
						{ type: 'uint256', value: 42 },
						{ type: 'address', value: '0xabcdefabcdefabcdefabcdefabcdefabcdef' }
					],
					blockchainActionType: 'write',
					functionName: 'someFunction',
					chainId: 'Ethereum'
				}
			]
		}

		const result = createMetadata(metadata)
		expect(result).toHaveProperty('metadata')
		expect(result).toHaveProperty('message')
	})
})
```

## Licencia

Este proyecto está licenciado bajo la licencia **MIT**. Consulta el archivo `LICENSE` para obtener más detalles.

## Contribuciones

Las contribuciones son bienvenidas. Si quieres mejorar el SDK, por favor abre un **issue** o un **pull request** en el repositorio de GitHub.

## Contacto

Si tienes alguna pregunta o comentario, siéntete libre de abrir un **issue** en GitHub o contacta al autor:

- **Autor**: Franco Carballar
- **Email**: [francocarballar@gmail.com](mailto:francocarballar@gmail.com)
- **Sitio web**: [https://www.francocarballar.com/](https://www.francocarballar.com/)

---

¡Gracias por utilizar Slinky SDK! Esperamos que te sea útil y fácil de integrar. Cualquier retroalimentación es siempre apreciada.
