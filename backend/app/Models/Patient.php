<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $table = 'tblpatients';  // Specify the table name
    protected $primaryKey = 'patient_id';

    protected $fillable = [
        'patient_name',
        'email_address',
        'age',
    ];
}
