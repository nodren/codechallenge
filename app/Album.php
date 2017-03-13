<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
	protected $with = ['band'];
	public function band()
	{
		return $this->belongsTo('App\Band');
	}

	public function setRecordedDateAttribute($value)
	{
		if ($value !== null) {
			$this->attributes['recorded_date'] = date('Y-m-d', strtotime($value));
		}
	}

	public function setReleaseDateAttribute($value)
	{
		if ($value !== null) {
			$this->attributes['release_date'] = date('Y-m-d', strtotime($value));
		}
	}
}
