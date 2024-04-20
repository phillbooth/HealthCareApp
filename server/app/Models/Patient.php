<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Patient extends Model
{
    use SoftDeletes, HasFactory;

    public $keyType = 'string';
    public $incrementing = false;
    public $fillable = ['name', 'address', 'nhs_ref'];

    /**
     * Define how attributes should be cast.
     *
     * @return array
     */
    public function casts(): array
    {
        return [
            'id' => 'string',
            'name' => 'encrypted:attribute',
            'address' => 'encrypted:attribute'
        ];
    }

    /**
     * Custom accessor and mutator for the 'name' attribute.
     */
    public function name(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => decrypt($value),
            set: fn ($value) => encrypt($value)
        );
    }

    /**
     * Custom accessor and mutator for the 'address' attribute.
     */
    public function address(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => decrypt($value),
            set: fn ($value) => encrypt($value)
        );
    }

    /**
     * Automatically set UUID when creating a new patient.
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = Str::uuid()->toString();
            }
        });
    }
}
