<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        return response()->json([
            'data' => $request->user()->setting,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingRequest $request)
    {
        $request->user()->setting()->update($request->validated());
        return response()->json([
            'message' => 'Setting updated successfully',
        ]);
    }
}
