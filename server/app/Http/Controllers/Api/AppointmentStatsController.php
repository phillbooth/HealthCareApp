<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Support\Facades\Cache;  // Make sure to include the Cache facade

class AppointmentStatsController extends Controller
{
    public function index()
    {
        // Use Laravel's Cache facade to cache the results
        $percentages = Cache::remember('appointment_stats', 60, function () {
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
}
