let todos = [] ;
let mode = "SEARCH";
let currentId;
let currentTaskName;
let curentPriority;

$(document).ready(function(){
	init();
});
function init()
{
	$('#add-button').bind('click',showAddMode);
	//$('#save-button-icon').bind('click',addTodo);	
	$('#edit-button-icon').bind('click',updateTodo);	
	$('#cancel-button').bind('click',clearUI);
	//$('#crud-span').hide();
	$('#clear-button').bind('click',clearText);
	$('#search-span').show();
	$('#search-name').bind('keyup',searchTodoByName);
	$('input[type=search]').bind('search', clearText)
	getTodos();
	init_add_modal();
	init_edit_modal();
	init_delete_modal();
}



function clearText()
{
	$('#search-name').val('');
	$('#tableBody tr').show();
	clearUI();
}


function searchTodoByName()
{
	
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

}

function showDarkBackground()
{
	console.log('show dark');
	        $('.ui-widget-overlay').addClass('custom-overlay');

}

function removeDarkBackground()
{
	 $('.ui-widget-overlay').removeClass('custom-overlay');

}



function showEditModal()
{
	$('#edit-span').dialog('open');
}


function showAddModal()
{
	$('#add-span').dialog('open');
}

function showdeleteModal()
{
	$('#delete-span').dialog('open');
}


function init_add_modal()
{
		$("#add-span").dialog({

		autoOpen:false,
		show:'blind',
		open: function() {
        $('.ui-widget-overlay').addClass('custom-overlay');
    } ,
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
            removeDarkBackground();
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


function init_delete_modal()
{	

		$("#delete-span").dialog({
		autoOpen:false,
		show:'blind',
			open: function() {
        $('.ui-widget-overlay').addClass('custom-overlay');
    } ,
		hide:'explode',
		title : 'Delete Task',
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
    	text:'Delete',
    	click : function(){
    		    		
    		$(this).dialog('close');
    		removeTodo();
	    	}
    }]
	})
}




function init_edit_modal()
{
	$("#edit-span").dialog({
		autoOpen:false,
		show:'blind',
		hide:'explode',
			open: function() {
        $('.ui-widget-overlay').addClass('custom-overlay');
    } ,
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
	//$('#save-button-icon').show();
	//$('#edit-button-icon').hide();
	showAddModal();
}





function searchMode()
{
	setMode("SEARCH");
	console.log('search icon');
//	$('#crud-span').hide();
	$('#search-span').show();

	
}

function setEditMode()
{
	//$('#crud-span').show();
	//$('#edit-button-icon').show();	
//	$('#save-button-icon').hide();	


}




function editMode(obj)
{
	setEditMode();
	var id = obj["id"];
	currentId=id;
	var taskname = obj["taskname"];
	var priority = obj["priority"];
	$('#edit-task-name').val(taskname);
	$('#edit-priority').val(priority);
	showEditModal();
}

function getDataFromUI(mode)
{

	if(mode == 'edit-mode')
	{
	currentTaskName=$('#edit-task-name').val().trim();
	currentPriority=$('#edit-priority').val();
	console.log("Uthaya gaya : "+currentTaskName);
	console.log("Uthaya gaya : "+currentId);

	console.log("Uthaya gaya : "+currentPriority);

}
}

function editTodo(obj) 
{
	editMode(obj);	

}


function setMode(val)
{

	mode = val; 

}



function highlightRowByName(name)
{
	console.log('NAME : '+name);
	var $rows = $('#tableBody tr');

	$rows.each(function(i, item) {

    $this = $(item);
    var vname = $(this).closest('tr').find('td:nth-child(2)').text();
    if ( vname == name ) {
    	console.log('matched '+vname+' with '+name+'');
        $('tbody').find('tr:first').addClass('selected');
   //     $this.addClass('selected');
    }

});
/*$("#tableBody").find("tr").each(function(index)
{
			if (index !== -1) {

				$row = $(this);

				var vname = $row.find("td:nth-child(2)").text();

				if(vname == name) 
					{
						console.log("index is  :"+index);
				console.log('matched '+vname+' with '+name+'');
				//$('#tableBody tr').removeClass('selected');
				var temp = $('#tableBody').find('tr').eq(index);
				console.log('we got it  : === '+temp);
				$('#tableBody').addClass('selected');
				//$('#tableBody > tr').eq(index).children().addClass('selected');

				//alert('Row --  > '+$(this));
			}
				}
	})
*/
}
function addTodo()
{
	console.log('add')
	var task = $('#add-task-name').val();
	var priority = $('#add-priority').val();
	if(priority== "-1")
	{
		showError('set Priority');
		return;
	}
	if(task.trim().length == 0)
	{
		alert('Fill up the empty fields');
		return;
	}
	clearUI();

	var json = {"task":task,"priority":priority};

	$.ajax({
		type:'GET',
		data: {test : JSON.stringify(json)},
		url :'/Crud/crud/insert',
		success:function(){
			getTodos();

	//		highlightRowByName(task);
		},
		error: function(){
			showError("some Error in add"+result);
		}
	})
}




function deleteTodo(id)
{

	currentId = id;
	var obj= searchTodoById(todos,id);
	currentTaskName = obj['taskname'];   
	var content = " "+id+"  --->  "+currentTaskName+" ";
	$('#delete-span p').text(content)
	console.log('C T N : '+currentTaskName);
	showdeleteModal(id);	

}


function removeTodo()
{

	console.log("id is : "+currentId)
	$.ajax({
		type:'GET',
		data: {"id": JSON.stringify(currentId)},
		url :'/Crud/crud/delete',
		success:function(){

			getTodos();
		},
		error: function(){
			showError("some Error in add");
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


function createRow(obj) 
{

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
	//editButton.id="edit-button";	
	editButton.addEventListener("click",function(){
		editTodo(obj);
	});

	const td4 = document.createElement("td");

	const deleteButton = document.createElement("i");
	deleteButton.className = "fas fa-trash-alt";
	//	deleteButton.id = "delete-button";

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
	getDataFromUI('edit-mode');
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
	//		highlightRowByName(currentTaskName);
		},
		error: function(){
			showError("some Error in add"+result);
		}
	})
}

function clearUI()
{
	$('#add-task-name').val("");
	$('#add-priority').val("-1");  
	$('#edit-task-name').val("");
	$('#edit-priority').val("-1");
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
}

function showError(message)
{
	alert(message);

}
