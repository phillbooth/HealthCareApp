<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Appointment extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false; // Disable auto-incrementing
    protected $fillable = ['nhs_ref', 'location', 'doctor', 'appointment_type', 'appointment_time', 'appointment_length'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            // Ensure the model has a UUID when it's being created
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }
}
