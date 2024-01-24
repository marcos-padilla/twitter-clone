<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        if (!$request->user()->hasPermission('create-role')) {
            return response()->json([
                'message' => 'You do not have permission to create a role'
            ], 403);
        }
        $request->validate([]);

        $role = Role::create([
            'name' => $request->name
        ]);

        foreach ($request->permissions as $permission) {
            $role->permissions()->attach(Permission::where('name', $permission)->first());
        }
        return response()->json([
            'message' => 'Role created successfully',
            'role' => $role
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        if (!$request->user()->hasPermission('create-role')) {
            return response()->json([
                'message' => 'You do not have permission to update a role'
            ], 403);
        }
        if ($role->name === 'admin') {
            return response()->json([
                'message' => 'You cannot update the admin role'
            ], 403);
        }

        $role->update([
            'name' => $request->name
        ]);

        $role->permissions()->detach();
        foreach ($request->permissions as $permission) {
            $role->permissions()->attach(Permission::where('name', $permission)->first());
        }

        return response()->json([
            'message' => 'Role updated successfully',
            'role' => $role
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Role $role)
    {
        if (!$request->user()->hasPermission('delete-role')) {
            return response()->json([
                'message' => 'You do not have permission to delete a role'
            ], 403);
        }
        if ($role->name === 'admin') {
            return response()->json([
                'message' => 'You cannot delete the admin role'
            ], 403);
        }
        $role->delete();
        return response()->json([
            'message' => 'Role deleted successfully'
        ]);
    }

    public function assignRole(Request $request, Role $role)
    {
        if (!$request->user()->hasPermission('assign-role')) {
            return response()->json([
                'message' => 'You do not have permission to assign a role'
            ], 403);
        }
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::find($request->user_id);
        $user->roles()->detach();
        $user->roles()->attach(
            $role
        );

        return response()->json([
            'message' => 'Role assigned successfully'
        ]);
    }
}
