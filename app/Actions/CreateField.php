<?php

namespace App\Actions;

use App\Enums\FieldTypes;
use App\Enums\FieldAttributes;
use App\Models\Field;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;

class CreateField
{
     /**
     * Validate and create a new field for the given template.
     *
     * @param mixed $user
     * @param mixed $template
     * @param array $input
     * @return void
     */
    public function create($user, $template, $input)
    {
        Validator::make($input, [
            'name' => ['required', 'alpha_dash'],
            'type' => ['required', new Enum(FieldTypes::class)],
            'attributes' => ['nullable', 'array'],
            'attributes.*' => new Enum(FieldAttributes::class),
            'settings' => ['nullable', 'array'],
            'settings.label' => ['sometimes', 'required', 'string', 'min:3', 'max:40'],
            'settings.select' => ['required_if:type,'. FieldTypes::SELECT->value, 'array'],
            'settings.transforms' => ['sometimes', 'required', 'array']
        ])->validate();

        return Field::create([
            'name' => $input['name'],
            'template_id' => $template->id,
            'type' => $input['type'],
            'attributes' => $input['attributes'],
            'settings' => $input['settings'],
        ]);
    }
}