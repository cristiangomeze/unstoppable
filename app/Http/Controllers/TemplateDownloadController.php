<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TemplateDownloadController extends Controller
{
    public function __invoke(Request $request, Template $template)
    {
        return Storage::download($template->file);
    }
}
