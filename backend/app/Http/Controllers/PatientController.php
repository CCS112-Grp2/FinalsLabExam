<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class PatientController extends Controller
{
    //create patient
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|max:10',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'email' => 'required|email|max:255',
            'emergency_contact' => 'required|string|max:255',
            'medical_history' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => 'patient',
        ]);

        // Create the patient entry
        $patient = Patient::create([
            'user_id' => $user->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'phone' => $request->phone,
            'email' => $request->email,
            'emergency_contact' => $request->emergency_contact,
            'medical_history' => $request->medical_history
        ]);

        return response()->json(['user' => $user, 'patient' => $patient], 201);
    }

    // Fetch all patients
    public function index()
    {
        $patients = Patient::all();
        return response()->json($patients);
    }

    // Update patient details
    public function update(Request $request, $id)
    {
        $patient = Patient::find($id);
        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|max:10',
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'email' => 'required|email|max:255',
            'emergency_contact' => 'required|string|max:255',
            'medical_history' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $patient->update($request->all());

        return response()->json($patient);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'Patient deleted successfully']);
    }
}
