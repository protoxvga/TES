<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\Survey;
use App\Models\Vote;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoteController extends Controller
{
    public function render()
    {
        $survey = Survey::where('is_open', true)->get();
        $restaurants = Restaurant::all();
        $successMessage = session('success');

        return Inertia::render('Vote/index', [
            'survey' => $survey,
            'restaurants' => $restaurants,
            'success' => $successMessage,
        ]);
    }

    public function create(Request $request)
    {
        $userId = auth()->id();

        if (Vote::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->exists()) {
            return redirect()->route('dashboard')->withErrors(['message' => 'Vous ne pouvez pas créer de nouvelle proposition car vous avez déjà rejoint une proposition existante !']);
        }

        $validatedData = $request->validate([
            'survey_id' => 'required|exists:surveys,id',
            'restaurant_id' => 'required|exists:restaurants,id',
        ]);

        $vote = new Vote();
        $vote->survey_id = $validatedData['survey_id'];
        $vote->restaurant_id = $validatedData['restaurant_id'];
        $vote->meeting_time = request('meeting_time');
        $vote->user_id = auth()->user()->id;

        $vote->save();

        return redirect()->route('dashboard')->with('success', 'Proposition créée !');
    }

    public function join(Request $request, $voteId)
    {
        $userId = auth()->id();
        $vote = Vote::findOrFail($voteId);

        if (!$vote->survey->is_open) {
            return redirect()->back()->withErrors(['message' => 'Le sondage est fermé ou n\'existe pas']);
        }

        // Check if the user is the creator of the vote
        if ($vote->user_id === $userId) {
            return redirect()->back()->withErrors(['message' => 'Vous ne pouvez pas rejoindre votre propre proposition !']);
        }

        // Check if the user has already joined any votes
        if ($vote->survey->votes()->whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->exists()) {
            return redirect()->back()->withErrors(['message' => 'Vous avez déjà rejoint une proposition pour ce sondage !']);
        }

        $vote->users()->attach($userId);

        return redirect()->route('dashboard')->with('success', 'Proposition rejointe avec succès !');
    }
}
