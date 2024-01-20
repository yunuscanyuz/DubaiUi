// var choicesOptions = {
//   placeholder: true,
//   noResultsText: "Bir kayıt bulunamadı",
//   noChoicesText: "Bir kayıt bulunamadı",
//   itemSelectText: "Bir kayıt seçiniz",
// };

// jQuery ile dropdownFill fonksiyonu
async function dropdownFill(controllerName, formName, optionName, displayName) {
  try {
    var url = "/Methods/GetByForDropDown";
    const postData = {
      "body": {
        "viewName": controllerName
      }
    }


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

      var restoreDataResponse = siralaJson(dataResponse, displayName);

      //  console.log("dataResponse:", restoreDataResponse);
      // var formName = "FormCity";
      let selecteElementName;
      if ( formName==="-1")
        selecteElementName = $("#" + optionName);
      else
       selecteElementName= $("#" + formName + " #" + optionName);
      //const isRequired = selecteElementName.data('required-element') !== undefined ? true : false;

      //$('#FormCity #CountryId');
      selecteElementName.empty();

      const defaultOption = $("<option>", {
        value: "-1",
        text: "Lütfen bir seçim yapınız",
      });
      selecteElementName.append(defaultOption);

      // if (isRequired) {
      //   const defaultOption = $("<option>", {
      //     value: null,
      //     text: "Yok",
      //   });
      //   selecteElementName.append(defaultOption);
      // }

      // $.each ile döngü
      $.each(restoreDataResponse, function (index, o) {
        const option = $("<option>", {
          value: o.id ?? o.Id,
          text: o[displayName] ?? o[kucukHarfeDonustur(displayName)],
        });
        selecteElementName.append(option);
      });

      // Eğer value değeri null olan option'u seç
//$("#" + formName + " #" + optionName + " option[value=null]").prop('selected', true);

    }
  } catch (error) {
    console.error("Veri alınamadı:", error);
  }
}

async function dropdownFillGetByID(controllerName, formName, optionName, displayName, pname, parameterValue) {
  try {
    var url = "/Methods/GetByForDropDown";
    const postData = {
      body: {
        viewName: controllerName,
        whereCause: {
          [pname]: parameterValue
        }
      }
    };

    console.log("Dropdown için gönderilen istek " + JSON.stringify(postData));
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

      var restoreDataResponse = siralaJson(dataResponse, displayName);

      //  console.log("dataResponse:", restoreDataResponse);
      // var formName = "FormCity";
      const selecteElementName = $("#" + formName + " #" + optionName);
      //$('#FormCity #CountryId');
      selecteElementName.empty();

      const defaultOption = $("<option>", {
        value: "-1",
        text: "Lütfen bir seçim yapınız",
      });
      selecteElementName.append(defaultOption);

      // $.each ile döngü
      $.each(restoreDataResponse, function (index, o) {
        const option = $("<option>", {
          value: o.id ?? o.Id,
          text: o[displayName] ?? o[kucukHarfeDonustur(displayName)],
        });
        selecteElementName.append(option);
      });
    }
  } catch (error) {
    console.error("Veri alınamadı:", error);
  }
}

async function relationDopdownFillGetByID(controllerName,methodNameValue, formName, optionName, displayName, parameterName, parameterValue) {
  try {
    var url = "/Methods/RelationGetByForDropDown?controllerName=" + controllerName + "&methodName=" + methodNameValue + "&parameterName=" + parameterName + "&parameterValue=" + parameterValue;
    //console.log("deneme sena :" + url);
    const response = await fetch(url);
   

    if (response.ok) {
      const dataResponse = await response.json();
      console.log("Başarılı:", dataResponse);

      var restoreDataResponse = siralaJson(dataResponse, displayName);

      //  console.log("dataResponse:", restoreDataResponse);
      // var formName = "FormCity";
      const selecteElementName = $("#" + formName + " #" + optionName);
      //$('#FormCity #CountryId');
      selecteElementName.empty();

      const defaultOption = $("<option>", {
        value: "-1",
        text: "Lütfen bir seçim yapınız",
      });
      selecteElementName.append(defaultOption);

      // $.each ile döngü
      $.each(restoreDataResponse, function (index, o) {
        const option = $("<option>", {
          value: o.id ?? o.Id,
          text: o[displayName] ?? o[kucukHarfeDonustur(displayName)],
        });
        selecteElementName.append(option);
      });
    }
  } catch (error) {
    console.error("Veri alınamadı:", error);
  }
}



