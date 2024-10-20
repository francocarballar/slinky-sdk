"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var createMetadata_1 = require("@utils/createMetadata");
var generateMessageObjectsFromMetadata_1 = require("@utils/generateMessageObjectsFromMetadata");
// #region TEST DATA
var validMetadata = {
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
};
// #region TEST SUITE
describe('Slinky SDK - createMetadata', function () {
    it('debería crear metadatos válidos cuando se proporciona un objeto metadata correcto', function () {
        var result = (0, createMetadata_1.createMetadata)(validMetadata);
        expect(result).toHaveProperty('metadata');
        expect(result).toHaveProperty('message');
        expect(result.metadata).toEqual(validMetadata);
    });
});
describe('Slinky SDK - generateMessageObjectsFromMetadata', function () {
    it('debería generar objetos de mensaje válidos cuando se proporciona metadata correcta', function () {
        var result = (0, generateMessageObjectsFromMetadata_1.generateMessageObjectsFromMetadata)(validMetadata);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result === null || result === void 0 ? void 0 : result.length).toBeGreaterThan(0);
        result === null || result === void 0 ? void 0 : result.forEach(function (message) {
            expect(message).toHaveProperty('_destinationContract');
            expect(message).toHaveProperty('_encodedFunctionCall');
            expect(message).toHaveProperty('_destinationAddress');
            expect(message).toHaveProperty('_destinationChain');
            expect(message).toHaveProperty('_gasLimit');
        });
    });
    it('debería retornar undefined si metadata no tiene acciones', function () {
        var metadataWithoutActions = __assign(__assign({}, validMetadata), { actions: [] });
        var result = (0, generateMessageObjectsFromMetadata_1.generateMessageObjectsFromMetadata)(metadataWithoutActions);
        expect(result).toBeUndefined();
    });
});
// #endregion
