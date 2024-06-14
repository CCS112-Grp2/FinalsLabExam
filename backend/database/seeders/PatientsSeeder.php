<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\User;

class PatientsSeeder extends Seeder
{
    public function run()
    {
        // Create a user for the patient
        $user = User::create([
            'name' => 'John Doe',
            'email' => 'john.doe231@example.com',
            'password' => bcrypt('password'), // Replace with hashed password
            'role' => 'patient',
        ]);

        // Create the patient record associated with the user
        $patient = Patient::create([
            'user_id' => $user->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'date_of_birth' => '1990-05-15',
            'gender' => 'Male',
            'address' => '123 Main St, Anytown',
            'phone' => '123-456-7890',
            'email' => 'john.doe231@example.com',
            'emergency_contact' => 'Jane Doe',
            'medical_history' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        ]);

        // Optionally, you can add more patients here as needed
    }
}
