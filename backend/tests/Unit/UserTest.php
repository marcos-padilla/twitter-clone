<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase
{
     use DatabaseTransactions;

     /**
      * Test para verificar la creación de un nuevo usuario.
      *
      * @return void
      */
     public function test_create_user()
     {
          $userData = [
               'name' => 'Test User',
               'username' => 'username_from_phpunit',
               'email' => 'test_from_phpunit@example.com',
               'password' => bcrypt('password123'),
          ];

          $user = User::create($userData);

          $this->assertInstanceOf(User::class, $user);
          $this->assertEquals($userData['name'], $user->name);
          $this->assertEquals($userData['email'], $user->email);
     }
}
