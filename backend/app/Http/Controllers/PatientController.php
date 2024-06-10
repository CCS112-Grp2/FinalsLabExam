<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController; // Add this line to import the base Controller

class PatientController extends BaseController
{
    public function index()
    {
        return Patient::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string',
            'email_address' => 'required|email|unique:tblpatients',
            'age' => 'required|integer',
        ]);

        $patient = Patient::create($validated);
        return response()->json($patient, 201);
    }

    public function show($id)
    {
        return Patient::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string',
            'email_address' => 'required|email|unique:tblpatients,email_address,' . $id . ',patient_id',
            'age' => 'required|integer',
        ]);

        $patient = Patient::findOrFail($id);
        $patient->update($validated);
        return response()->json($patient);
    }

    public function destroy($id)
    {
        Patient::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
