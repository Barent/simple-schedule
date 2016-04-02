this.Appointments = new Mongo.Collection("appointments");

this.Appointments.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","manager","user"]);
}

this.Appointments.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","manager"]));
}

this.Appointments.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","manager"]);
}

this.Schemas = this.Schemas || {};

this.Schemas.Appointments = new SimpleSchema({
	title: {
		label: "Title",
		type: String
	},
	fieldtech: {
		label: "Field Tech",
		type: String,
		optional: true
	},
	startdate: {
		label: "Start Date",
		type: String
	},
	enddate: {
		label: "End Date",
		type: String
	},
	starttime: {
		label: "Start Time",
		type: String
	},
	endtime: {
		label: "End Time",
		type: String
	},
	Notes: {
		label: "Notes",
		type: String,
		optional: true
	}
});

this.Appointments.attachSchema(this.Schemas.Appointments);
