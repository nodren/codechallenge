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
	}
}
