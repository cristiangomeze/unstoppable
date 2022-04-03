<?php

namespace App\Actions;

use Illuminate\Support\Facades\Validator;

class UpdateTemplate
{
    /**
     * Validate and update the given template.
     *
     * @param mixed $user
     * @param mixed $template
     * @param array $input
     * @return void 
     */
    public function update($user, $template, $input)
    {
        Validator::make($input, [
            'name' => 'required',
            'file' => ['nullable', 'file', 'mimes:docx', 'mimetypes:application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        ])->validate();

        $template->update([
            'name' => $input['name']
        ]);
    }
}