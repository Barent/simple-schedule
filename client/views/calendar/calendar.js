Template.Calendar.rendered = function() {
	
};

Template.Calendar.events({
	
});

Template.Calendar.helpers({
	
});

Template.CalendarCalendarDisplay.rendered = function() {
	$('#appointments-calendar').fullCalendar({
    dayClick: function(date, jsEvent, view) {

        //alert('Clicked on: ' + date.format());

        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

        //alert('Current view: ' + view.name);
        
        
        var dateTransformed = date.format("MM/DD/YYYY");
        var dateInputString = dateTransformed.toString();
        console.log(dateInputString);
        
        var currentAppointment = Appointments.findOne({"startdate": { $gte: dateInputString }});
        var theStart = currentAppointment.startdate;
        var eventTitle = currentAppointment.title;
        
        
       
        // change the day's background color just for fun
        $(this).css('background-color', 'red');

    }
});

};

Template.CalendarCalendarDisplay.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
	
	
});

Template.CalendarCalendarDisplay.helpers({

});



