<?php

namespace App\Http\Controllers;

use App\Album;
use App\Band;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		if (!empty($_GET['bandId'])) {
			return Band::findOrFail($_GET['bandId'])->albums;
		}
		return Album::all();
	}

	/**
	 * Show the form for creating a new resource.
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
	 * @param  \App\Album  $album
	 */
	public function show(Album $album)
	{
		return $album;
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Album  $album
	 */
	public function edit(Album $album)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Album  $album
	 */
	public function update(Request $request, Album $album)
	{
		$album->name = $request->input('name');
		$album->band_id = $request->input('band_id');
		$album->recorded_date = $request->input('recorded_date', null);
		$album->release_date = $request->input('release_date', null);
		$album->number_of_tracks = $request->input('number_of_tracks', null);
		$album->label = $request->input('label', null);
		$album->producer = $request->input('producer', null);
		$album->genre = $request->input('genre', null);
		$album->save();
		return Album::find($album->id);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Album  $album
	 */
	public function destroy(Album $album)
	{
		$album->delete();
		return $this->index();
	}
}
