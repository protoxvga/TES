<?php

use Illuminate\Support\Facades\Schedule;
 
Schedule::command('app:create-survey')->daily()->at('21:27')->timezone('Europe/Paris');
Schedule::command('app:close-survey')->weekdays()->at('22:54')->timezone('Europe/Paris');