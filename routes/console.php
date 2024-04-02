<?php

use Illuminate\Support\Facades\Schedule;
 
Schedule::command('app:create-survey')->weekdays()->at('10:30')->timezone('Europe/Paris');
Schedule::command('app:close-survey')->weekdays()->at('13:00')->timezone('Europe/Paris');