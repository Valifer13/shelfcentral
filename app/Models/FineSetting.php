<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['library_id', 'grace_period_days', 'fine_per_day', 'max_fine_amount'])]
class FineSetting extends Model
{
    /** @use HasFactory<\Database\Factories\FineSettingFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'fine_per_day' => 'decimal:2',
            'max_fine_amount' => 'decimal:2',
        ];
    }

    public function library(): BelongsTo
    {
        return $this->belongsTo(Library::class);
    }
}
