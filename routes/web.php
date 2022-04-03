<?php

use App\Http\Controllers\ApiTemplateController;
use App\Http\Controllers\RecordPreviewController;
use App\Http\Controllers\RecordsController;
use App\Http\Controllers\TemplateDownloadController;
use App\Http\Controllers\TemplateFieldController;
use App\Http\Controllers\TemplatePreviewController;
use App\Http\Controllers\TemplatesController;
use App\Models\Template;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', 'dashboard');

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia\Inertia::render('Dashboard'))->name('dashboard');

    Route::get('records', [RecordsController::class, 'index'])->name('records');
    Route::get('records/create', [RecordsController::class, 'create'])->name('records.create');
    Route::post('records', [RecordsController::class, 'store'])->name('records.store');
    Route::get('records/{record}/edit', [RecordsController::class, 'edit'])->name('records.edit');
    Route::put('records/{record}', [RecordsController::class, 'update'])->name('records.update');
    
    Route::get('records/{record}/preview', RecordPreviewController::class);

    Route::get('templates', [TemplatesController::class, 'index'])->name('templates');
    Route::get('templates/create', [TemplatesController::class, 'create'])->name('templates.create');
    Route::post('templates', [TemplatesController::class, 'store']);
    Route::get('templates/{template}/edit', [TemplatesController::class, 'edit'])->name('templates.edit');
    Route::put('templates/{template}', [TemplatesController::class, 'update'])->name('templates.update');

    Route::get('templates/{template}/download', TemplateDownloadController::class);
    Route::get('templates/{template}/preview', TemplatePreviewController::class)->name('templates.preview');

    Route::post('templates/{template}/fields', [TemplateFieldController::class, 'store']);
    Route::put('templates/{template:id}/fields/{field:id}', [TemplateFieldController::class, 'update']);
    Route::delete('templates/{template:id}/fields/{field:id}', [TemplateFieldController::class, 'destroy']);

    Route::get('monolith-api/templates', ApiTemplateController::class);
});
