<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nhs_ref');
            $table->foreign('nhs_ref')->references('nhs_ref')->on('patients')->onDelete('cascade');
            $table->string('location');
            $table->string('doctor');
            $table->string('appointment_type');
            $table->dateTime('appointment_time');
            $table->integer('appointment_length'); // Length in minutes
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       // Schema::dropIfExists('appointments');
    }
};
