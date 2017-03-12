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
			return Band::findOrFail($_GET['bandId'])->albums()->with('band')->get();
		}
		return Album::with('band')->get();
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
		//
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
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Album  $album
	 */
	public function destroy(Album $album)
	{
		//
	}
}
