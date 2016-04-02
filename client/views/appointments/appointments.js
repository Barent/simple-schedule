var pageSession = new ReactiveDict();

Template.Appointments.rendered = function() {
	
};

Template.Appointments.events({
	
});

Template.Appointments.helpers({
	
});

var AppointmentsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AppointmentsViewSearchString");
	var sortBy = pageSession.get("AppointmentsViewSortBy");
	var sortAscending = pageSession.get("AppointmentsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["title", "fieldtech", "startdate", "enddate", "starttime", "endtime", "Notes"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var AppointmentsViewExport = function(cursor, fileType) {
	var data = AppointmentsViewItems(cursor);
	var exportFields = ["title", "fieldtech", "startdate", "enddate", "starttime", "endtime", "Notes"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AppointmentsView.rendered = function() {
	pageSession.set("AppointmentsViewStyle", "table");
	
};

Template.AppointmentsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("AppointmentsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("AppointmentsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("AppointmentsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("appointments.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AppointmentsViewExport(this.appointments, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AppointmentsViewExport(this.appointments, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AppointmentsViewExport(this.appointments, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AppointmentsViewExport(this.appointments, "json");
	}

	
});

Template.AppointmentsView.helpers({

	"insertButtonClass": function() {
		return Appointments.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.appointments || this.appointments.count() == 0;
	},
	"isNotEmpty": function() {
		return this.appointments && this.appointments.count() > 0;
	},
	"isNotFound": function() {
		return this.appointments && pageSession.get("AppointmentsViewSearchString") && AppointmentsViewItems(this.appointments).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AppointmentsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AppointmentsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AppointmentsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AppointmentsViewStyle") == "gallery";
	}

	
});


Template.AppointmentsViewTable.rendered = function() {
	
};

Template.AppointmentsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AppointmentsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AppointmentsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AppointmentsViewSortAscending") || false;
			pageSession.set("AppointmentsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AppointmentsViewSortAscending", true);
		}
	}
});

Template.AppointmentsViewTable.helpers({
	"tableItems": function() {
		return AppointmentsViewItems(this.appointments);
	}
});


Template.AppointmentsViewTableItems.rendered = function() {
	
};

Template.AppointmentsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("appointments.details", {Id: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Appointments.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Appointments.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("appointments.edit", {Id: this._id});
		return false;
	}
});

Template.AppointmentsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Appointments.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Appointments.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
