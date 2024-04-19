<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function render(): Response
    {
        $startOfDay = Carbon::now()->startOfDay();
        $endOfDay = Carbon::now()->endOfDay();

        $survey = Survey::with(['votes' => function ($query) {
            $query->where('user_id', Auth::id());
        }])
        ->with('votes.restaurant')
        ->with('votes.users:id,firstname,lastname')
        ->with('votes.creator:id,firstname,lastname')
        ->whereBetween('created_at', [$startOfDay, $endOfDay])
        ->latest()
        ->first();

        $successMessage = session('success');

        return Inertia::render('Dashboard/index', [
            'survey' => $survey,
            'success' => $successMessage,
        ]);
    }
}
