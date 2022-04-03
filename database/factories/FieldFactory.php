<?php

namespace Database\Factories;

use App\Enums\FieldAttributes;
use App\Enums\FieldTypes;
use App\Models\Field;
use App\Models\Template;
use Illuminate\Database\Eloquent\Factories\Factory;

class FieldFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Field::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word(),
            'template_id' => Template::factory(),
            'type' => $this->faker->randomElement(FieldTypes::cases()),
            'attributes' => $this->faker->randomElement(FieldAttributes::cases()),
        ];
    }
}
