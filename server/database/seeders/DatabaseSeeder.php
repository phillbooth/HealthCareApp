<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\Appointment;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create 50 patients
        $patients = Patient::factory()->count(50)->create();

        // Create between 0 to 10 appointments for each patient
        foreach ($patients as $patient) {
            Appointment::factory(rand(0, 10))->create([
                'nhs_ref' => $patient->nhs_ref
            ]);
        }
    }
}
