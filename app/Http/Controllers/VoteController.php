<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\Survey;
use App\Models\Vote;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoteController extends Controller
{
    public function render()
    {
        $start = (new Carbon('now'))->hour(0)->minute(0)->second(0);
        $end = (new Carbon('now'))->hour(23)->minute(59)->second(59);

        $survey = Survey::whereBetween('created_at', [$start , $end])->get();
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
        $currentDate = now()->toDateString();
        $survey = Survey::whereDate('created_at', $currentDate)->first();

        $validatedData = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'meeting_time' => 'required|date_format:H:i',
            'location' => 'required|in:eat_in,takeway,delivery',
        ]);

        if (!$survey) {
            $survey = Survey::create();
        }

        if (Vote::where('user_id', $userId)->where('survey_id', $survey->id)->exists()) {
            return redirect()->route('dashboard')->withErrors(['message' => 'Vous ne pouvez pas créer de nouvelle proposition !']);
        }

        if ($survey->votes()->whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->exists()) {
            return redirect()->back()->withErrors(['message' => 'Vous avez déjà rejoint une proposition pour ce sondage !']);
        }

        if (Vote::where('meeting_time', $validatedData['meeting_time'])
            ->where('location', $validatedData['location'])
            ->where('restaurant_id', $validatedData['restaurant_id'])
            ->where('survey_id', $survey->id)
            ->exists()) {
            return redirect()->route('dashboard')->withErrors(['message' => 'Attention, une proposition identique existe déjà ! Rejoignez-la !']);
        }

        $vote = new Vote([
            'restaurant_id' => $validatedData['restaurant_id'],
            'meeting_time' => $validatedData['meeting_time'],
            'location' => $validatedData['location'],
            'user_id' => $userId,
        ]);

        $survey->votes()->save($vote);

        return redirect()->route('dashboard')->with('success', 'Proposition créée !');
    }

    public function join(Request $request, $voteId)
    {
        $userId = auth()->id();
        $vote = Vote::findOrFail($voteId);

        if ($vote->where('user_id', $userId)->where('survey_id', $vote->survey->id)->exists()) {
            return redirect()->route('dashboard')->withErrors(['message' => 'Vous avez deja créer une proposition pour ce sondage !']);
        }

        if ($vote->user_id === $userId) {
            return redirect()->back()->withErrors(['message' => 'Vous ne pouvez pas rejoindre votre propre proposition !']);
        }

        if ($vote->survey->votes()->whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->exists()) {
            return redirect()->back()->withErrors(['message' => 'Vous avez déjà rejoint une proposition pour ce sondage !']);
        }

        $vote->users()->attach($userId);

        return redirect()->route('dashboard')->with('success', 'Proposition rejointe avec succès !');
    }
}
