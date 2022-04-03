<?php

namespace App\Enums;

enum FieldAttributes: int
{
    case REQUIRED = 1;
    case READONLY = 2;

    public function name(): string
    {
        return match($this) {
            self::REQUIRED => 'Requerido',
            self::READONLY => 'Solo Lectura',
        };
    }

    public function forHtml(): string
    {
        return match($this) {
            self::REQUIRED => 'required',
            self::READONLY => 'readOnly',
        };
    }
}