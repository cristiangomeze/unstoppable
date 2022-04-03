<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Cristiangomeze\Template\Transforms\Transform;
use Cristiangomeze\Template\Template as Preview;
use Illuminate\Support\Facades\Storage;

class RecordPreviewController extends Controller
{
    public function __invoke(Request $request, Record $record)
    {
        $transforms = Transform::make(
            $this->transformValuesForTemplate($record->template->fields, $record->entries)
        )->toArray();   
        
        return Preview::make(Storage::path($record->template->file))
            ->addValues($transforms)
            ->preview($record->template->name . '.pdf');
    }

    protected function transformValuesForTemplate($fields, $entries)
    {
        return $entries->map(fn ($entry) => [
            'key' => $entry->name,
            'value' => $entry->value,
            'transforms' => data_get($fields->firstWhere('name', $entry->name), 'settings.transforms', [])
        ]);
    }
}
