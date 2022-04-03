<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;

class ApiTemplateController extends Controller
{
    public function __invoke(Request $request)
    {
        return Template::query()
            ->with('fields')
            ->has('fields')
            ->when($request->input('search'), fn ($query, $search) => $query
                ->where('name', 'like', '%'.$search.'%')
                ->orWhere('id', $search)
            )
            ->latest()
            ->take(10)
            ->get()
            ->map(fn ($template) => [
                'id' => $template->id,
                'name' => $template->name,
                'fields' => $template->fields->map->apiInputs(),
                'unavailable' => (bool) $template->deleted_at
            ]);
    }
}