<?php

use Illuminate\Database\Seeder;

class AlbumTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('albums')->truncate();
		DB::table('albums')->insert([
			'band_id' => 1,
			'name' => 'The Lord of the Rings: The Fellowship of the Ring (soundtrack)',
			'recorded_date' => '2001-11-20',
			'release_date' => '2001-11-20',
			'number_of_tracks' => 18,
			'label' => 'Reprise',
			'Producer' => 'Howard Shore',
			'Genre' => 'Soundtrack',
		]);
		DB::table('albums')->insert([
			'band_id' => 1,
			'name' => 'The Lord of the Rings: The Two Towers (soundtrack)',
			'recorded_date' => '2002-12-10',
			'release_date' => '2002-12-10',
			'number_of_tracks' => 19,
			'label' => 'Reprise',
			'Producer' => 'Howard Shore',
			'Genre' => 'Soundtrack',
		]);
		DB::table('albums')->insert([
			'band_id' => 1,
			'name' => 'The Lord of the Rings: The Return of the King (soundtrack)',
			'recorded_date' => '2003-11-25',
			'release_date' => '2003-11-25',
			'number_of_tracks' => 19,
			'label' => 'Reprise',
			'Producer' => 'Howard Shore',
			'Genre' => 'Soundtrack',
		]);
		DB::table('albums')->insert([
			'band_id' => 2,
			'name' => 'Tron: Legacy (soundtrack)',
			'recorded_date' => '2010-12-03',
			'release_date' => '2010-12-03',
			'number_of_tracks' => 22,
			'label' => 'Walt Disney',
			'Producer' => 'Thomas Bangalter',
			'Genre' => 'Electronic',
		]);
		DB::table('albums')->insert([
			'band_id' => 3,
			'name' => 'Inception: Music from the Motion Picture',
			'recorded_date' => '2010-07-13',
			'release_date' => '2010-07-13',
			'number_of_tracks' => 12,
			'label' => 'Reprise',
			'Producer' => 'Hans Zimmer',
			'Genre' => 'Film score',
		]);
		DB::table('albums')->insert([
			'band_id' => 3,
			'name' => 'Interstellar: Original Motion Picture Soundtrack',
			'recorded_date' => '2012-10-01',
			'release_date' => '2014-11-17',
			'number_of_tracks' => 16,
			'label' => 'WaterTower',
			'Producer' => 'Hans Zimmer',
			'Genre' => 'Soundtrack',
		]);
		DB::table('albums')->insert([
			'band_id' => 4,
			'name' => 'Christmas Eve and Other Stories',
			'recorded_date' => '1995-01-01',
			'release_date' => '1996-10-15',
			'number_of_tracks' => 15,
			'label' => 'Lava Records',
			'Producer' => 'Paul O\'Neill',
			'Genre' => 'Christmas',
		]);
		DB::table('albums')->insert([
			'band_id' => 4,
			'name' => 'The Christmas Attic',
			'recorded_date' => '1997-01-01',
			'release_date' => '1998-09-15',
			'number_of_tracks' => 16,
			'label' => 'Lava Records',
			'Producer' => 'Paul O\'Neill',
			'Genre' => 'Christmas',
		]);
		DB::table('albums')->insert([
			'band_id' => 4,
			'name' => 'The Lost Christmas Eve',
			'recorded_date' => '2002-01-01',
			'release_date' => '2004-10-12',
			'number_of_tracks' => 23,
			'label' => 'Lava Records',
			'Producer' => 'Paul O\'Neill',
			'Genre' => 'Christmas',
		]);
	}
}
