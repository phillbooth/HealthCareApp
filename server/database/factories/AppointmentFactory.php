<?php

namespace Database\Factories;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    
    protected $model = Appointment::class; // Ensure this is set to the Appointment model

    public function definition()
    {
        return [
            'nhs_ref' => '', // This will need to be set dynamically based on associated Patient
            'location' => $this->faker->city,
            'doctor' => $this->faker->name,
            'appointment_type' => $this->faker->randomElement(['Checkup', 'Surgery', 'Consultation']),
            'appointment_time' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d H:i:s'),
            'appointment_length' => $this->faker->numberBetween(15, 120) // Length in minutes
        ];
    }
}
