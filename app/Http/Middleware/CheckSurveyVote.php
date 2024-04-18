<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckSurveyVote
{
    public function handle(Request $request, Closure $next)
    {
        $now = now();
        if ($now->isWeekday()) {
            if ($now->hour >= 9 && $now->hour < 13) {
                return $next($request);
            }
        }

        return redirect()->back()->withErrors(['message' => 'Tu ne peux pas voter en dehors des horaires de vote (9h00 - 13h00, du lundi au vendredi).']);
    }
}
