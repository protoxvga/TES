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
        $vote = Vote::findOrFail($voteId);

        if (!$vote->survey->is_open) {
            return redirect()->back()->withErrors(['message' => 'Le sondage est fermé ou n\'existe pas']);
        }

        if ($vote->user_id === auth()->id()) {
            return redirect()->back()->withErrors(['message' => 'Tu ne peux pas rejoindre ta propre proposition !']);
        }

        $vote->users()->attach(auth()->user()->id);

        return redirect()->route('dashboard')->with('success', 'Proposition rejointe avec succès !');
    }
}
