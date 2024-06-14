<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;

class MedicalRecordController extends Controller
{
    // Fetch all medical records for a patient
    public function index()
    {
        $user = auth()->user();
        $records = MedicalRecord::where('patient_id', $user->id)->get();
        return response()->json($records);
    }
}
