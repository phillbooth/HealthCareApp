<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PatientFactory extends Factory
{
    
    public $model = Patient::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'address' => $this->faker->address(),
            'nhs_ref' => $this->faker->unique()->regexify('[A-Z]{2}[0-9]{6}')
        ];
    }
}
