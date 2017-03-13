<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Band extends Model
{
	public function albums()
	{
		return $this->hasMany('App\Album');
	}

	public function setStartDateAttribute($value)
	{
		if ($value !== null) {
			$this->attributes['start_date'] = date('Y-m-d', strtotime($value));
		}
	}
}
