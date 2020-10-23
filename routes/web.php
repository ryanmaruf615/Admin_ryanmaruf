<?php

use Illuminate\Support\Facades\Route;

//Post Service
Route::post('/AddService','ServiceController@AddService')->middleware('loginCheck');
Route::post('/ServiceDelete','ServiceController@ServiceDelete')->middleware('loginCheck');
//Post Review
Route::post('/AddReview','ReviewController@AddReview')->middleware('loginCheck');
//post Project
Route::post('/AddProject','ProjectController@AddProject')->middleware('loginCheck');
Route::post('/ProjectDelete','ProjectController@ProjectDelete')->middleware('loginCheck');



//login Management
Route::get('/Login','AdminLoginController@LoginPage');
Route::get('/onLogin/{UserName}/{Password}','AdminLoginController@onLogin');
Route::get('/LogOut','AdminLoginController@onLogout');


//home data Manage
Route::get('/CountSummary','HomeController@CountSummary')->middleware('loginCheck');


//Review Data Manage
Route::get('/ReviewList','ReviewController@ReviewList')->middleware('loginCheck');
Route::post('/ReviewDelete','ReviewController@ReviewDelete')->middleware('loginCheck');


//Service Data Manage
Route::get('/ServiceList','ServiceController@ServiceList')->middleware('loginCheck');
Route::post('/ServiceDelete','ServiceController@ServiceDelete')->middleware('loginCheck');


//Project Data Manage
Route::get('/ProjectList','ProjectController@ProjectList')->middleware('loginCheck');
Route::post('/ProjectListDelete','ProjectController@ProjectDelete')->middleware('loginCheck');


//Contact Data Manage
Route::get('/ContactList','ContactController@ContactList')->middleware('loginCheck');
Route::post('/ContactDelete','ContactController@ContactDelete')->middleware('loginCheck');




Route::get('/', function () {
    return view('index');
})->middleware('loginCheck');

Route::get('{AnyRoute}', function () {
    return view('index');
})->where('AnyRoute','.*')->middleware('loginCheck');
