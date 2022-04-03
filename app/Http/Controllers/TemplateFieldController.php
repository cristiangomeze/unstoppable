<?php

namespace App\Http\Controllers;

use App\Actions\CreateField;
use App\Actions\UpdateField;
use App\Models\Field;
use App\Models\Template;
use Illuminate\Http\Request;

class TemplateFieldController extends Controller
{
    public function store(Request $request, Template $template, CreateField $action)
    {
        $request->merge([
            'settings' =>  json_decode($request->input('settings'), true),
        ]);

        $action->create($request->user(), $template, $request->all());

        return redirect()->route('templates.edit', $template)->withSuccess('Field added.');
    }

    public function update(Request $request, Template $template, Field $field, UpdateField $action)
    {
        $request->merge([
            'settings' =>  json_decode($request->input('settings'), true),
        ]);
        
        $action->update($request->user(), $template, $field, $request->all());

        return redirect()->route('templates.edit', $template)->withSuccess('Field updated.');
    }

    public function destroy(Template $template, Field $field)
    {
        $field->delete();

        return redirect()->route('templates.edit', $template)->withSuccess('Field deleted.');
    }
}
