import {Buffer} from "buffer";
import * as nacl from "tweetnacl";

import {types} from "./types";
import {DefaultWindow, DefaultLimit, MaxLimit, DefaultOffset, Instruction} from "./constants";


export function signature(
    instruction: Instruction,
    privateKey: nacl.SignKeyPair,
    queryParams: { [key: string]: any },
    bodyParams: { [key: string]: any }
): types.Signature {
    const timestamp = Date.now();
    const allParams: { [key: string]: any } = {...queryParams, ...bodyParams};
    allParams["timestamp"] = `${timestamp}`;
    allParams["window"] = `${DefaultWindow}`;

    const keys = Object.keys(allParams).sort();
    let message = `instruction=${instruction}`;
    for (const key of keys) {
        message += `&${key}=${allParams[key]}`;
    }
    console.log("message:", message);

    const signature = nacl.sign.detached(Buffer.from(message), <Uint8Array>privateKey.secretKey);
    const signatureBase64 = Buffer.from(signature).toString('base64');

    return {
        base64: signatureBase64,
        bytes: signature,
        ts: `${timestamp}`,
    };
}

export function setHeaders(apiKey: string, signature: types.Signature): { [key: string]: string } {
    const headers: { [key: string]: string } = {};
    headers['X-API-Key'] = apiKey;
    headers['X-Timestamp'] = signature.ts;
    headers['X-Signature'] = signature.base64;
    headers['X-Window'] = `${DefaultWindow}`;
    return headers;
}

export function formatLimit(limit: number): number {
    if (limit < 0) {
        return DefaultLimit;
    } else if (limit > MaxLimit) {
        return MaxLimit;
    } else {
        return limit;
    }
}

export function formatOffset(offset: number): number {
    if (offset < 0) {
        return DefaultOffset;
    } else {
        return offset;
    }
}