<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('library_id')->nullable()->after('id')->constrained()->nullOnDelete();
            $table->enum('role', ['SUPER_ADMIN', 'ADMIN', 'LIBRARIAN', 'MEMBER'])->default('MEMBER')->after('password');
            $table->softDeletes()->after('updated_at');

            $table->unique(['library_id', 'email']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['library_id', 'email']);
            $table->dropConstrainedForeignId('library_id');
            $table->dropColumn(['role', 'deleted_at']);
        });
    }
};
