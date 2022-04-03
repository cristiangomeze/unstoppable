<?php

namespace App\Actions;

use App\Enums\FieldTypes;
use App\Enums\FieldAttributes;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;

class UpdateField
{
     /**
     * Validate and update a field for the given template.
     *
     * @param mixed $user
     * @param mixed $template
     * @param mixed $field
     * @param array $input
     * @return void
     */
    public function update($user, $template, $field, $input)
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

        $field->update([
            'name' => $input['name'],
            'type' => $input['type'],
            'attributes' => $input['attributes'],
            'settings' => $input['settings'],
        ]);
    }
}