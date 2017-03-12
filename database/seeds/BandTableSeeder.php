<?php

use Illuminate\Database\Seeder;

class BandTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('bands')->truncate();
		DB::table('bands')->insert([
			'name' => 'Howard Shore',
			'start_date' => '1978-09-08',
			'website' => 'http://www.howardshore.com/',
			'still_active' => true,
		]);
		DB::table('bands')->insert([
			'name' => 'Daft Punk',
			'start_date' => '1997-01-20',
			'website' => 'https://www.daftpunk.com/',
			'still_active' => true,
		]);
		DB::table('bands')->insert([
			'name' => 'Hans Zimmer',
			'start_date' => '1988-12-16',
			'website' => 'http://www.hans-zimmer.com/',
			'still_active' => true,
		]);
		DB::table('bands')->insert([
			'name' => 'Trans Siberian Orchestra',
			'start_date' => '1996-10-15',
			'website' => 'http://www.trans-siberian.com/',
			'still_active' => true,
		]);
	}
}
