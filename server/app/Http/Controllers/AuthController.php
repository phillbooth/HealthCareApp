<?php

// app/Http/Controllers/AuthController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        \Log::info('Login Attempted:', $request->all());

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]); 

        try {
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->accessToken;
                \Log::info('Login Success:');
                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'expires_at' => $tokenResult->token->expires_at
                ]);
            } else {
                \Log::info('Login Failed:');
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        } catch (\Exception $e) {
            \Log::error('Login Failed error: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    
    public function register(Request $request)
    {

        \Log::info('Register attempt:', $request->all());

        
            $validatedData = $request->validate([
                'name' => 'required|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|confirmed|min:6',
            ]);
        
            try {
                $user = User::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'password' => bcrypt($validatedData['password']),
                ]);
        
                try {
                    $token = $user->createToken('Test Token')->accessToken;
                    return response()->json(['token' => $token], 200);
                } catch (\League\OAuth2\Server\Exception\OAuthServerException $e) {
                    \Log::error('OAuthServerException: ' . $e->getMessage());
                    throw $e;  // Or handle the exception as per your application's needs
                }
               
            } catch (\Exception $e) {
                \Log::error('Registration error: ' . $e->getMessage());
                return response()->json(['error' => 'Internal Server Error'], 500);
            }
        }
        
}
