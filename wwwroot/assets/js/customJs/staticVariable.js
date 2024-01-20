$(document).ready(function () {
  agGrid.LicenseManager.setLicenseKey(
    "Using_this_{AG_Grid}_Enterprise_key_{AG-047650}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{END_COZUM_BILGISAYAR_YAZILIM_OTOMASYON_SISTEMLERI_TIC._LTD._STI.}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{END}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{END}_need_to_be_licensed___{END}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{9_November_2024}____[v3]_[01]_MTczMTExMDQwMDAwMA==276fd69477fabffa2c968b40daec49f2"
  );
});

var testUserId = "a073d740-8c21-42d9-beac-a4191a4b1fcd";

var eventt = new Event("change");

const SpecialCodeForType = {
  MachineType: { value: 1, display: "Makine Tipi" },
  Category: { value: 2, display: "Kategori" },
  Brand: { value: 3, display: "Marka" },
  Model: { value: 4, display: "Model" },
  Type: { value: 5, display: "Tip" },
  GroupCode: { value: 6, display: "Grup Kodu" },
  Unit: { value: 7, display: "Birim" },
  State: { value: 8, display: "Durum" },
  FileType: { value: 9, display: "Dosya Tipi" },
  CounterUnit: { value: 10, display: "Sayaç Birim" },
  CounterType: { value: 11, display: "Sayaç Tipi" },
  Action: { value: 12, display: "İşlem" },
  MachineCategory: { value: 13, display: "Makine Kategori" },
  OperatorType: { value: 14, display: "Operatör Tipi" },
  MachineState: { value: 15, display: "Makine Durumu" },
  DataType: { value: 16, display: "Veri Tipi" },
  OPCDataReadType: { value: 17, display: "OPC Veri Okuma Tipi" },
  MachineOPCDataType: { value: 18, display: "Makine OPC Veri Tipi" },
  ProductionStateType: { value: 19, display: "Production State Type" },
  LabelType: { value: 20, display: "Etiket Tipi" },
  Printer: { value: 21, display: "Yazıcı" },
  CallType: { value: 22, display: "Çağrı Tipi" },
  DataReadParameter: { value: 23, display: "Üretim Veri Toplama Parametresi" },
  Automaticlabeltype: { value: 24, display: "Otomatik Etiket Alma Tipi" },
  DocumentType: { value: 25, display: "Döküman Tipi" },
  ProductGroupID: { value: 26, display: "Ürün Kodu" },
  CostCenter: { value: 27, display: "Maliyet Merkezi" },
  InterruptionCauseGroupID: { value: 28, display: "Duruş Grupları" },
  DowntimeCauseGroupID: { value: 29, display: "Arıza Grupları" },
  WorkTypeID: { value: 30, display: "Arıza Çalışma Tip Grubu" },
};

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Ay, 0-11 arası değer alır
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formattedDateTime;
}
const currentDateTime = getCurrentDateTime();
console.log(currentDateTime); // Örnek çıktı: "2023-08-07 15:30"

const ActionTypes = {
  Update: "Güncelle",
  Delete: "Sil",
  Insert: "Kaydet",
};

const AlertTypes = {
  Success: "Success",
  Error: "Error",
  Information: "Information",
};
const databaseColumnType = [
  "boolean",
  "text",
  "timestamp without time zone",
  "character varying",
  "uuid",
];

function fetchGetByIdURL(ControllerName) {
  console.log(
    "/Methods/GetByID?ControllerName=" +
    ControllerName +
    "&Id=" +
    $("#form" + ControllerName + " #id").val()
  );
  return (
    "/Methods/GetByID?ControllerName=" +
    ControllerName +
    "&Id=" +
    $("#form" + ControllerName + " #id").val()
  );
}

function fetchGetByIdURLManuelId(ControllerName, parameter) {
  console.log(
    " fetchGetByIdURLManuelId : /Methods/GetByID?ControllerName=" +
    ControllerName +
    "&Id=" +
    parameter
  );
  return (
    "/Methods/GetByID?ControllerName=" + ControllerName + "&Id=" + parameter
  );
}

