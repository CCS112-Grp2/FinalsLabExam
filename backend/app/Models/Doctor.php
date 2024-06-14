<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'specialization',
        'license_number',
        'phone',
        'email',
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
