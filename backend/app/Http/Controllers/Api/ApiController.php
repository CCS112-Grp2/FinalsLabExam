<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;
use App\Models\User;

class ApiController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email|max:255',
                'password' => 'required|string|min:8',
                'role' => 'required|string|in:admin,doctor,receptionist,patient', // Validate role
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->first_name . ' ' . $request->last_name, // Combine first_name and last_name
                'email' => $request->email,
                'password' => Hash::make($request->password), // Hashing the password
                'role' => $request->role, // Assign role
            ]);

            // Determine date_of_birth value
            $dateOfBirth = $request->date_of_birth ?: '2000-01-01'; // Default dummy date

            // Create the patient entry
            $patient = Patient::create([
                'user_id' => $user->id, // Associate the patient with the user
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'date_of_birth' => $dateOfBirth,
                'gender' => $request->gender ?? '',
                'address' => $request->address ?? '',
                'phone' => $request->phone ?? '',
                'email' => $request->email ?? '',
                'emergency_contact' => $request->emergency_contact ?? '',
                'medical_history' => $request->medical_history ?? '',
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User created successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'patient' => $patient
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Internal server error',
                'errors' => $th->getMessage(),
            ], 500);
        }
    }


    public function login(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email and password do not match with our records',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();
            return response()->json([
                'status' => true,
                'message' => 'User logged in successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken,
                'role' => $user->role // Include user role in the response
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Internal server error',
                'errors' => $th->getMessage(),
            ], 500);
        }
    }

    public function profile()
    {
        $userData = auth()->user();
        return response()->json([
            'status' => true,
            'message' => 'User profile fetched successfully',
            'data' => $userData,
        ], 200);
    }

    public function logout()
    {
        $user = Auth::user();
        if ($user instanceof User) {
            $user->tokens()->delete();
        }

        return response()->json([
            'status' => true,
            'message' => 'User logged out successfully',
            'data' => [],
        ], 200);
    }
}
