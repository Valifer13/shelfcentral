<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('borrows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('library_id')->constrained()->cascadeOnDelete();
            $table->foreignId('book_copy_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamp('borrowed_at')->useCurrent();
            $table->timestamp('due_at')->nullable();
            $table->timestamp('returned_at')->nullable();
            $table->decimal('total_fine', 12, 2)->default(0);
            $table->enum('status', ['ONGOING', 'RETURNED', 'OVERDUE', 'LOST'])->default('ONGOING');
            $table->timestamps();

            $table->index(['library_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('borrows');
    }
};
