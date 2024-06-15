<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MedicalRecordController;
use Illuminate\Http\Request;

// Public routes
Route::post('register', [ApiController::class, 'register']);
Route::post('login', [ApiController::class, 'login']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('profile', [ApiController::class, 'profile']);
    Route::post('logout', [ApiController::class, 'logout']);
    Route::get('doctorlist', [DoctorController::class, 'index']);

    // Doctor details route
    Route::get('doctor-details', function (Request $request) {
        $user = $request->user();  // Assuming the authenticated user is the doctor
        $doctor = App\Models\Doctor::where('user_id', $user->id)->first();
        return response()->json($doctor);
    });

    Route::get('patients-details', function (Request $request) {
        $user = $request->user();  // Assuming the authenticated user is the doctor
        $patient = App\Models\Patient::where('user_id', $user->id)->first();
        return response()->json($patient);
    });

    Route::middleware('auth:sanctum')->get('patient-medical-records', function (Request $request) {
        $user = $request->user();  // Assuming the authenticated user is the patient
        $patient = App\Models\Patient::where('user_id', $user->id)->first();
        if ($patient) {
            $medicalRecords = $patient->medicalRecords;  // Assuming a relationship is set up in the Patient model
            return response()->json($medicalRecords);
        } else {
            return response()->json(['message' => 'Patient not found'], 404);
        }
    });

    // Admin routes
    Route::middleware('role:admin')->group(function () {
        Route::get('users', [UserController::class, 'index']);
        Route::post('users/add', [UserController::class, 'store']);
        Route::put('users/{id}', [UserController::class, 'update']);
        Route::delete('users/{id}', [UserController::class, 'destroy']);

        // Doctor routes
        Route::get('doctors', [DoctorController::class, 'index']);
        Route::post('doctors/add', [DoctorController::class, 'store']);
        Route::put('doctors/{id}', [DoctorController::class, 'update']);
        Route::delete('doctors/{id}', [DoctorController::class, 'destroy']);
    });

    // Doctor routes
    Route::middleware('role:doctor')->group(function () {
        Route::get('patients', [PatientController::class, 'index']);
        Route::put('patients/{id}', [PatientController::class, 'update']);
        Route::get('appointments', [AppointmentController::class, 'index']);
        Route::post('appointments/add', [AppointmentController::class, 'store']);

        // Medical records for a specific patient
        Route::get('patients/{patientId}/medical-records', [MedicalRecordController::class, 'index']);
        Route::post('medical-records/add', [MedicalRecordController::class, 'store']);
        Route::put('medical-records/{id}', [MedicalRecordController::class, 'update']);

        Route::get('patients', [PatientController::class, 'index']);
        Route::put('patients/{id}', [PatientController::class, 'update']);
    });

    // Patient routes
    Route::middleware('role:patient')->group(function () {
        Route::post('appointments', [AppointmentController::class, 'store']);
        Route::get('appointments/{id}', [AppointmentController::class, 'show']);
        Route::get('medical-records', [MedicalRecordController::class, 'index']);
    });
});

// Public route to fetch all medical records (assuming it's for public access)
Route::get('medical-records', [MedicalRecordController::class, 'index']);

// Route to add medical records (assuming it's for public access)
Route::post('medical-records/add', [MedicalRecordController::class, 'store']);
