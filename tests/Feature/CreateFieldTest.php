<?php

namespace Tests\Feature;

use App\Enums\FieldTypes;
use App\Enums\FieldAttributes;
use App\Actions\CreateField;
use App\Models\Field;
use App\Models\Template;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class CreateFieldTest extends TestCase
{
    use RefreshDatabase;

    function test_field_can_be_created()
    {
        $action = new CreateField;

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret',
        ]);

        $template = Template::factory()->create();

        $field = $action->create($user, $template, [
            'name' => 'Test_Field', 
            'type' => FieldTypes::SELECT->value,
            'attributes' => [
                FieldAttributes::REQUIRED->value
            ],
            'settings' => [
                'label' => 'Test Field with label',
                'select' => [
                    'One', 
                    'Two'
                ],
                'transforms' => [
                    'DateFormat',
                    'DateWords',
                    'NumberWords',
                    'NumberFormat',
                    'Lowercase',
                    'Uppercase',
                    'Capitalize',
                ]
            ]
        ]);

        $this->assertInstanceOf(Field::class, $field);

        $this->assertSame('test_field', $field->fresh()->name);
    }

    function test_name_is_required()
    {
        $this->expectException(ValidationException::class);
        
        $action = new CreateField;

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);
        
        $template = Template::factory()->create();

        $field = $action->create($user, $template, ['name' => '']);

        $this->assertInstanceOf(Field::class, $field);
    }

    
    function test_name_is_required_alpha_dash()
    {
        $this->expectException(ValidationException::class);
        
        $action = new CreateField;

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);
        
        $template = Template::factory()->create();

        $field = $action->create($user, $template, ['name' => 'Test Field']);

        $this->assertInstanceOf(Field::class, $field);
    }


    function test_type_is_required()
    {
        $this->expectException(ValidationException::class);
        
        $action = new CreateField;

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);

        $template = Template::factory()->create();

        $field = $action->create($user, $template, [
            'name' => 'Test_Field', 
            'type' => ''
        ]);

        $this->assertInstanceOf(Field::class, $field);
    }

    function test_attributes_required_a_valid_value()
    {
        $this->expectException(ValidationException::class);
        
        $action = new CreateField;

        $template = Template::factory()->create();

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);

        $field = $action->create($user, $template, [
            'name' => 'Test_Field', 
            'type' => FieldTypes::TEXT->value,
            'attributes' => ['Invalid']
        ]);

        $this->assertInstanceOf(Field::class, $field);
    }

    function test_settings_required_a_valid_value()
    {
        $this->expectException(ValidationException::class);
        
        $action = new CreateField;

        $template = Template::factory()->create();

        $user = User::forceCreate([
            'name' => 'Cristian Gomez',
            'email' => 'cristiangomeze@hotmail.com',
            'password' => 'secret'
        ]);

        $field = $action->create($user, $template, [
            'name' => 'Test_Field', 
            'type' => FieldTypes::TEXT->value,
            'attributes' => [
                FieldAttributes::REQUIRED->value
            ],
            'settings' => 'Invalid'
        ]);

        $this->assertInstanceOf(Field::class, $field);
    }
}
