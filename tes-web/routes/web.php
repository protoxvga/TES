<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoteController;
use App\Http\Middleware\CheckSurveyVote;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'render'])->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', CheckSurveyVote::class])->group(function () {
    Route::get('/vote', [VoteController::class, 'render'])->name('vote');
    Route::post('/vote', [VoteController::class, 'create'])->name('vote.create');
    Route::post('/vote/{voteId}/join', [VoteController::class, 'join'])->name('vote.join');
});

require __DIR__.'/auth.php';
