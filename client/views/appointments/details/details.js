var pageSession = new ReactiveDict();

Template.AppointmentsDetails.rendered = function() {
	
};

Template.AppointmentsDetails.events({
	
});

Template.AppointmentsDetails.helpers({
	
});

Template.AppointmentsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("appointmentsDetailsDetailsFormInfoMessage", "");
	pageSession.set("appointmentsDetailsDetailsFormErrorMessage", "");

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

Template.AppointmentsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("appointmentsDetailsDetailsFormInfoMessage", "");
		pageSession.set("appointmentsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var appointmentsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(appointmentsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("appointmentsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("appointmentsDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("appointments", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("appointments", {});
	}

	
});

Template.AppointmentsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("appointmentsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("appointmentsDetailsDetailsFormErrorMessage");
	}
	
});
