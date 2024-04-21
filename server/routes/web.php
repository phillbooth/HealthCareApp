<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\OpenIdConfigurationController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('.well-known/openid-configuration', [OpenIdConfigurationController::class, 'show']);

Route::get('.well-known/jwks.json', [OpenIdConfigurationController::class, 'jwks']);
