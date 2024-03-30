<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function render(): Response
    {
        $surveys = Survey::with('votes')->with('votes.restaurant')->with('votes.users')->get();
        
        $successMessage = session('success');

        return Inertia::render('Dashboard/index', [
            'surveys' => $surveys,
            'success' => $successMessage,
        ]);
    }
}
