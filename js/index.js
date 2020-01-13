let todos = [] ;
let mode = "SEARCH";
let currentId;
let currentTaskName;
let curentPriority;

$(document).ready(function(){
	alert("Jquery is ready");
	init();
});
function init()
{
	$('#add-button').bind('click',showAddMode);
	$('#save-button-icon').bind('click',addTodo);	
	$('#edit-button-icon').bind('click',updateTodo);	
	$('#cancel-button').bind('click',clearUI);
	$('#crud-span').hide();
	$('#search-span').show();
	$('#search-name').bind('keyup',searchTodoByName);
	getTodos();
	init_add_modal();
	init_edit_modal();
}






function searchTodoByName()
{
	$("#search-name").keyup(function () {
		var value = this.value;
		console.log("Search bar se : "+value);

		$("#tableBody").find("tr").each(function(index) {
			if (index !== -1) {

				$row = $(this);

				var id = $row.find("td:nth-child(2)").text();
				console.log("name jo uthaya "+id);
				console.log("result : "+id.indexOf(value));
				if (id.indexOf(value) !== -1) {
					$row.show();
				}
				else {
					$row.hide();
				}
			}
		})

	});

}

function showEditModal()
{
	$('#crud-span').dialog('open');
}


function showAddModal()
{
	$('#crud-span').dialog('open');
}



function init_add_modal()
{
		$("#crud-span").dialog({
		autoOpen:false,
		show:'blind',
		hide:'explode',
		title : 'Add Task',
		draggable:false,
		  dialogClass: "no-close",
		  modal:true,	
		    resizable: false,
		width:550,
		dynamic:false,
		buttons: [{
        text: "Cancel",
        click: function() {
            $( this ).dialog( "close" );
            clearUI();
        }
    },{
    	text:'Save',
    	click : function(){
    		addTodo();    		
    		$(this).dialog('close');
    	}
    }]
	})
}



function init_edit_modal()
{
	$("#crud-span").dialog({
		autoOpen:false,
		show:'blind',
		hide:'explode',
		title : 'Edit Task',
		draggable:false,
		  dialogClass: "no-close",
		  modal:true,	
		    resizable: false,
		width:550,
		dynamic:false,
		buttons: [{
        text: "Cancel",
        click: function() {
            $( this ).dialog( "close" );
            clearUI();
        }
    },{
    	text:'Save',
    	click : function(){
    		updateTodo();    		
    		$(this).dialog('close');
    	}
    }]
	})
}





function searchTodoById(arr,val)
{
	for (var i=0; i < arr.length; i++) {
		if (arr[i].id == val) {
			return arr[i];
		}
	}

}



function test()
{
	$('#tableBody tr').on('click', function() {
		console.log('row Clicked');
		var selected = $(this).hasClass('selected');
		$('#tableBody tr').removeClass('selected')
		if(!selected)
		{	
			$(this).addClass('selected');
			var clicked = $(this).closest('tr').find('td:first').text();
			var obj = searchTodoById(todos,clicked);
			editTodo(obj);
			console.log("Found -->> "+clicked);
		}

	});
}

function showAddMode()
{
	clearUI();
	//$('#crud-span').show();
	$('#save-button-icon').show();
	$('#edit-button-icon').hide();
	showAddModal();
}





function searchMode()
{
	setMode("SEARCH");
	console.log('search icon');
	$('#crud-span').hide();
	$('#search-span').show();

	
}

function setEditMode()
{
	$('#crud-span').show();
	$('#edit-button-icon').show();	
	$('#save-button-icon').hide();	


}




function editMode(obj)
{
	setEditMode();
	var id = obj["id"];
	currentId=id;
	var taskname = obj["taskname"];
	var priority = obj["priority"];
	$('#task-name').val(taskname);
	$('#priority').val(priority);
	showEditModal();
}

function getDataFromUI()
{

	currentTaskName=$('#task-name').val();
	currentPriority=$('#priority').val();
	console.log("Uthaya gaya : "+currentTaskName);
	console.log("Uthaya gaya : "+currentId);

	console.log("Uthaya gaya : "+currentPriority);

}

function editTodo(obj) 
{
	editMode(obj);	
}


function setMode(val)
{

	mode = val; 

}

function crudTodo()
{
	console.log('in crud : '+mode);
	if(mode == "EDIT")
	{

	}
	if(mode == "ADD")
	{
		addTodo();
	}
	if(mode == "SEARCH")
	{
		searchTodo();
	}


}


function addTodo()
{
	console.log('add')
	var task = $('#task-name').val();
	var priority = $('#priority').val();
	if(priority== "-1")
	{
		showError('set Priority');
		return;
	}
	if(task.trim().length == 0)
	{
		alert('Fill up the empty fields');
	}
	clearUI();

	var json = {"task":task,"priority":priority};

	$.ajax({
		type:'GET',
		data: {test : JSON.stringify(json)},
		url :'/Crud/crud/insert',
		success:function(){

			getTodos();
		},
		error: function(){
			showError("some Error in add"+result);
		}
	})


}

function deleteTodo(id)
{
	console.log("id is : "+id)
	$.ajax({
		type:'GET',
		data: {"id": JSON.stringify(id)},
		url :'/Crud/crud/delete',
		success:function(){

			getTodos();
		},
		error: function(){
			showError("some Error in add"+result);
		}
	})



}

function getTodos()
{

	$.ajax({
		type:'GET',
		url:'/Crud/crud/getAll',
		success : function(result)
		{
			console.log(result);
			todos = result;
			populateTable();
		},
		error: function(result)
		{
			showError(result);
		}
	})
}


function createRow(obj) {

	const trow = document.createElement("tr");

	const td1 = document.createElement("td");
	td1.innerHTML = obj["id"];
	const td2 = document.createElement("td");
	td2.innerHTML = obj["taskname"];
	
	const td = document.createElement("td");
	td.innerHTML = obj["priority"];

	const td3 = document.createElement("td");
	const editButton = document.createElement("i");
	editButton.className = "fas fa-edit";
	editButton.id="edit-button";	
	editButton.addEventListener("click",function(){
		editTodo(obj);
	});

	const td4 = document.createElement("td");

	const deleteButton = document.createElement("i");
	deleteButton.className = "fas fa-trash-alt";
	deleteButton.addEventListener("click",function () {
		deleteTodo(obj["id"]);
	});
	td3.append(editButton);
	td4.append(deleteButton);
	trow.append(td1);
	trow.append(td2);
	trow.append(td);
	trow.append(td3);
	trow.append(td4);

	return trow;
}

function clearTable(){
	const tbody = document.getElementById("tableBody");
	tbody.innerHTML = "";
}







function updateTodo()
{
	getDataFromUI();
	console.log("_______++++_________")
	console.log("Uthaya gaya : "+currentTaskName);
	console.log("Uthaya gaya : "+currentId);

	console.log("Uthaya gaya : "+currentPriority);

	var json = {"id":currentId,"task":currentTaskName,"priority":currentPriority};

	$.ajax({
		type:'GET',
		data: {test : JSON.stringify(json)},
		url :'/Crud/crud/update',
		success:function(){

			getTodos();
		},
		error: function(){
			showError("some Error in add"+result);
		}
	})



}



function clearUI()
{
	$('#task-name').val("");
	$('#priority').val("-1");
	$('#tableBody tr').removeClass('selected')
	searchMode();
}

function populateTable()
{
	clearTable();
	clearUI();

	const tbody = $("#tableBody");
	todos.forEach(function (obj) {
		tbody.append(createRow(obj));

	});
	test();

}

function showError(message)
{
	alert(message);
}
