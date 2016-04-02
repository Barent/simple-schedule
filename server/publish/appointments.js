Meteor.publish("appointments", function() {
	if(Users.isInRoles(this.userId, ["admin"])) {
		return Appointments.find({}, {});
	}
	return Appointments.find({createdBy:this.userId}, {});
});

Meteor.publish("appointments_empty", function() {
	if(Users.isInRoles(this.userId, ["admin"])) {
		return Appointments.find({_id:null}, {});
	}
	return Appointments.find({_id:null,createdBy:this.userId}, {});
});

Meteor.publish("appointment", function(Id) {
	if(Users.isInRoles(this.userId, ["admin"])) {
		return Appointments.find({_id:Id}, {});
	}
	return Appointments.find({_id:Id,createdBy:this.userId}, {});
});

