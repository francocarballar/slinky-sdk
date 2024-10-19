module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1'
	}
}
