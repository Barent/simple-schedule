var pageSession = new ReactiveDict();

Template.AppointmentsInsert.rendered = function() {
	$('#starttimeInput').timepicker();
	$('#endtimeInput').timepicker();
};

Template.AppointmentsInsert.events({
	
});

Template.AppointmentsInsert.helpers({
	
});

Template.AppointmentsInsertInsertForm.rendered = function() {
	

	pageSession.set("appointmentsInsertInsertFormInfoMessage", "");
	pageSession.set("appointmentsInsertInsertFormErrorMessage", "");

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

Template.AppointmentsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("appointmentsInsertInsertFormInfoMessage", "");
		pageSession.set("appointmentsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var appointmentsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(appointmentsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("appointmentsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("appointments", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("appointmentsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Appointments.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.AppointmentsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("appointmentsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("appointmentsInsertInsertFormErrorMessage");
	}
	
});
