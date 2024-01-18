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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('content');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('reply', ['everyone', 'follow', 'verified', 'mention'])->default('everyone');
            $table->date('scheduled_at')->nullable();
            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_sensitive')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
