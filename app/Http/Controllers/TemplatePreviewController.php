<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;
use Cristiangomeze\Template\Template as Preview;
use Illuminate\Support\Facades\Storage;

class TemplatePreviewController extends Controller
{
    public function __invoke(Request $request, Template $template)
    {
        return Preview::make(Storage::path($template->file))->preview($template->name . '.pdf');
    }
}
