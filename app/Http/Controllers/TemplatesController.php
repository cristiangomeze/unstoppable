<?php

namespace App\Http\Controllers;

use App\Actions\CreateTemplate;
use App\Actions\UpdateTemplate;
use App\Enums\FieldAttributes;
use App\Enums\FieldTypes;
use App\Models\Template;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TemplatesController extends Controller
{
    public function index()
    {
        return Inertia::render('Templates/Index', [
            'templates' => Template::query()
                ->paginate()
                ->withQueryString()
                ->through(fn ($template) => [
                    'id' => $template->id,
                    'name' => $template->name,
                    'created_at' => $template->created_at->diffForHumans()
                ])
        ]);
    }

    public function create()
    {
        return Inertia::render('Templates/Create');
    }

    public function store(Request $request, CreateTemplate $action)
    {
        $template = $action->create($request->user(), $request->all());

        return redirect()->route('templates.edit', $template)->withSuccess('Plantilla creada correctamente.');
    }

    public function edit(Request $request, Template $template)
    {
        return Inertia::render('Templates/Edit', [
            'types' => collect(FieldTypes::cases())->map(fn ($item) => [
                    'id' => $item->value, 
                    'name' => $item->name()
            ]),
            'attributes' => collect(FieldAttributes::cases())->map(fn ($item) => [
                'id' => $item->value, 
                'name' => $item->name()
            ]),
            'template' => [
                'id' => $template->id,
                'name' => $template->name,
                'fields' => $template->fields->transform(fn ($field) => [
                    'id' => $field->id,
                    'name' => $field->name, 
                    'type' => [
                        'name' => $field->type->name(),
                        'value' => $field->type
                    ], 
                    'attributes' => [
                        'name' => $field->attributes->map->name(),
                        'value' => $field->attributes
                    ],
                    'settings' => (object) $field->settings
                ]),
            ],
            'attachments' => [
                [
                    'name' => $template->file,
                    'url' => url('templates/'.$template->id.'/download')
                ]
            ],
        ]);
    }

    public function update(Request $request, Template $template, UpdateTemplate $action)
    {
        $action->update($request->user(), $template, $request->all());

        return redirect()->back()->withSuccess('Template updated.');
    }
}
