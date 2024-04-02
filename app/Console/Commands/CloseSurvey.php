<?php

namespace App\Console\Commands;

use App\Models\Survey;
use Illuminate\Console\Command;

class CloseSurvey extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:close-survey';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Survey::where('is_open', true)->update(['is_open' => false]);
    }
}
