<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\Vote;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    private function canVote(survey $survey, int $userId)
    {
        $res = true;

        if (Vote::where('user_id', $userId)->where('survey_id', $survey->id)->exists()) {
            $res = false;
        }

        if ($survey->votes()->whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->exists()) {
            $res = false;
        }

        return $res;
    }

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

        $canVote = $this->canVote($survey, Auth::id());

        $successMessage = session('success');

        return Inertia::render('Dashboard/index', [
            'survey' => $survey,
            'success' => $successMessage,
            'canVote' => $canVote,
        ]);
    }
}
