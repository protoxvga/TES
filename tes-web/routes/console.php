<?php

use Illuminate\Support\Facades\Schedule;
 
Schedule::command('app:create-survey')->weekdays()->at('22:53')->timezone('Europe/Paris');
Schedule::command('app:close-survey')->weekdays()->at('22:54')->timezone('Europe/Paris');