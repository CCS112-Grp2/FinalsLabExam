<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Doctor;
use App\Models\User; // Ensure to import User model if not already imported

class DoctorSeeder extends Seeder
{
    public function run()
    {
        // Create a user for the doctor
        $user = User::create([
            'name' => 'Dr. John Doe',
            'email' => 'john.doe@example.com',
            'password' => bcrypt('password'), // Replace with hashed password
            'role' => 'doctor',
        ]);

        // Create the doctor record associated with the user
        Doctor::create([
            'user_id' => $user->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'specialization' => 'Cardiology',
            'license_number' => 'DOC123456',
            'phone' => '123-456-7890',
            'email' => 'john.doe@example.com',
        ]);

        // You can add more doctors here as needed
    }
}
