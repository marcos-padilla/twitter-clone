<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class PermissionRoleController extends Controller
{
    public function createRole(Request $request)
    {

        if (!$request->user()->hasPermission('create-role')) {
            return response()->json([
                'message' => 'You do not have permission to create a role'
            ], 403);
        }
        $request->validate([
            'name' => 'required|string|unique:roles,name'
        ]);

        $role = Role::create([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Role created successfully',
            'role' => $role
        ]);
    }
}