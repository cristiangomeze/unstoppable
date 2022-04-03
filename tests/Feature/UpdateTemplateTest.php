<?php

namespace Tests\Feature;

use App\Enums\FieldTypes;
use App\Enums\FieldAttributes;
use App\Models\User;
use App\Models\Template;
use App\Actions\UpdateTemplate;
use App\Actions\CreateField;
use App\Actions\UpdateField;
use App\Models\Field;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UpdateTemplateTest extends TestCase
{
    use RefreshDatabase;

    function test_template_can_be_updated()
    {
        $action = new UpdateTemplate;

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);

        $template = Template::factory()->create();

        $action->update($user, $template, ['name' => 'Test Template Updated']);

        $this->assertSame('Test Template Updated', $template->fresh()->name);
    }

    function test_field_can_be_added_to_template()
    {
        $action = new CreateField;

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);

        $template = Template::factory()->create();

        $action->create($user, $template, [
            'name' => 'Test_Field', 
            'type' => FieldTypes::TEXT->value,
            'attributes' => [
                FieldAttributes::REQUIRED->value
            ],
            'settings' => null
        ]);

        $action->create($user, $template, [
            'name' => 'Test_Field2', 
            'type' => FieldTypes::TEXTAREA->value,
            'attributes' => [
                FieldAttributes::REQUIRED->value
            ],
            'settings' => null
        ]);

        $this->assertCount(2, $template->refresh()->fields);
    }

    function test_field_can_be_updated_to_template()
    {
        $action = new UpdateField;

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);

        $template = Template::factory()
            ->has(Field::factory()->count(2), 'fields')
            ->create();

        $action->update($user, $template, $template->fields->first(), [
            'name' => 'Test_Field2', 
            'type' => FieldTypes::TEXTAREA->value,
            'attributes' => [
                FieldAttributes::REQUIRED->value
            ],
            'settings' => null
        ]);

        $this->assertCount(2, $template->refresh()->fields);

        $this->assertDatabaseHas('fields', [
            'name' => 'test_field2', 
            'type' => FieldTypes::TEXTAREA->value,
            'attributes' => json_encode([
                FieldAttributes::REQUIRED->value
            ]),
            'settings' => null
        ]);
    }
}
