<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'date_of_birth',
        'gender',
        'address',
        'phone',
        'email',
        'emergency_contact',
        'medical_history',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with the Appointment model
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    // Define the relationship with the MedicalRecord model
    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class);
    }
}
