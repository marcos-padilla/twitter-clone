<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Setting>
 */
class SettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'private' => $this->faker->boolean,
            'theme' => $this->faker->randomElement(['light', 'dark']),
            'language' => $this->faker->randomElement(['en', 'es']),
        ];
    }
}
