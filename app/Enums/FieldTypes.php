<?php

namespace App\Enums;

enum FieldTypes: int
{
    case TEXT = 1;
    case DATE = 2;
    case NUMBER = 3;
    case SELECT = 4;
    case SEARCH = 5;
    case HIDDEN = 6;
    case TEXTAREA = 7;

    public function name(): string
    {
        return match($this) {
            self::TEXT => 'Texto',
            self::DATE => 'Fecha',
            self::NUMBER => 'Numerico',
            self::SELECT => 'Lista',
            self::SEARCH => 'Búsqueda de datos',
            self::HIDDEN => 'Oculto',
            self::TEXTAREA => 'Textarea',
        };
    }

    public function forHtml(): string
    {
        return match($this) {
            self::TEXT => 'text',
            self::DATE => 'date',
            self::NUMBER => 'number',
            self::SELECT => 'select',
            self::SEARCH => 'data_search',
            self::HIDDEN => 'hidden',
            self::TEXTAREA => 'textarea',
        };
    }
}