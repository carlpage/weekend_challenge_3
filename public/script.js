$(document).ready(function() {
  listTasks();
  $("ul").on("click", "li", function() {
    $(this).toggleClass("completed");
    // completeTask();
  });

  //click on x to delete function
  $("ul").on("click", "span", function(event) {
    $(this).parent().fadeOut(500, function() {
      $(this).remove();
      // insert function that deletes from DB
    });
    event.stopPropagation();
  });

  $("#submit").on('click', registerTask);
  //grabbing new todo text from input

  $(".fa-plus").click(function() {
    $("input[type='text'").fadeToggle();
  });

  function listTasks() {
    $.ajax({
      url: '/newTasks',
      type: 'GET',
      success: function(response) {
        console.log('got some taaasssssks: ', response);
        $("ul").empty();
        for (var i = 0; i < response.length; i++) {
          var taskThing = response[i].task;
          var id = response[i].id;
          console.log('new task: ', taskThing);
          $("ul").append("<li id=" + id + "><span><i class='fa fa-trash'></i></span> " + taskThing + "</li>");
          if (response[i].complete === true) {
            $("#" + id).toggleClass("completed"); // puts line through the listed item if completed is returned true
          }
        } // end for loop
      } // end success
    }); //end ajax
  };

  function registerTask() {
    console.log('in registerTask on click');
    var todoText = {
      taskName: $('#add-item').val()
    };
    console.log(todoText + "Hello World");
    $.ajax({
      url: '/register',
      type: 'POST',
      data: todoText,
      success: function(data) {
        console.log('got some text: ', data);
        listTasks();
      } // end success
    }); //end ajax
  };

  function completeTask() {
    console.log('in completeTask on click');
    var todo = {
      taskName: $('#add-item').val()
    };
    $.ajax({
      type: 'POST',
      url: '/newTasks',
      data: todo,
      success: function(response) {
        console.log(response);
        listTasks();
        $(this).toggleClass("completed");
      } //end success
    }); //end Ajax
  }

  // function deleteTask() {
  //   console.log('in deleteTask on click');
  //
  // }

}); // end document.ready


// need to modify registerOwner to get it to post new task onto page
// get info to post from DB to client-side, then get complete and delete functionalities working
