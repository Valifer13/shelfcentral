<?php

namespace App\Models;

use App\Models\Scopes\LibraryScope;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['borrow_id', 'amount', 'reason', 'status'])]
#[ScopedBy([LibraryScope::class])]
class Fine extends Model
{
    /** @use HasFactory<\Database\Factories\FineFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
        ];
    }

    public function borrow(): BelongsTo
    {
        return $this->belongsTo(Borrow::class);
    }
}
