<?php

namespace Tests\Feature;

use App\Actions\CreateTemplate;
use App\Models\Template;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class CreateTemplateTest extends TestCase
{
    use RefreshDatabase;

    function test_template_can_be_created()
    {
        Storage::fake('local');

        $file = UploadedFile::fake()
            ->create('document_word.docx', 1, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');

        $action = new CreateTemplate;

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);

        $template = $action->create($user, ['name' => 'Test Template', 'file' => $file]);

        $this->assertInstanceOf(Template::class, $template);

        Storage::disk('local')->assertExists('templates\\'. $file->hashName());
    }

    function test_name_is_required()
    {
        $this->expectException(ValidationException::class);
        
        $action = new CreateTemplate;

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);

        $action->create($user, ['name' => '']);
    }

    function test_file_is_required()
    {
        $this->expectException(ValidationException::class);
        
        $action = new CreateTemplate;

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);

        $action->create($user, ['name' => 'Test Template', 'file' => '']);
    }

    function test_file_must_be_a_valid_word_extension()
    {
        $this->expectException(ValidationException::class);

        Storage::fake('templates');

        $file = UploadedFile::fake()->image('document_word.jpg');

        $action = new CreateTemplate;

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);

        $action->create($user, ['name' => 'Test Template', 'file' => $file]);
    }
}
