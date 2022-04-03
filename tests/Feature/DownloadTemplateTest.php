<?php

namespace Tests\Feature;

use App\Actions\CreateTemplate;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DownloadTemplateTest extends TestCase
{
    use RefreshDatabase;

    function test_can_be_download_template_file()
    {
        $storage = Storage::fake('local');

        $file = UploadedFile::fake()
            ->create('document_word.docx', 1, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

        $action = new CreateTemplate;
           
        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);

        $template = $action->create($user, ['name' => 'Test Template', 'file' => $file]);
        
        $this->actingAs($user)->get('templates/'.$template->id.'/download')->assertSuccessful();

        Storage::shouldReceive('disk')
            ->with('local')
            ->andReturn($storage)
            ->shouldReceive('download')
            ->with($template->file)
            ->andReturn($file);
    }
}
