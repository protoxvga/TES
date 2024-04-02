<?php

namespace App\Http\Middleware;

use App\Models\Survey;
use Closure;
use Illuminate\Http\Request;

class CheckSurveyVote
{
    public function handle(Request $request, Closure $next)
    {
        $surveyId = $request->input('survey_id');

        if ($surveyId) {
            $survey = Survey::find($surveyId);

            if (!$survey || !$survey->is_open) {
                return redirect()->back()->withErrors(['message' => 'Le sondage est fermé ou n\'existe pas']);
            }

            if ($survey->votes()->where('user_id', auth()->id())->exists()) {
                return redirect()->back()->withErrors(['message' => 'Tu as déjà créer / voté pour ce sondage']);
            }
        } else {
            $openSurvey = Survey::where('is_open', true)->exists();

            if (!$openSurvey) {
                return redirect()->back()->withErrors(['message' => 'Aucun sondage n\'est ouvert actuellement']);
            }
        }

        return $next($request);
    }
}
