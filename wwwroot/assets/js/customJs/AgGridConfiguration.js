async function initializeGrid(GetMethodName, params,pageSize=300,pageNumber=1) {
  var code = `
  var gridOptions${GetMethodName} ;
  var gridOptions${GetMethodName}Api ;
        $(document).ready(async function () {
            await getData${GetMethodName}();
        });

        async function getData${GetMethodName}() {
         
            gridOptions${GetMethodName} = await createGridOptions('${GetMethodName}',${JSON.stringify(params)},${pageSize},${pageNumber});

            if (gridOptions${GetMethodName}) {
                console.log("bitti");
                var gridDiv = document.querySelector('#Grid${GetMethodName}');
                $('#Grid${GetMethodName}').empty();
                gridOptions${GetMethodName}Api = agGrid.createGrid(gridDiv, gridOptions${GetMethodName});
                gridOptions${GetMethodName}Api.closeToolPanel();
            
                customAutoSizeAll(gridOptions${GetMethodName}Api, false);
                gridLayoutGet(gridOptions${GetMethodName}Api, 'Grid${GetMethodName}', getCookie("testUserId"));

            }
        }


    `;

  //  eval(code);
  var scriptElement = document.createElement("script");
  scriptElement.innerHTML = code;
  document.body.appendChild(scriptElement);
}

async function initializeGridCustomUrl(GetMethodName, params,pageSize=300,pageNumber=1,customData) {
  var code = `
  var gridOptions${GetMethodName} ;
  var gridOptions${GetMethodName}Api ;
        $(document).ready(async function () {
            await getData${GetMethodName}();
        });

        async function getData${GetMethodName}() {
         
            gridOptions${GetMethodName} = await createGridOptions('${GetMethodName}',${JSON.stringify(params)},${pageSize},${pageNumber},true, ${customData} );

            if (gridOptions${GetMethodName}) {
                console.log("bitti");
                var gridDiv = document.querySelector('#Grid${GetMethodName}');
                $('#Grid${GetMethodName}').empty();
                gridOptions${GetMethodName}Api = agGrid.createGrid(gridDiv, gridOptions${GetMethodName});
                gridOptions${GetMethodName}Api.closeToolPanel();
            
                customAutoSizeAll(gridOptions${GetMethodName}Api, false);
                gridLayoutGet(gridOptions${GetMethodName}Api, 'Grid${GetMethodName}', getCookie("testUserId"));

            }
        }


    `;

  //  eval(code);
  var scriptElement = document.createElement("script");
  scriptElement.innerHTML = code;
  document.body.appendChild(scriptElement);
}

async function fetchDataAndColumn(controllerName, params,pageSize,pageNumber,isCustom=false,customData=null) {
  try {
    let data ;
     isCustom===false ?  data = await POSTFetchMethodsRequest(controllerName, params,pageSize,pageNumber) :  data = customData;
    
    //const data = await response.json();
    console.log("gelendata" + data);
    const columnNames = Object.keys(data[0]);
    const columnDefs = columnNames.map((columnName) => {
      if (columnName === "date") {
        return {
          field: columnName,
          rowGroup: true,
          rowDrag: false,
          cellRenderer: function (params) {
            var date = new Date(params.value);
            var formattedDate = date.toLocaleDateString();
            return formattedDate;
          },
        };
      } else if (
        columnName === "Id" ||
        columnName === "id" ||
        columnName.slice(-2) == "Id" ||
        columnName.slice(-2) == "ID"
      ) {
        return {
          field: columnName,
          hide: true,
        };
      } else {
        return {
          field: columnName,
          rowDrag: false,
          enableRowGroup: true,
        };
      }
    });

    return { data, columnDefs, controllerName };
  } catch (error) {
    console.error("Veri alımında hata oluştu:", error);
    return null;
  }
}

async function createGridOptions(apiUrl, params,pageSize,pageNumber,isCustom=false,customData=null) {
  try {
    let result ;
     isCustom === false ?  result =await fetchDataAndColumn(apiUrl, params,pageSize,pageNumber) :  result = await fetchDataAndColumn(apiUrl, params,pageSize,pageNumber,true,customData) ;
    if (result) {
      console.log("Columns:", result.columnDefs);
      console.log("Data:", result.data);
      console.log("Data:", result.tableName);
      var goptions = {
        columnDefs: result.columnDefs,
        rowData: result.data,
        groupSelectsChildren: true,
        rowHeight: 22,
        suppressDragLeaveHidesColumn: true,
        suppressMakeColumnVisibleAfterUnGroup: true,
        paginationPageSize: 30,
        sideBar: true,
        closeToolPanel: function () {
          this.api.closeToolPanel();
        },
        enableRangeSelection: true,
        getContextMenuItems: function (params) {
          return getContextMenuItems(params, result.tableName);
        },
        defaultColDef: {
          sortable: true,
          filter: false,
          suppressAutoSize: true,
          resizable: true,
        },
        localeText: AG_GRID_LOCALE_TR,
        rowSelection: "multiple",
        animateRows: true,
        //    onSelectionChanged: onSelectectionChangeFunction
      };
      return goptions;
    }
  } catch (error) {
    console.error("Veri alımında hata oluştu:", error);
    return null;
  }
}

function onFilterTextBoxChanged(gridOptionName, filterElement) {
  //gridOptionsCountry

  gridOptionName.setGridOption(
    "quickFilterText",
    document.getElementById(filterElement.id).value
  );

  // gridOptionName.api.setQuickFilter(
  //   document.getElementById(filterElement.id).value
  // );
}

