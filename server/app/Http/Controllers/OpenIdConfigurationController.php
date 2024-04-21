<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;


class OpenIdConfigurationController extends Controller
{
    public function show()
    {
        $baseUrl = config('app.url'); // Fetch the APP_URL from the configuration

        $data = [
            'issuer' => $baseUrl,
            'authorization_endpoint' => $baseUrl . '/oauth/authorize',
            'token_endpoint' => $baseUrl . '/oauth/token',
            'userinfo_endpoint' => $baseUrl . '/api/userinfo',
            'jwks_uri' => $baseUrl . '/.well-known/jwks.json',
            'response_types_supported' => ['code', 'token', 'id_token', 'code id_token', 'code token', 'id_token token', 'code id_token token'],
            'subject_types_supported' => ['public'],
            'id_token_signing_alg_values_supported' => ['RS256'],
            'scopes_supported' => ['openid', 'profile', 'email', 'roles'],
            'token_endpoint_auth_methods_supported' => ['client_secret_basic', 'client_secret_post'],
            'claims_supported' => ['sub', 'iss', 'auth_time', 'name', 'email', 'roles'],
        ];

        return response()->json($data);
    }

    public function jwks()
    {
        $modulusHex = '00a84c9638b1a49d75a41484b07ddcc633abe0f08046091cbdbd733e6d045c3b0334b013c7a9de2f2870b224ca38978d6b5de1548ba871b3e6e711dc2c49171293baf5801f1228a17e13b613879c36b1588bf4f5a4ad9ae4b4c01cce8de183b48be9215df96286e6f19d356a162ff4a9d134111d65a38a0f99c8a3b390f63d38e44ffffecb5b1eae9acb7bb824897773fb98de42d3b6d32f842be4cc34ba81d6da2fe5429fda47550ab4e973c773ed18e00654316728e5fff540255f09042a3f12b51fc6696a6c091865a5849cb0bd8a464462c1e2f6fee72a37ab70f22da2fed848af0dbb5ed9dc83ef3ecbd76ec6713c66a1544c412f021ebcaf628a14ba4d9383';
        $exponent = 'AQAB';
    
        // Clean up the modulus and prepare it for hashing
        $modulusHex = preg_replace('/[^a-f0-9]/i', '', $modulusHex);
        $modulusBin = hex2bin($modulusHex);
    
        // Generate a SHA-256 hash of the binary data
        $hash = hash('sha256', $modulusBin);
    
        // Use the first 8 characters of the hash as the key ID
        $keyId = substr($hash, 0, 8);
    
        // Base64 URL encode the modulus and exponent
        $modulusB64 = rtrim(strtr(base64_encode($modulusBin), '+/', '-_'), '=');
        $exponentBin = hex2bin('010001'); // Hexadecimal representation of 65537
        $exponentB64 = rtrim(strtr(base64_encode($exponentBin), '+/', '-_'), '=');
    
        $keys = [
            'keys' => [
                [
                    'kty' => 'RSA',
                    'alg' => 'RS256',
                    'use' => 'sig',
                    'kid' => $keyId,
                    'n' => $modulusB64,
                    'e' => $exponentB64,
                ]
            ]
        ];
    
        return response()->json($keys);
    }
    
    

}
