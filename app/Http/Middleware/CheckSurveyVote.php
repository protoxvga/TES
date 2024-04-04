<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckSurveyVote
{
    public function handle(Request $request, Closure $next)
    {
        $now = now();
        // Check if it's a weekday (Monday to Friday)
        if ($now->isWeekday()) {
            // Check if the current time is within the allowed range (10:30 to 13:00)
            if ($now->hour >= 8 && $now->hour < 13) {
                return $next($request);
            }
        }

        // Redirect back with error message if not within allowed range or not a weekday
        return redirect()->back()->withErrors(['message' => 'Tu ne peux pas voter en dehors des horaires de vote (entre 10h30 et 13h00, du lundi au vendredi).']);
    }
}
