async function callInsertMethod(controllerName, body) {
  const apiUrl = "/Methods/Insert";

  const data = {
    ControllerName: controllerName,
    body: body,
  };

  console.log(`insert için gönderilen data ${JSON.stringify(data)}`);
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Dönen Veri:", data);
      console.log("getData" + controllerName);
      //window["getData" + controllerName]();

      if (window.hasOwnProperty("getData" + controllerName)) {
        window["getData" + controllerName]();
      }

      messageNotification(
        "Bilgilendirme",
        data.message.toLowerCase().includes("başarılı")
          ? "Kayıt Başarılı Bir şekilde Eklendi"
          : "Bir hata oluştu",
        data.message.toLowerCase().includes("başarılı")
          ? AlertTypes.Success
          : AlertTypes.Error
      );
      try {
        closeModal("modal" + controllerName);
      } catch (error) {
      }
      // Swal.fire({
      //     title: "Bilgilendirme",
      //     text: data.taskMessage,
      //     icon: data.taskMessage.includes("Başarılı") ? "success" : "error",
      //     confirmButtonText: 'Tamam'

      // }).then((result) => {
      //     if (result.isConfirmed) {
      //         closeModal('modal' + controllerName);
      //     }
      // });
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
}

async function callUpdateMethod(controllerName, body) {
  const apiUrl = "/Methods/Update";

  // Göndermek istediğiniz veriyi hazırlayın
  const data = {
    ControllerName: controllerName,
    body: body,
    // Diğer alanları buraya ekleyin...
  };

  // AJAX isteği gönderelim
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // C# methodunun döndürdüğü veriyi burada kullanabilirsiniz
      console.log("Dönen Veri:", data);
      console.log("Dönen Veri:", data.message);

      //      window["getData" + controllerName]();


      if (window.hasOwnProperty("getData" + controllerName)) {
        window["getData" + controllerName]();
      }
      messageNotification(
        "Bilgilendirme",
        "Kayıt Başarılı Bir şekilde Güncellendi",
        data.message.toLowerCase().includes("başarılı")
          ? AlertTypes.Success
          : AlertTypes.Error
      );
      try {
        closeModal("modal" + controllerName);
      } catch (error) {

      }

      // Swal.fire({
      //     title: "Bilgilendirme",
      //     text: data.taskMessage,
      //     icon: data.taskMessage.includes("Başarılı") ? "success" : "error",
      //     confirmButtonText: 'Tamam'

      // }).then((result) => {
      //     if (result.isConfirmed) {
      //         closeModal('modal' + controllerName);
      //     }
      // });
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
}

async function callDeleteMethod(controllerName, body) {
  const apiUrl = "/Methods/Delete";

  const data = {
    ControllerName: controllerName,
    body: body,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.text();
    console.log("Dönen Veri:", responseData);

    window["getData" + controllerName]();

    const errorMessage = "Bu data silinmiştir";
    const isErrorMessage = responseData.includes(errorMessage);

    Swal.fire({
      title: "Bilgilendirme",
      text: isErrorMessage
        ? "Silme işlemi başarısız oldu."
        : "Silme işlemi başarılı oldu.",
      icon: isErrorMessage ? "error" : "success",
      confirmButtonText: "Tamam",
    }).then((result) => {
      if (result.isConfirmed && !isErrorMessage) {
        closeModal("modal" + controllerName);
      }
    });
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
}

function closeModal(modalId) {
  try {
    const openModalCount = $(".modal.open").length;
    console.log("açık olan modal sayısı: " + openModalCount);
    $(`#${modalId}`).css("display", "none");
    $(`#${modalId}`).modal("hide");
    modalReset(modalId, modalId.replace("modal", ""));
  } catch (error) {
  }

}

function ModalInsertAndUpdate(modalName) {
  var pageName = modalName.replace("modal", "");
  modalName = modalName.replace("modal", "submit");

  var formm = document.getElementById("form" + pageName);
  var inputs = formm.elements;
  var data = {};

  for (var i = 0; i < inputs.length; i++) {
    // Sadece input elemanlarına odaklan
    if (inputs[i].type !== "button") {
      // ID ve değerleri nesneye ekle
      if (inputs[i].type === "select-one") {
        var nullVariable;
        if (inputs[i].value === "-1") {
          nullVariable = null;
        } else if (inputs[i].value.length > 0) {
          nullVariable = inputs[i].value;
        }
        // inputs[i].value !== "-1" &&        ? inputs[i].value     : null;

        if (!inputs[i].id.toLowerCase().includes("id")) {
          var nullVariable2 = parseInt(nullVariable);
          data[inputs[i].id] = nullVariable2;
        } else {
          data[inputs[i].id] = nullVariable;
        }
      } else if (inputs[i].type === "checkbox") {
        data[inputs[i].id] = inputs[i].checked;
      } else {
        if (inputs[i].type === "number") {
          data[inputs[i].id] = parseInt(inputs[i].value);
        } else {
          data[inputs[i].id] = inputs[i].value;
        }
      }
    }
  }

  var submitButton = $("#" + modalName + "#submit" + pageName);
  if (submitButton.text() === ActionTypes.Update) {
    delete data[""];
    //   delete data["createdAt"];
    data.updatedAt = getCurrentDateTime();
    //  data.Id =$('#Form'+pageName+ ' #Id').val();
    //    data.createdAt =$('#Form'+pageName+ ' #CreatedAt').val();
    data.active = true;
    console.log(JSON.stringify(data));
    callUpdateMethod(pageName, data)
      .then((result) => {
        console.log("Sonuç:", result);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  } else if (submitButton.text() === ActionTypes.Insert) {
    var fieldsToDelete = ["updatedAt", "id", "createdAt", "active"];

    fieldsToDelete.forEach(function (field) {
      delete data[field];
    });
    delete data[""];
    callInsertMethod(pageName, data)
      .then((result) => {
        console.log("Sonuç:", result);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }
}
