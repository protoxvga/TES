<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = File::get(database_path('data/restaurants.json'));
        $data = json_decode($json);

        foreach ($data as $restaurant) {
            Restaurant::create([
                'geo_point_lon' => $restaurant->geo_point_2d->lon,
                'geo_point_lat' => $restaurant->geo_point_2d->lat,
                'type' => $restaurant->type,
                'name' => $restaurant->name,
                'opening_hours' => $restaurant->opening_hours,
                // 'cuisine' => $restaurant->cuisine,
                'phone' => $restaurant->phone,
                'website' => $restaurant->website,
            ]);
        }
    }
}
