<?php

namespace App;

enum UserRole: string
{
    case SuperAdmin = 'SUPERADMIN';
    case Admin      = 'AMDIN';
    case Librarian  = 'LIBRARIAN';
    case Member     = 'MEMBER';
}
