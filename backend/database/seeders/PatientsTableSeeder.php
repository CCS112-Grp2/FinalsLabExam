<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PatientsTableSeeder extends Seeder
{
    public function run()
    {
        // Generate dummy data for patients
        $patients = [
            [
                'user_id' => 1,
                'first_name' => 'John',
                'last_name' => 'Doe',
                'date_of_birth' => '1980-05-15',
                'gender' => 'Male',
                'address' => '123 Main St, Anytown',
                'phone' => '555-1234',
                'email' => 'john.doe@example.com',
                'emergency_contact' => 'Jane Doe',
                'medical_history' => 'Allergic to penicillin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more patient records as needed
        ];

        // Insert data into the database
        DB::table('patients')->insert($patients);
    }
}
