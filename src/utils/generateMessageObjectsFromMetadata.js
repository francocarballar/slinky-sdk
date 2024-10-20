"use strict";
// #region IMPORTS
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessageObjectsFromMetadata = generateMessageObjectsFromMetadata;
// Modules and libraries
var ethers_1 = require("ethers");
var bytes_1 = require("@ethersproject/bytes");
/**
 * @function generateMessageObjectsFromMetadata
 * @param {Metadata} metadataObject
 * @description Genera el objeto de mensaje requerido por el contrato SL1Sender.sol a partir de un objeto de metadatos
 * @returns {MessageObject[] | undefined} Un arreglo de objetos de mensaje o indefinido si no hay acciones en los metadatos
 */
function generateMessageObjectsFromMetadata(metadataObject) {
    var abiCoder = new ethers_1.AbiCoder();
    if (!metadataObject) {
        throw new Error('Metadata object is required');
    }
    if (!metadataObject.actions || !Array.isArray(metadataObject.actions)) {
        throw new Error('Metadata actions must be an array');
    }
    if (!metadataObject.actions || metadataObject.actions.length === 0) {
        return undefined;
    }
    return metadataObject.actions.map(function (actionDetail) {
        if (!actionDetail.contractAddress) {
            throw new Error('Contract address is required for each action');
        }
        if (!/^0x[a-fA-F0-9]{40}$/.test(actionDetail.contractAddress)) {
            throw new Error('Invalid contract address format');
        }
        if (!actionDetail.transactionParameters ||
            !Array.isArray(actionDetail.transactionParameters)) {
            throw new Error('Transaction parameters must be an array');
        }
        if (!actionDetail.chainId) {
            throw new Error('Chain ID is required for each action');
        }
        for (var _i = 0, _a = actionDetail.transactionParameters; _i < _a.length; _i++) {
            var param = _a[_i];
            if (!param.type) {
                throw new Error('Parameter type is required');
            }
            if (!['string', 'uint256', 'boolean'].includes(param.type)) {
                throw new Error("Invalid parameter type: ".concat(param.type));
            }
            if (param.value === undefined) {
                throw new Error('Parameter value is required');
            }
        }
        var chainIdMap = {
            Ethereum: 1,
            Base: 8453,
            Optimism: 10
        };
        var chainIdNumber = chainIdMap[actionDetail.chainId];
        if (!chainIdNumber) {
            throw new Error("Invalid chainId: ".concat(actionDetail.chainId));
        }
        var destinationChain = (0, bytes_1.zeroPad)((0, bytes_1.hexlify)(chainIdNumber), 32);
        var encodedFunctionCall;
        try {
            encodedFunctionCall = abiCoder.encode(actionDetail.transactionParameters.map(function (param) { return param.type; }), actionDetail.transactionParameters.map(function (param) { return param.value; }));
        }
        catch (error) {
            throw new Error('Failed to encode function call: ' + error.message);
        }
        return {
            _destinationContract: actionDetail.contractAddress,
            _encodedFunctionCall: encodedFunctionCall,
            _destinationAddress: actionDetail.contractAddress,
            _destinationChain: destinationChain,
            _gasLimit: 1000000
        };
    });
}
