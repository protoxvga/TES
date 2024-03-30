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
        $survey = Survey::find($surveyId);

        if (!$survey || !$survey->is_open) {
            return redirect()->back()->withErrors(['message' => 'Le sondage est fermé ou n\'existe pas']);
        }

        if ($survey->votes()->where('user_id', auth()->id())->exists()) {
            return redirect()->back()->withErrors(['message' => 'Tu as déjà voté pour ce sondage']);
        }

        return $next($request);
    }
}