function agGridSelectedrow(
  gridoptionsName,
  tableName,
  crudType,
  localizationTableName
) {
  var selectedNodes = gridoptionsName.getSelectedRows();
  if (selectedNodes.length == 1) {
    if (crudType == ActionTypes.Delete) {
      Swal.fire({
        title: "Silmek istediğinize emin misiniz?",
        text: "Lütfen silmek işlemini gerçekleştirmek istediğiniz kaydı seçiniz.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Evet, Sil",
        cancelButtonText: "Vazgeç",
      }).then((result) => {
        if (result.isConfirmed) {
          var gid = selectedNodes[0].id || selectedNodes[0].Id;

          console.log("agGridSelectedrow : " + gid);
          var inputID = $("#form" + tableName + " #id").val(gid);

          // console.log("agGridSelectedrow : " + gid);
          callDeleteMethod(tableName, gid);
          return gid;
        }
      });
    } else if (crudType == ActionTypes.Update) {
      var gid = selectedNodes[0].id ?? selectedNodes[0].Id;
      console.log("update agGridSelectedRow 0" + gid);
      // var inputID = document.getElementById(tableName + 'ID');
      var inputID = $("#form" + tableName + " #id").val(gid);
      console.log(`modal input id ${inputID}`);
      var submitCountry = $("#submit" + tableName); // document.getElementById('#form' + tableName + 'submit' + tableName);
      submitCountry.text("Güncelle");
      $("#modal" + tableName).modal("show");
      //  inputID.value = gid;
    }
  } else if (selectedNodes.length > 1) {
    showSweetAlertHTML(
      localizationTableName,
      "Lütfen düzenlemeye yapmak istediğiniz <b> 1 </b> kayıt seçili iken işlem yapınız ! ",
      "error"
    );
    return "";
  } else {
    showSweetAlert(
      localizationTableName,
      "Lütfen işlem yapmak istediğiniz  kayıdı seçiniz!",
      "error"
    );
    return "";
  }
}

function getContextMenuItems(params, tableName) {
  var result = [
    "copy",
    "separator",
    "chartRange",
    "export",
    {
      name: "Sil", // "Delete" yerine "Sil" olarak değiştirdik
      action: function () {
        console.log("ag grid üzerinden sil tiklandi");
        agGridSelectedrow(params, tableName, "Sil", "Organizasyon");
      },
      icon: '<i class="far fa-trash-alt"></i>',
    },
    {
      name: "Düzenle", // "Edit" yerine "Düzenle" olarak değiştirdik
      action: function () {
        console.log("Düzenle tıklandi");
        // Burada silme işlemlerini gerçekleştirin
        var selectedNodes = params.api.getSelectedNodes();
        if (selectedNodes.length > 1) {
          Swal.fire(
            "Düzenlemek mi istiyorsunuz?",
            "Lütfen düzenlemeye yapmak istediğiniz <b> 1 </b> kayıt seçili iken işlem yapınız ! ",
            "warning"
          );
        } else if (selectedNodes.length > 0) {
          agGridSelectedrow(params, tableName, ActionTypes.Update, "Country");
          // açılan modal idleri modalCountry , modalCity şeklinde olacak.
        }
      },

      icon: '<i class="far fa-edit"></i>', // İkon eklemek için font-awesome kullanabilirsiniz
    },
  ];

  return result;
}

function customSizeToFit(gridOptionName) {
  gridOptionName.sizeColumnsToFit();
}

function customAutoSizeAll(gridOptionName, skipHeader) {
  const allColumnIds = [];
  gridOptionName.getColumns().forEach((column) => {
    allColumnIds.push(column.getId());
  });

  gridOptionName.autoSizeColumns(allColumnIds, skipHeader);
}

function gridExportExcel(gridOptionName) {
  gridOptionName.exportDataAsExcel();
}


async function gridLayoutSave(gridoptionsName, gridName, userId) {
  try {

    var layoutSave = gridoptionsName.getColumnState();
    var layoutSaveColumnDefs = gridoptionsName.getColumnDefs();
    const jsonString = JSON.stringify(layoutSave);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, 'yourSecretKey').toString();
    var url = "/Methods/GridLayoutSave";
    const postData = {
      ControllerName : "GridDesigners",
      body: {
        userID: userId,
        name: gridName,
        jsonText: layoutSave,
        columnDefs : layoutSaveColumnDefs
      }
    };

    

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // Diğer isteğe özel başlıkları buraya ekleyebilirsiniz.
      },
      body: JSON.stringify(postData)
    });

    if (response.ok) {
      const dataResponse = await response.json();
      console.log("Başarılı:", dataResponse);
      return dataResponse;
    }
  } catch (error) {
    console.error("Veri alınamadı:", error);
  }
}




function gridLayoutGet(gridoptionsName, gridName, userId) {
  
  var url = "/Methods/GridLayoutGet?UserID=" + userId + "&Name=" + gridName;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
      // Diğer isteğe özel başlıkları buraya ekleyebilirsiniz.
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("HTTP Hatası: " + response.status);
      }
    })
    .then((dataResponse) => {
      var convertJsonColumnState = JSON.parse(dataResponse.jsonText);
      var convertJsonColumnDefs = JSON.parse(dataResponse.columnDefs);
    //  console.log(Array.isArray(convertJson));
      console.log("Ag Grid Kayıtlı data :", dataResponse);
      gridoptionsName.applyColumnState({ state: convertJsonColumnState ,applyOrder:true});
      //gridoptionsName.applyColumnDefs({ columnDefs: convertJsonColumnDefs} );
      return dataResponse;
    })
    .catch((error) => {
      console.error("Veri alınamadı Ag Grid layout Get:", error);
    });
}