function kucukHarfeDonustur(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
function buyukarfeDonustur(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function convertJsonToLowercase(jsonData) {
  var convertedData = {};

  for (var key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      var lowercasedKey = key.charAt(0).toLowerCase() + key.slice(1);
      convertedData[lowercasedKey] = jsonData[key];
    }
  }

  return convertedData;
}

function removePluralSuffix(word) {
  return pluralize.singular(word);
}
function addPluralSuffix(word) {
  return pluralize.plural(word);
}

function modalReset(modalSelector) {
  // Tüm input alanlarını temizle
  //console.log("modalReset Tetiklendi");

  // console.log("modalReset inputları seçti");
  var controllerName = modalSelector.replace(/modal|Modal/, "");

  console.log(
    "modal reset " +
    modalSelector +
    " controllerName: " +
    controllerName +
    " submit button: " +
    "#submit" +
    controllerName
  );
  var mSelector = $("#" + modalSelector);
  const inputElements = mSelector.find("input");
  //console.log("modalReset inputları seçti");
  inputElements.each(function () {
    const input = $(this);
    input.val("");
    if (input.attr("type") === "checkbox") {
      input.prop("checked", false);
    }
  });
  mSelector.find("select").empty();
  const submitCountry = mSelector.find("#submit" + controllerName);
  mSelector.find("#id").val(null);
  if (submitCountry) {
    submitCountry.text("Kaydet");
  }
}

function showSweetAlert(title, text, icon) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,

    confirmButtonText: "Tamam",
  }).then((result) => {
    //document.getElementById('name').value = '';
    //if (result.isConfirmed) {
    //    Swal.fire('İşlem Başarılı!', '', 'success')
    //   }
  });
}

function messageNotification(title, message, alertType) {
  var toastElement = document.getElementById("infoToast2");
  // Set title and message
  document.querySelector(".toast-header span.font-weight-bold ").textContent =
    title;
  document.querySelector(".toast-body").textContent = message;
  // Remove all classes and then add the appropriate one
  toastElement.classList.remove(
    "bg-gradient-info",
    "bg-gradient-success",
    "bg-gradient-danger"
  );

  if (alertType === AlertTypes.Success) {
    toastElement.classList.add("bg-gradient-success");
  } else if (alertType === AlertTypes.Error) {
    toastElement.classList.add("bg-gradient-danger");
  } else {
    toastElement.classList.add("bg-gradient-info");
  }

  var ts3 = bootstrap.Toast.getInstance(toastElement);
  ts3.show();
}

function ModalOpenMethods(modalName, update, create, defaultjs) {
  var jsCode = ` 
    $("#modal${modalName}").on('shown.bs.modal', async function (e) {
      //alert("açıldı");
   await   window['${defaultjs}']();
      submit${modalName} = $('#submit${modalName}');
  
      if (submit${modalName}.text() === ActionTypes.Update) {
        try {

          console.log("${modalName} : " + $('#form${modalName} #id').val());
  
          const response = await fetch(fetchGetByIdURL("${modalName}"));
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
  
          console.log(' ${modalName} için gelen Veri:', data);
          var newsData = convertJsonToLowercase(data);
  
          var inputElements = $('#form${modalName} input');
  
          inputElements.each(function () {
            var inputElementId = $(this).attr('id');
            var inputElementType = $(this).attr('type');
            if (inputElementId && !inputElementId.endsWith("Id")) {

              for (var key in newsData) {
               // console.log( 'donusen key ' +kucukHarfeDonustur(key));
                if (newsData.hasOwnProperty(key) && key === (inputElementId)) {
                    if (inputElementType === 'date') {
                        $(this).val(formatShortDate(newsData[key]));
                      } 
                      else if (inputElementType === 'checkbox') {
                        console.log("22" +newsData[key]);
                        $(this).prop('checked', newsData[key]);
                    //    $(this).val(newsData[key]);
                      }
                       else {
                        $(this).val(newsData[key]);
                      }
                 // $(this).val(newsData[key]);
                  delete newsData[key];
                     break;
                }
              }
            }
            //console.log(inputElementId);
          });
  

  
  
          
  
         
         
         await   window['${update}'](newsData);
       
        } catch (error) {
          console.error('Hata:', error);
        }
      }
      else {
        window['${create}']();
     
      
      }
    //  window['${defaultjs}']();
     
    
    });`;
  var scriptElement2 = document.createElement("script");
  scriptElement2.innerHTML = jsCode;
  document.body.appendChild(scriptElement2);
}

