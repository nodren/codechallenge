<?php

namespace App\Http\Controllers;

use App\Band;
use Illuminate\Http\Request;

class BandController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 */
	public function index()
	{
		return Band::all();
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 */
	public function store(Request $request)
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Band  $band
	 */
	public function show(Band $band)
	{
		return $band;
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Band  $band
	 */
	public function edit(Band $band)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Band  $band
	 */
	public function update(Request $request, Band $band)
	{
		$band->name = $request->input('name');
		$band->start_date = $request->input('start_date', null);
		$band->website = $request->input('website', null);
		$band->still_active = $request->input('still_active', false);
		$band->save();
		return $band;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Band  $band
	 */
	public function destroy(Band $band)
	{
		foreach ($band->albums as $album) {
			$album->delete();
		}
		$band->delete();
		return $this->index();
	}
}
