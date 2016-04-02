var pageSession = new ReactiveDict();

Template.AppointmentsEdit.rendered = function() {
	
};

Template.AppointmentsEdit.events({
	
});

Template.AppointmentsEdit.helpers({
	
});

Template.AppointmentsEditEditForm.rendered = function() {
	

	pageSession.set("appointmentsEditEditFormInfoMessage", "");
	pageSession.set("appointmentsEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.AppointmentsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("appointmentsEditEditFormInfoMessage", "");
		pageSession.set("appointmentsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var appointmentsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(appointmentsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("appointmentsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("appointments", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("appointmentsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Appointments.update({ _id: t.data.appointment._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("appointments", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.AppointmentsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("appointmentsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("appointmentsEditEditFormErrorMessage");
	}
	
});
