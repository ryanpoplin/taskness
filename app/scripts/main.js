Parse.initialize("KlR3VwrPm7BS9xdzDGtp5aWUIc5uNp3MKmS4W6Lt", "iMrXKuklSyLMmvnOosbefgw5CBbViXYEmcUAjFtW");

require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery'
    }
});

require(['app', 'jquery'], function (app, $) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});

var TaskClass = Parse.Object.extend("Task");

var TaskCollectionClass = Parse.Collection.extend({
	model: TaskClass
});

var taskCollection = new TaskCollectionClass();
 
$(function(){

	taskCollection.fetch({
		success: function(collection) {
				collection.each(function(task){
				addToContentContainer(task);
			});
		}
	});

	$('.submit-btn').click(function(){
		taskValidate($('.task-field').val());
	});

	$('.delete-btn').click(function(){
		deleteTask(document.querySelector('#'));
	});

});

function taskValidate (task) {
	if(task === "") {
		$('.task-field').addClass('error').attr('placeholder', 'Please enter a task...');
	} else {
		saveTask(task);
		$('.task-field').val('');
	}
}

function saveTask (task) {
	var newTask = new TaskClass();
	newTask.set('task', task);
	newTask.save(null, {
		success: function(){
			addToContentContainer(newTask);
		},
		error: function(error){
			alert("A Parse error has occured..., " + error.description);
		}
	});
}

function deleteTask () {
	myObject.unset();
 	myObject.save();
}
 
function addToContentContainer (task) {
	var div = $('<div class="edit-container">'+task.get('task')+'</div>');
	$(div).attr('id', task.id);
	$('.task-container').append(div);
}