async function dropdownFillGetByIDMultiColumn(
  controllerName,
  formName,
  optionName,
  displayName,
  methodName,
  parameterName,
  parameterValue,
  twoColumnddisplayNameMerge,
  oid
) {
  try {
    var url =
      "/Methods/GetByForDropDown?controllerName=" +
      controllerName +
      "&methodName=" +
      methodName +
      "&parameterName=" +
      parameterName +
      "&parameterValue=" +
      parameterValue;
    //console.log("deneme sena :" + url);
    const response = await fetch(url);
    const data = await response.json();

    const selecteElementName = $("#" + formName + " #" + optionName);
    var setdata = [];
    const defaultOption = $("<option>", {
      value: "-1",
      text: "Lütfen bir seçim yapınız",
    });
    selecteElementName.append(defaultOption);

    data.forEach((o) => {
      const option = $("<option>", {
        value: o.id ?? o.Id,
        text: o[displayName] ?? o[kucukHarfeDonustur(displayName)],
      });
      selecteElementName.append(option);
      // setdata.push({ value: o.Id ?? o.id, label: o[displayName] });
      //console.log("dropdownFillGetByID :" + controllerName + "&methodName=" + methodName + "&parameterName=" + parameterName + "&parameterValue=" + parameterValue);
    });
    console.log(JSON.stringify(setdata));
  } catch (error) {
    console.error("Veri alınamadı:", error);
  }
}




async function GetMethodDropdownFill(urlName =null,controllerName,methodName,parameterName =null, formName, optionName, displayName) {
  try {
    var url = `/Methods/GetMethodDropdownFill?controllerName=${controllerName}&methodName=${methodName}` ;
    urlName != null ? url += `&urlName=${urlName}` : null;  
    parameterName != null ? url += `&parameters=${parameterName}` : null;  
  

   
    const response = await fetch(url);

    if (response.ok) {
      const dataResponse = await response.json();
      console.log(`${controllerName} dropdown için gelen data `, dataResponse);
      var restoreDataResponse = dataResponse ;
 
      try {
         restoreDataResponse = siralaJson(dataResponse, displayName);

      } catch (error) {
      
      }
    //  var restoreDataResponse = siralaJson(dataResponse, displayName);

      //  console.log("dataResponse:", restoreDataResponse);
      // var formName = "FormCity";
      let selecteElementName;
      if ( formName==="-1")
        selecteElementName = $("#" + optionName);
      else
       selecteElementName= $("#" + formName + " #" + optionName);
      //const isRequired = selecteElementName.data('required-element') !== undefined ? true : false;

      //$('#FormCity #CountryId');
      selecteElementName.empty();

      const defaultOption = $("<option>", {
        value: "-1",
        text: "Lütfen bir seçim yapınız",
      });
      selecteElementName.append(defaultOption);

      // if (isRequired) {
      //   const defaultOption = $("<option>", {
      //     value: null,
      //     text: "Yok",
      //   });
      //   selecteElementName.append(defaultOption);
      // }

      // $.each ile döngü
      $.each(restoreDataResponse, function (index, o) {
        const option = $("<option>", {
          value: o.id ?? o.Id,
          text: o[displayName] ?? o[kucukHarfeDonustur(displayName)],
        });
        selecteElementName.append(option);
      });

      // Eğer value değeri null olan option'u seç
//$("#" + formName + " #" + optionName + " option[value=null]").prop('selected', true);

    }
  } catch (error) {
    console.error("Veri alınamadı:", error);
  }
}