function siralaJson(json, parametre) {
  // console.log("siralaJson " +JSON.stringify(json));
  return json.sort((a, b) => {
    const paramA = a[parametre] || a[kucukHarfeDonustur(parametre)];
    const paramB = b[parametre] || b[kucukHarfeDonustur(parametre)];
    return paramA.localeCompare(paramB);
  });
}

function validateForm(formId) {
  // Form elemanını seç
  var form = document.getElementById(formId);

  // Form elemanındaki tüm inputları seç
  var inputs = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );

  // Geçerli mi kontrol etmek için bir bayrak tanımla
  var isValid = true;

  // Tüm required inputları kontrol et
  inputs.forEach(function (input) {
    // Inputun değerini kontrol et
    if (!input.value.trim()) {
      // Eğer değer boşsa, geçersiz bayrağını false yap
      isValid = false;
      messageNotification(
        "Hata",
        "Lütfen bütün alanları doldurunuz !",
        AlertTypes.Error
      );
      // Opsiyonel olarak hata işlemleri yapabilirsin, örneğin:
      // alert('Lütfen tüm zorunlu alanları doldurunuz.');
    }
  });
  console.log("submit degeri :" + isValid);
  // Geçerliliği döndür
  return isValid;
}

function formatShortDate(inputDate) {
  return inputDate.split("T")[0];
}

function capitalizeWords(sentence) {
  // Cümleyi boşluklara göre böler
  const words = sentence.split(" ");

  // Her kelimenin ilk harfini büyük yap
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Büyük harf yapılmış kelimeleri birleştir ve cümleyi oluştur
  const result = capitalizedWords.join(" ");

  return result;
}

async function POSTFetchMethodsRequest(controllerName, params, pageSize, pageNumber) {
  try {
    var url = "/Methods/GetByViewWhere";
    const postData = {
      body: {
        viewName: "vw_" + controllerName + "_Tr",
      },
    };

    if (params) {
      postData.body.whereCause = params;
    }
    if (pageSize) {
      postData.body.pageSize = pageSize;
    }
    if (pageNumber) {
      postData.body.pageNumber = pageNumber;
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Diğer isteğe özel başlıkları buraya ekleyebilirsiniz.
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const dataResponse = await response.json();
      console.log("Başarılı:", dataResponse);
      return dataResponse;
    }
  } catch (error) {
    console.error("Veri alınamadı:", error);
  }

  //POSTFetchMethodsRequest("controllerName", { pname1: value1, pname2: value2 });
}

// Veriyi cookie'ye kaydetme
function setCookie(cookieName, cookieValue, expirationDays) {
  var d = new Date();
  d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// Veriyi cookie'den okuma
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

// Örnek kullanım
// var myData = "Merhaba, dünya!";
// setCookie("myCookie", myData, 7); // 7 gün süreyle geçerli bir cookie oluşturuldu

var retrievedData = getCookie("myCookie");
console.log("Cookie'den alınan veri:", retrievedData);




async function DynamicGetMethod(urlName, controllerName, methodName, parameterName = null) {
  var url = `/Methods/DynamicGetMethod?controllerName=${controllerName}&methodName=${methodName}`;
  urlName != null ? url += `&urlName=${urlName}` : null;
  parameterName != null ? url += `&parameters=${parameterName}` : null;
  const response = await fetch(url);
  if (response.ok) {
    const dataResponse = await response.json();
    console.log("DynamicGetMethod", dataResponse);
    return dataResponse;
  }
  else {
    return null;
  }

}