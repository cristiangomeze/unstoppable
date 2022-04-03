<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RecordsController extends Controller
{
    public function index()
    {
        return Inertia::render('Records/Index', [
            'records' => Record::query()
                ->with(['template' => fn ($query) => $query->select('id', 'name')])
                ->paginate()
                ->withQueryString()
                ->through(fn ($record) => [
                    'id' => $record->id,
                    'name' => $record->template->name,
                    'created_at' => $record->created_at->diffForHumans(),
                ])
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Records/Create');
    }

    public function store(Request $request)
    {
        $record = DB::transaction(function () use ($request) {
            $record = Record::create([
                'user_id' => $request->user()->id,
                'template_id' => $request->input('template_id')
            ]);
    
            collect($request->input('fields'))->each(fn ($value, $name) => $record->entries()->create([
                'name' => $name,
                'value' => $value
            ]));

            return $record;
        });

        return redirect()->route('records.edit', $record)->withSuccess('record created.');
    }

    public function edit(Request $request, Record $record)
    {
        return Inertia::render('Records/Edit', [
            'template' => [
                'id' => $record->template->id,
                'name' => $record->template->name,
                'fields' => $record->template->fields->map->apiInputs(),
            ],
            'record' => [
                'id' => $record->id,
                'entries' => $record->entries->map->only('id', 'name', 'value'),
                'owner' => $record->user->name
            ],
        ]);
    }

    public function update(Request $request, Record $record)
    {
        transform($record->entries, function ($entries)  use ($request) {
            collect($request->input('fields'))->each(fn ($value, $name) => 
                $entries->firstWhere('name', $name)?->update(['value' => $value])
            );
        });

        return redirect()->route('records.edit', $record)->withSuccess('record updated.');
    }
}
