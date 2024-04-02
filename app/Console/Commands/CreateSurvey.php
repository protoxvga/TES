<?php

namespace App\Console\Commands;

use App\Models\Survey;
use Illuminate\Console\Command;

class CreateSurvey extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-survey';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a survey every day at 11am.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Survey::create();
    }
}
