sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	const $ = jQuery;

	return Controller.extend("cn.template.controller.BaseController", {
		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Event handler for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 */
		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true);
			}
		},

		http_get: function (url, path, params, header) {
			for (let e in path) {
				url += ("/" + path[e])
			}
			url += '?';
			for (let e in params) {
				if (typeof (params[e]) == "object") {
					let t = params[e];
					for (let p in t) {
						url += (e + "=" + t[p] + "&");
					}
				} else {
					url += (e + "=" + params[e] + "&");
				}
			}
			return new Promise((resolve, reject) => {
				$.ajax({
					url: url,
					type: "GET",
					headers: header,
					success: res => {
						let code = res.code + "";
						if (typeof (res.code) == "undefined") {
							resolve(res);
						} else {
							if (code[0] == "2") {
								resolve(res.data);
							} else {
								reject(res.data + "#ERRCODE#" + res.code + "#ERRMSG#" + res.msg);
							}
						}

					},
					error: res => {
						reject(res);
					}
				})
			})
		},

		http_post: function (url, path, params, body, header) {
			if (header == null) header = {};
            header["Content-Type"] = "application/json";
			for (let e in path) {
				url += ("/" + path[e])
			}
			url += '?';
			for (let e in params) {
				if (typeof (params[e]) == "object") {
					let t = params[e];
					for (let p in t) {
						url += (e + "=" + t[p] + "&");
					}
				} else {
					url += (e + "=" + params[e] + "&");
				}
			}
			return new Promise((resolve, reject) => {
				$.ajax({
					url: url,
					type: "POST",
					headers: header,
					data: JSON.stringify(body),
					success: res => {
						let code = res.code + "";
						if (typeof (res.code) == "undefined") {
							resolve(res);
						} else {
							if (code[0] == "2") {
								resolve(res.data);
							} else {
								reject(res.data + "#ERRCODE#" + res.code + "#ERRMSG#" + res.msg);
							}
						}
					},
					error: res => {
						reject(res);
					}
				})
			})
		},

		http_patch: function (url, path, params, body, header) {
			if (header == null) header = {};
            header["Content-Type"] = "application/json";
			for (let e in path) {
				url += ("/" + path[e])
			}
			url += '?';
			for (let e in params) {
				if (typeof (params[e]) == "object") {
					let t = params[e];
					for (let p in t) {
						url += (e + "=" + t[p] + "&");
					}
				} else {
					url += (e + "=" + params[e] + "&");
				}
			}
			return new Promise((resolve, reject) => {
				$.ajax({
					url: url,
					type: "PATCH",
					headers: header,
					data: JSON.stringify(body),
					success: res => {
						let code = res.code + "";
						if (typeof (res.code) == "undefined") {
							resolve(res);
						} else {
							if (code[0] == "2") {
								resolve(res.data);
							} else {
								reject(res.data + "#ERRCODE#" + res.code + "#ERRMSG#" + res.msg);
							}
						}
					},
					error: res => {
						reject(res);
					}
				})
			})
		},

		http_delete: function (url, path, params, body, header) {
			if (header == null) header = {};
            header["Content-Type"] = "application/json";
			for (let e in path) {
				url += ("/" + path[e])
			}
			url += '?';
			for (let e in params) {
				if (typeof (params[e]) == "object") {
					let t = params[e];
					for (let p in t) {
						url += (e + "=" + t[p] + "&");
					}
				} else {
					url += (e + "=" + params[e] + "&");
				}
			}
			return new Promise((resolve, reject) => {
				$.ajax({
					url: url,
					type: "DELETE",
					headers: header,
					data: JSON.stringify(body),
					success: res => {
						let code = res.code + "";
						if (typeof (res.code) == "undefined") {
							resolve(res);
						} else {
							if (code[0] == "2") {
								resolve(res.data);
							} else {
								reject(res.data + "#ERRCODE#" + res.code + "#ERRMSG#" + res.msg);
							}
						}
					},
					error: res => {
						reject(res);
					}
				})
			})
		},

		setCookie: function (name, value, days) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toUTCString();
			}
			document.cookie = name + "=" + (value || "") + expires + "; path=/";
		},

		getCookie: function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		},

		eraseCookie: function (name) {
			document.cookie = name + '=; Max-Age=-99999999;';
		}

	});
});