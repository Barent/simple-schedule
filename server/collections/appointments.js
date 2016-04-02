Appointments.allow({
	insert: function (userId, doc) {
		return Appointments.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Appointments.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Appointments.userCanRemove(userId, doc);
	}
});

Appointments.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Appointments.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Appointments.before.remove(function(userId, doc) {
	
});

Appointments.after.insert(function(userId, doc) {
	
});

Appointments.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Appointments.after.remove(function(userId, doc) {
	
});
