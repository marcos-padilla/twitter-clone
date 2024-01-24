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

    public function updateRole(Request $request, Role $role)
    {
        if (!$request->user()->hasPermission('create-role')) {
            return response()->json([
                'message' => 'You do not have permission to update a role'
            ], 403);
        }
        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $role->id
        ]);

        $role->update([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Role updated successfully',
            'role' => $role
        ]);
    }
}
