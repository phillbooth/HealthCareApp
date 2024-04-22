<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Support\Facades\Cache;

class AppointmentStatsController extends Controller
{
    public function getAppointmentTypesPercentages()
    {
        $percentages = Cache::remember('appointment_types_percentages', 60, function () {
            $stats = Appointment::query()
                ->selectRaw('appointment_type, COUNT(*) as count')
                ->groupBy('appointment_type')
                ->get()
                ->mapWithKeys(function ($item) {
                    return [$item->appointment_type => $item->count];
                });

            $total = array_sum($stats->toArray());
            return $stats->mapWithKeys(function ($count, $type) use ($total) {
                return [$type => round($count / $total * 100, 2)];
            });
        });

        return response()->json($percentages);
    }

    public function getAverageAppointmentLengths()
    {
        try {
            $averageLengths = Cache::remember('average_appointment_lengths', 60, function () {
                return Appointment::query()
                    ->selectRaw('doctor, AVG(appointment_length) as average_appointment_lengths')
                    ->groupBy('doctor')
                    ->get()
                    ->mapWithKeys(function ($item) {
                        return [$item->doctor => round($item->average_appointment_lengths, 2)];
                    });
            });
    
            return response()->json($averageLengths);
        } catch (\Exception $e) {
            // Log the error or handle it as per your needs
            return response()->json(['error' => 'Failed to fetch average appointment lengths'], 500);
        }
    }
    
}
