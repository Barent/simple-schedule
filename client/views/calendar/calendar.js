Template.Calendar.rendered = function() {
	
};

Template.Calendar.events({
	
});

Template.Calendar.helpers({
	
});

Template.CalendarCalendarDisplay.rendered = function() {
    
	$('#appointments-calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,basicWeek,basicDay'
    },

    events: function(start, end, timezone, callback) {
        $('#appointments-calendar').fullCalendar( 'removeEvents' )
        var currentAppointment = Appointments.find({});
        
        currentAppointment.forEach(function(input){
            var innerEvent = {
                title: input.title,
                start: input.startdate,
                end: input.enddate
            }
            $('#appointments-calendar').fullCalendar( 'renderEvent', innerEvent, true );
        });

    },
        
    dayClick: function(date, jsEvent, view) {
        
        //alert('Clicked on: ' + date.format());

        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

        //alert('Current view: ' + view.name);
        
        //.fullCalendar( 'renderEvent', event [, stick ] )

        var dateTransformed = date.format("MM/DD/YYYY");
        var dateInputString = dateTransformed.toString();
        //console.log(dateInputString);
        //call a modal and use it to add event

        
        var currentAppointment = Appointments.findOne({"startdate": { $gte: dateInputString }});
        var theStart = currentAppointment.startdate;
        var eventTitle = currentAppointment.title;
        
        
        var events =  [
                {
                    title: eventTitle,
                    start: theStart
                }
            ]
        console.log(events[0]);
        //$('#appointments-calendar').fullCalendar( 'renderEvent', events[0], true );

        //$('#appointments-calendar').fullCalendar('rerenderEvents');
        
       
        // change the day's background color just for fun
        //$(this).css('background-color', 'red');

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



