<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function render(): Response
    {
        $surveys = Survey::with(['votes' => function ($query) {
            $query->where('user_id', Auth::id());
        }])->with('votes.restaurant')->with('votes.users')->with('votes.creator')->get();
        
        $successMessage = session('success');

        return Inertia::render('Dashboard/index', [
            'surveys' => $surveys,
            'success' => $successMessage,
        ]);
    }
}
