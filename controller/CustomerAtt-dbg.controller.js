var zvatcontent = " ";
var zvatfiletype =  " ";
var zvatfilename = " "; 
var Zcr_content = " ";
var Zcr_type = " ";
var Zcr = " ";
var Zid_content = " ";
var Zid_type = " ";
var Zid = " ";
var Zsl_content = " ";
var Zsl_type = " ";
var Zsl = " ";
var zcustomerid = " ";
var zorderid = " ";
sap.ui.define([
"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	'sap/m/MessagePopover',
	'sap/m/MessageBox',
	'sap/m/MessagePopoverItem',
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function (Controller, Fragment, Filter, MessagePopover, MessageBox, MessagePopoverItem, FilterOperator, MessageToast) {
	"use strict";

	return Controller.extend("mosque.zsd1.controller.CustomerAtt", {
		onInit: function () {

		},
		handleLiveChange: function(oEvent) {
					var oTextArea = oEvent.getSource(),
							iValueLength = oTextArea.getValue().length,
							iMaxLength = oTextArea.getMaxLength(),
							sState = iValueLength > iMaxLength ? "Warning" : "None";

					oTextArea.setValueState(sState);
				},
		onSubmit : function () {
			zorderid = this.getView().byId("idTemp").getValue();
			var that = this;
			var oModel = that.getOwnerComponent().getModel();
			sap.m.MessageToast.show("PLEASE WAIT WHILE THE DATA LOADS");
			var sPath = "/attachmentsSet('" + zorderid + "')";
			oModel.read(sPath, {
			success: function (oData, response) { 
				debugger;
				var oModel3 = new sap.ui.model.json.JSONModel(oData);
				var osf = that.getView().byId("idCustomerDetails");
				osf.setModel(oModel3);
				
				//attatchments start
					if (oModel3.oData.zimage1_content !== "") {
						that.zvatcontent = oModel3.oData.zimage1_content;
						zvatcontent = oModel3.oData.zimage1_content;
						that.zvatfiletype = oModel3.oData.zimage_type;
						 zvatfiletype = oModel3.oData.zimage_type;
						zvatfilename = oModel3.oData.zimage1_content;
						that.getView().byId("idImage1Btn").setText(oModel3.oData.zimage1_content);
						that.getView().byId("idImage1Btn").setType("Accept");
						
					} else  {
						that.getView().byId("idImage1Btn").setVisible(true);
						that.getView().byId("idImage1Btn").setText("NO FILE UPLOADED");
						that.getView().byId("idImage1Btn").setType("Reject");
					}	
					
					
					if (oModel3.oData.zimage2_content !== "") {
						that.Zcr_content = oModel3.oData.zimage2_content;
						Zcr_content = oModel3.oData.zimage2_content;
						that.Zcr_type = oModel3.oData.zimage2_type;
						 Zcr_type = oModel3.oData.zimage2_type;
						Zcr = oModel3.oData.zimage2_content;
						that.getView().byId("idImage2Btn").setType("Accept");
						that.getView().byId("idImage2Btn").setText(oModel3.oData.zimage2_content);
						
					} else  {
						that.getView().byId("idImage2Btn").setVisible(true);
						that.getView().byId("idImage2Btn").setText("NO FILE UPLOADED");
						that.getView().byId("idImage2Btn").setType("Reject");
					}	
					
					if (oModel3.oData.zimage3_content !== "") {
						that.Zid_content = oModel3.oData.zimage3_content;
						Zid_content = oModel3.oData.zimage3_content;
						that.Zid_type = oModel3.oData.zimage3_type;
						 Zid_type = oModel3.oData.zimage3_content;
						Zid = oModel3.oData.zimage3_content;
						that.getView().byId("idImage3Btn").setType("Accept");
						that.getView().byId("idImage3Btn").setText(oModel3.oData.zimage3_content);
						
					} else  {
						that.getView().byId("idImage3Btn").setVisible(true);
						that.getView().byId("idImage3Btn").setText("NO FILE UPLOADED");
						that.getView().byId("idImage3Btn").setType("Reject");
					}	
					
					if (oModel3.oData.zimage4_content !== "") {
						that.Zsl_content = oModel3.oData.zimage4_content;
						Zsl_content = oModel3.oData.zimage4_content;
						that.Zsl_type = oModel3.oData.zimage4_type;
						 Zsl_type = oModel3.oData.zimage4_type;
						Zsl = oModel3.oData.zimage4_content;
						that.getView().byId("idImage4Btn").setType("Accept");
						that.getView().byId("idImage4Btn").setText(oModel3.oData.zimage4_content);
						
					} else  {
						that.getView().byId("idImage4Btn").setVisible(true);
						that.getView().byId("idImage4Btn").setText("NO FILE UPLOADED");
						that.getView().byId("idImage4Btn").setType("Reject");
					}	
				
				//attachments end
				
			},
			error : function (oData, response) { 
				sap.m.MessageToast.show("No Data retreived");
			}
			});
		},
		
		//open customer CR  file
		openImage1File: function (oEvent) {

			debugger;

			var Zftype = '1';

			var vbeln = this.getView().byId("idTemp").getValue();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/attachmentsContentSet(vbeln=" + "'" + vbeln + "'" + ",Ztype=" + "'" + Zftype + "'" + ")"; // sap.ui.model.FilterOperator.EQ, Ztempid )";
				sap.m.MessageToast.show("PLEASE WAIT WHILE THE FILE OPENS");
				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = 'image/jpeg'; //oData.Filetype;
						var fName = 'test.jpg'; //oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("mosque.zsd1.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						//var splitTest = fType.split("/");
						var mimType = 'image'; //splitTest[0];
						//var fType = 'JPEG'; //fName.split(".");
						var fileType = 'jpg'; //fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}
						debugger;
						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},
		//open customer CR  file
		openImage2File: function (oEvent) {

			debugger;

			var Zftype = '2';

			var vbeln = this.getView().byId("idTemp").getValue();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/attachmentsContentSet(vbeln=" + "'" + vbeln + "'" + ",Ztype=" + "'" + Zftype + "'" + ")"; // sap.ui.model.FilterOperator.EQ, Ztempid )";
				sap.m.MessageToast.show("PLEASE WAIT WHILE THE FILE OPENS");
				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = 'image/jpeg'; //oData.Filetype;
						var fName = 'test.jpg'; //oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("mosque.zsd1.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						//var splitTest = fType.split("/");
						var mimType = 'image'; //splitTest[0];
						//var fType = 'JPEG'; //fName.split(".");
						var fileType = 'jpg'; //fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}
						debugger;
						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},	
		
		openImage4File: function (oEvent) {

			debugger;

			var Zftype = '4';

			var vbeln = this.getView().byId("idTemp").getValue();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/attachmentsContentSet(vbeln=" + "'" + vbeln + "'" + ",Ztype=" + "'" + Zftype + "'" + ")"; // sap.ui.model.FilterOperator.EQ, Ztempid )";
				sap.m.MessageToast.show("PLEASE WAIT WHILE THE FILE OPENS");
				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = 'image/jpeg'; //oData.Filetype;
						var fName = 'test.jpg'; //oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("mosque.zsd1.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						//var splitTest = fType.split("/");
						var mimType = 'image'; //splitTest[0];
						//var fType = 'JPEG'; //fName.split(".");
						var fileType = 'jpg'; //fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}
						debugger;
						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},
			//open customer ID  file
		openImage3File: function (oEvent) {

			debugger;

			var Zftype = '3';

			var vbeln = this.getView().byId("idTemp").getValue();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/attachmentsContentSet(vbeln=" + "'" + vbeln + "'" + ",Ztype=" + "'" + Zftype + "'" + ")"; // sap.ui.model.FilterOperator.EQ, Ztempid )";
				sap.m.MessageToast.show("PLEASE WAIT WHILE THE FILE OPENS");
				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = 'image/jpeg'; //oData.Filetype;
						var fName = 'test.jpg'; //oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("mosque.zsd1.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						//var splitTest = fType.split("/");
						var mimType = 'image'; //splitTest[0];
						//var fType = 'JPEG'; //fName.split(".");
						var fileType = 'jpg'; //fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}
						debugger;
						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},
		
		//open customer ID  file
		openLicenseFile: function (oEvent) {

			debugger;

			var Zftype = 'LICENSE';

			var Ztempid = this.getView().byId("idTemp").getValue();

			if (Zftype !== "") {
				//call SAP and get file data
				var that = this;
				var oModel = that.getOwnerComponent().getModel();
				var sPath = "/attachmentsContentSet(Ztempid=" + "'" + Ztempid + "'" + ",Ztype=" + "'" + Zftype + "'" + ")"; // sap.ui.model.FilterOperator.EQ, Ztempid )";
				sap.m.MessageToast.show("PLEASE WAIT WHILE THE FILE OPENS");
				oModel.read(sPath, {
					success: function (oData, response) {
						//var oModel3 = new sap.ui.model.json.JSONModel(oData);
						var fMres = oData.Content;
						var fType = 'image/jpeg'; //oData.Filetype;
						var fName = 'test.jpg'; //oData.Filename;

						fMres = "data:" + fType + ";base64," + fMres;

						if (!that.displayContent) {
							that.displayContent = sap.ui.xmlfragment("customeratt.zsd1.fragments.filepreview", that);
							that.getView().addDependent(that.displayContent);
						}

						//var splitTest = fType.split("/");
						var mimType = 'image'; //splitTest[0];
						//var fType = 'JPEG'; //fName.split(".");
						var fileType = 'jpg'; //fType[1];

						switch (mimType) {
						case 'image':
							sap.ui.getCore().byId("idPdfViewer").setVisible(false);
							sap.ui.getCore().byId("image").setVisible(true);
							sap.ui.getCore().byId("image").setSrc(fMres);
							break;
						default:
							sap.ui.getCore().byId("idPdfViewer").setVisible(true);
							sap.ui.getCore().byId("image").setVisible(false);
							var html = sap.ui.getCore().byId("idPdfViewer");
							html.setContent('<iframe src="' + fMres +
								'" embedded="true" frameborder="0" target="_top" width="2000px" height="2000px"></iframe>');
							break;
						}
						debugger;
						if (fileType !== "docx" && fileType !== "pub" && fileType !== "xls" && fileType !== "ppt" && fileType !== "doc" && fileType !==
							"xlsx") {
							that.displayContent.open();
							that.fragOpen = true;
						}
						if (that.fragOpen === undefined) {
							window.open(fMres, "_self");
							fMres = fMres.replace("data:APPLICATION/WWI;base64,", "");
						}

						//	this.displayContent.open();

					},
					error: function () {

						sap.m.MessageToast.show("No Data retreived");
					}

				});
			}

		},
		onPressBarCloseBtn: function (oEvent) {
			this.displayContent.close();
			this.fragOpen = undefined;
		},
		verifiedVATFile : function (oEvent) {
			debugger;
			var status = oEvent.oSource.getText();
			var that = this;
			debugger;
			var oModel = that.getOwnerComponent().getModel();
			var Ztempid = this.getView().byId("idTemp").getValue();
				if (Ztempid !== "") {
					
					switch(status) {
				  case 'Reject':
				    status = 'R';
				    break;
				  case 'Approve':
				  	status = 'A';
				    // code block
				    break;
				  default:
				    // code block
				}
					
					var entry = {
						Zcustomer: Ztempid,
						Zstatus: status,
						ZdocumentType: "VAT"
					};
					
					//create entry
					oModel.create("/statusSet",
							entry, {
								success: function (data) {
									sap.m.MessageToast.show("Data Successfully updated!");
								},
								error: function (data) {
									sap.m.MessageToast.show("Data updation failed!");
								}
								
								
							}); //entry end
					

					}
				},
				
		verifiedCRFile : function (oEvent) {
			debugger;
			var status = oEvent.oSource.getText();
			var that = this;
			debugger;
			var oModel = that.getOwnerComponent().getModel();
			var Ztempid = this.getView().byId("idTemp").getValue();
				if (Ztempid !== "") {
					
					switch(status) {
				  case 'Reject':
				    status = 'R';
				    break;
				  case 'Approve':
				  	status = 'A';
				    // code block
				    break;
				  default:
				    // code block
				}
					
					var entry = {
						Zcustomer: Ztempid,
						Zstatus: status,
						ZdocumentType: "CR"
					};
					
					//create entry
					oModel.create("/statusSet",
							entry, {
								success: function (data) {
									sap.m.MessageToast.show("Data Successfully updated!");
								},
								error: function (data) {
									sap.m.MessageToast.show("Data updation failed!");
								}
								
								
							}); //entry end
					

					}
				},
				
		verifiedIDFile : function (oEvent) {
			debugger;
			var status = oEvent.oSource.getText();
			var that = this;
			debugger;
			var oModel = that.getOwnerComponent().getModel();
			var Ztempid = this.getView().byId("idTemp").getValue();
				if (Ztempid !== "") {
					
					switch(status) {
				  case 'Reject':
				    status = 'R';
				    break;
				  case 'Approve':
				  	status = 'A';
				    // code block
				    break;
				  default:
				    // code block
				}
					
					var entry = {
						Zcustomer: Ztempid,
						Zstatus: status,
						ZdocumentType: "ID"
					};
					
					//create entry
					oModel.create("/statusSet",
							entry, {
								success: function (data) {
									sap.m.MessageToast.show("Data Successfully updated!");
								},
								error: function (data) {
									sap.m.MessageToast.show("Data updation failed!");
								}
								
								
							}); //entry end
					

					}
				},
				
		verifiedSlFile : function (oEvent) {
			debugger;
			var status = oEvent.oSource.getText();
			var that = this;
			debugger;
			var oModel = that.getOwnerComponent().getModel();
			var Ztempid = this.getView().byId("idTemp").getValue();
				if (Ztempid !== "") {
					
					switch(status) {
				  case 'Reject':
				    status = 'R';
				    break;
				  case 'Approve':
				  	status = 'A';
				    // code block
				    break;
				  default:
				    // code block
				}
					
					var entry = {
						Zcustomer: Ztempid,
						Zstatus: status,
						ZdocumentType: "LICENSE"
					};
					
					//create entry
					oModel.create("/statusSet",
							entry, {
								success: function (data) {
									sap.m.MessageToast.show("Data Successfully updated!");
								},
								error: function (data) {
									sap.m.MessageToast.show("Data updation failed!");
								}
								
								
							}); //entry end
					

					}
				},
				
			onSaveComments : function (oEvent) {
			debugger;
			var status = oEvent.oSource.getText();
			var that = this;
			debugger;
			var oModel = that.getOwnerComponent().getModel();
			var Ztempid = this.getView().byId("idTemp").getValue();
			var comments = this.getView().byId("idTextArea").getValue();
				if (Ztempid !== "") {
					
					
					var entry = {
						Zcustomer: Ztempid,
						Zstatus: 'C',
						Zcomments : comments,
						ZdocumentType: "OTHERS"
					};
					
					//create entry
					oModel.create("/statusSet",
							entry, {
								success: function (data) {
									sap.m.MessageToast.show("Comments Successfully updated!");
								},
								error: function (data) {
									sap.m.MessageToast.show("Comments updation failed!");
								}
								
								
							}); //entry end
					

					}
				}	
				
		

	});
});