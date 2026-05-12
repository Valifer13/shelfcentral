<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->foreignId('library_id')->constrained()->cascadeOnDelete();
            $table->string('isbn');
            $table->string('title');
            $table->foreignId('publisher_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->year('publication_year');
            $table->integer('stock_total')->default(0);
            $table->integer('stock_available')->default(0);
            $table->decimal('average_rating', 3, 2)->default(0);
            $table->integer('total_reviews')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['library_id', 'isbn']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
