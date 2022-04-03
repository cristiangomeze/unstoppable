<?php

namespace App\Actions;

use App\Models\Template;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class CreateTemplate
{
    /**
     * Validate and create a new template.
     *
     * @param mixed $user
     * @param array $input
     * @return void
     */
    public function create($user, $input)
    {
        Validator::make($input, [
            'name' => 'required',
            'file' => ['required', 'file', 'mimes:docx', 'mimetypes:application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        ])->validate();

        return Template::create([
            'name' => $input['name'],
            'file' => $input['file']->store('templates'),
        ]);
    }
}