<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controller;

class MedicalRecordController extends Controller
{
    // Fetch all medical records for a patient
    public function index($patientId)
    {
        $records = MedicalRecord::where('patient_id', $patientId)->get();
        return response()->json($records);
    }

    // Create a new medical record
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string|max:255',
            'treatment' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $medicalRecord = MedicalRecord::create($request->all());

        return response()->json($medicalRecord, 201);
    }


    // Update an existing medical record
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'visit_date' => 'required|date_format:Y-m-d',
            'diagnosis' => 'required|string|max:255',
            'treatment' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $medicalRecord = MedicalRecord::findOrFail($id);
        $medicalRecord->update($request->all());

        return response()->json($medicalRecord);
    }
}
