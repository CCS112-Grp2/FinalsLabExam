<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MedicalRecordController;

Route::post('register', [ApiController::class, 'register']);
Route::post('login', [ApiController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('profile', [ApiController::class, 'profile']);
    Route::post('logout', [ApiController::class, 'logout']);
});

Route::group(['middleware' => ['auth:sanctum', 'role:admin']], function () {
    // Admin-specific routes
    Route::get('users', [UserController::class, 'index']);
    Route::post('users/add', [UserController::class, 'store']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
});

Route::group(['middleware' => ['auth:sanctum', 'role:doctor']], function () {
    // Doctor-specific routes
    Route::get('patients', [PatientController::class, 'index']);
    Route::put('patients/{id}', [PatientController::class, 'update']);
    Route::get('appointments', [AppointmentController::class, 'index']);
    Route::post('appointments/add', [AppointmentController::class, 'store']);
});

Route::group(['middleware' => ['auth:sanctum', 'role:patient']], function () {
    // Patient-specific routes
    Route::post('appointments', [AppointmentController::class, 'store']);
    Route::get('appointments/{id}', [AppointmentController::class, 'show']);
    Route::get('medical-records', [MedicalRecordController::class, 'index']);
});
