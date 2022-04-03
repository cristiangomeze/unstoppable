<?php

namespace App\Models;

use App\Enums\FieldTypes;
use App\Enums\FieldAttributes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Field extends Model
{
    use HasFactory;

    protected $casts = [
        'type' => FieldTypes::class,
        'attributes' => 'array',
        'settings' => 'array',
    ]; 

    public function name(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => strtolower($value)
        );
    }

    public function attributes(): Attribute
    {
        return Attribute::make(
            get: fn ($value, $attributes) => collect(json_decode($value))
                ->map(fn ($item) => FieldAttributes::tryFrom($item))
                ->filter()
                ->values()
        );
    }

    public function apiInputs()
    { 
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type->forHtml(),
            'attributes' => $this->__get('attributes')->map->forHtml(),
            'settings' => $this->settings,
        ];
    }
}
