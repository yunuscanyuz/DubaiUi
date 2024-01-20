function createInputElements(json, modalName, pageDisplayName) {

  var gridHtmlCode = `<div class="col-sm-12">
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb bg-transparent mb-1 py-1 ps-3">
      <li class="breadcrumb-item text-sm">
        <a class="opacity-3 text-dark" href="javascript:;">
          <svg width="12px" height="12px" class="mb-1" viewBox="0 0 45 40" version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>shop </title>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-1716.000000, -439.000000)" fill="#252f40" fill-rule="nonzero">
                <g transform="translate(1716.000000, 291.000000)">
                  <g transform="translate(0.000000, 148.000000)">
                    <path
                      d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z">
                    </path>
                    <path
                      d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z">
                    </path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </a>
      </li>
      <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Firma Tanımları</a></li>
      <li class="breadcrumb-item text-sm text-dark fw-bold active" aria-current="page">@ViewData["Title"]</li>
    </ol>

  </nav>
</div>
<!-- SITE MAP END -->

<!-- CONTAINER CARD START -->
<div class="col-sm-12">
  <div class="card shadow-custom border border-custom">
    <!-- CARD HEADER START -->
    <div
      class="card-header px-3 py-2 grid border-bottom bg-gray-200 bg-gradient shadow d-md-flex align-items-center justify-content-between gap-2">
      <div class="d-flex gap-2 mb-2 mb-md-0">
        <div class="input-group input-group-outline input-group-sm bg-white rounded">
          <label class="form-label">Arama Yap</label>
          <input type="text" id="filter-text-box${modalName}" class="form-control form-control-sm text-sm"
            oninput="onFilterTextBoxChanged(gridOptions${modalName}Api,this)">
        </div>
        <div class="btn-group d-flex">
          <button type="button" class="btn btn-icon px-2 py-1 bg-gradient bg-white border border-custom text-dark mb-0"
            onclick=" customSizeToFit(gridOptions${modalName}Api)" data-bs-tooltip="tooltip" data-bs-placement="bottom" title="Sığdır"
            data-container="body" data-animation="true">
            <span class="btn-inner--icon">
              <i class="material-icons text-dark fs-6">
                horizontal_distribute
              </i>
            </span>
          </button>
          <button type="button" class="btn btn-icon px-2 py-1 bg-gradient bg-white border border-custom text-dark mb-0"
            onclick="customAutoSizeAll(gridOptions${modalName}Api,false)" data-bs-tooltip="tooltip" data-bs-placement="bottom"
            title="Otomatik Boyutlandır" data-container="body" data-animation="true">
            <span class="btn-inner--icon">
              <i class="material-icons text-dark fs-6">
                vertical_distribute
              </i>
            </span>
          </button>
          <button type="button" class="btn btn-icon px-2 py-1 bg-gradient bg-white border border-custom text-dark mb-0"
            onclick="customAutoSizeAll(gridOptions${modalName}Api,true)" data-bs-tooltip="tooltip" data-bs-placement="bottom"
            title="Otomatik Boyutlandır (Başlıkları Önemseme)" data-container="body" data-animation="true">
            <span class="btn-inner--icon">
              <i class="material-icons text-dark fs-6">
                density_large
              </i>
            </span>
          </button>
          <button type="button" class="btn btn-icon px-2 py-1 bg-gradient bg-white border border-custom text-dark mb-0"
            onclick="gridExportExcel(gridOptions${modalName}Api)" data-bs-tooltip="tooltip" data-bs-placement="bottom"
            title="Excel'e Aktar" data-container="body" data-animation="true">
            <span class="btn-inner--icon">
              <i class="material-icons text-dark fs-6">
                upload_file
              </i>
            </span>
          </button>
        </div>
      </div>
      <div class="btn-group d-flex">
        <button class="btn btn-icon px-2 py-1 bg-white border border-custom mb-0" data-bs-toggle="modal"
          data-bs-target="#modal${modalName}" data-bs-tooltip="tooltip" data-bs-placement="bottom" title="Ekle"
          data-container="body" data-animation="true">
          <span class="btn-inner--icon">
            <i class="material-icons text-dark fs-6 fw-bold">
              add
            </i>
          </span>
        </button>
        <button class="btn btn-icon px-2 py-1 bg-white border border-custom mb-0"
          onclick="agGridSelectedrow(gridOptions${modalName}Api, '${modalName}', 'Güncelle', 'Şube');" data-bs-tooltip="tooltip"
          data-bs-placement="bottom" title="Düzenle" data-container="body" data-animation="true">
          <span class="btn-inner--icon">
            <i class="material-icons text-dark fs-6">
              edit
            </i>
          </span>
        </button>
        <button class="btn btn-icon px-2 py-1 bg-white border border-custom mb-0"
          onclick="agGridSelectedrow(gridOptions${modalName}Api, '${modalName}', 'Sil', 'Şube');" data-bs-tooltip="tooltip"
          data-bs-placement="bottom" title="Sil" data-container="body" data-animation="true">
          <span class="btn-inner--icon">
            <i class="material-icons text-dark fs-6">
              delete
            </i>
          </span>
        </button>
      </div>
    </div>
    <!-- CARD HEADER END -->
    <!-- CARD BODY START -->
    <div class="card-body p-3 grid-container">
      <div id="Grid${modalName}" class="ag-theme-alpine">
      </div>
    </div>
    <!-- CARD BODY END -->
  </div>
</div>
<!-- CONTAINER CARD END --> 
`;



  var jsCode;
  jsCode = "<script> \n";
  const parsedJson = JSON.parse(json);

  const keys = Object.keys(parsedJson);

 jsCode+=`  $(document).ready(function () {
  initializeGrid("${modalName}");
});
ModalOpenMethods("${modalName}", "update", "insert", "defaultFunction2");`;

  

  // Yeni bir row elementi oluştur
  var rowElement = document.createElement("div");
  rowElement.className = "row";

  // Yeni bir col-12 col-lg-6 elementi oluştur
  var colElement = document.createElement("div");
  colElement.className = "col-12 col-lg-12";

  // Yeni bir card elementi oluştur
  var cardElement = document.createElement("div");
  cardElement.className = "card shadow-custom border border-custom mb-3 mb-lg-0";

  // Card içerisindeki body elementi
  var cardBodyElement = document.createElement("div");
  cardBodyElement.className = "card-body pt-3";

  var cardHeaderElement = document.createElement("div");
  cardHeaderElement.className = "card-header bg-gradient bg-gray-200 border-bottom py-2"

  // Başlık ekleyelim
  var titleElement = document.createElement("h6");
  titleElement.className = "font-weight-bolder mb-0";
  titleElement.textContent = "Firma Bilgileri";

  // Çizgi ekleyelim
  //var hrElement = document.createElement("hr");
  //hrElement.className = "horizontal dark mb-2 mt-1 bg-dark w-100";

  // Elementleri birbirine bağlayalım
  cardBodyElement.appendChild(titleElement);
  //cardBodyElement.appendChild(hrElement);

  cardHeaderElement.appendChild(titleElement);
  cardElement.appendChild(cardHeaderElement);
  cardElement.appendChild(cardBodyElement);
  colElement.appendChild(cardElement);

  var myForm = document.createElement("form");
  myForm.id = "form" + modalName;

  myForm.appendChild(colElement);
  rowElement.appendChild(myForm);

  for (const key of keys) {
    console.log(key);
    const elementName = key;
    var lowercase = elementName.slice(-2).toLowerCase();
    if (elementName.length > 2 && lowercase === "id") {

      // Yeni div öğesi oluştur
      var divElement = document.createElement("div");
      divElement.className = "col-12 mb-3";

      // İç içe geçmiş div öğesi oluştur
      var nestedDivElement = document.createElement("div");
      nestedDivElement.className = "dropdown-custom";

      // Etiket oluştur
      var labelElement = document.createElement("label");
      labelElement.id = "lbl_" + elementName;
      labelElement.htmlFor = elementName;
      labelElement.className = "fw-bolder mb-1 ms-0";
      labelElement.appendChild(document.createTextNode(elementName));

      //          <label for="id" id="lbl_id" placeholder="id" class="fw-bolder text-sm mb-1">id</label>
      //          <input type="text" id="id" class="form-control form-control-custom">

      // Select oluştur
      var selectElement = document.createElement("select");
      selectElement.name = elementName;
      selectElement.id = elementName;
      selectElement.className = "ps-2";

      // Option oluştur
      var optionElement = document.createElement("option");
      optionElement.value = "";
      optionElement.appendChild(document.createTextNode("Lütfen bir seçim yapınız..."));

      // Option'u select elementine ekle
      selectElement.appendChild(optionElement);

      // Elemanları birbirine bağla
      nestedDivElement.appendChild(labelElement);
      nestedDivElement.appendChild(selectElement);

      // İç içe geçmiş div'i ana div'e ekle
      divElement.appendChild(nestedDivElement);

      // Son olarak, oluşturulan HTML'i sayfaya ekleyin (örneğin, bir div'e)
      cardBodyElement.appendChild(divElement);
 jsCode += ` async function ${elementName}OnChange() {
  //await dropdownFillGetByID('viewnameGelecek', 'form${modalName}', 'datalistenecekSelectId', 'Name',"parametername",$('#parametervalue').val());
  }`;

    } else {
      var div = document.createElement("div");
      div.className = "col-12 mb-3";
      var ent = elementName.toLocaleLowerCase();
      if (
        ent === "id" ||
        ent === "updatedat" ||
        ent === "createdat" ||
        ent === "active"
      ) {
        div.classList.add("d-none");
      }
      // İç içe geçmiş div ve input oluştur
      var innerDiv = document.createElement("div");
      innerDiv.className = "input-group input-group-static";

      var label = document.createElement("label");
      label.className = "fw-bolder mb-2 text-sm mb-1";
      label.id = "lbl_" + elementName;
      label.htmlFor = elementName;
      // label.style.fontSize = ".875rem";
      label.appendChild(document.createTextNode(elementName));

      var input = document.createElement("input");
      input.type = "text";
      input.className = "form-control form-control-custom";
      input.placeholder = elementName;
      input.id = elementName;
      //input.setAttribute("onfocus", "focused(this)");

      //input.setAttribute("onfocusout", "defocused(this)");

      // Elemanları birbirine bağla
      innerDiv.appendChild(label);
      innerDiv.appendChild(input);

      div.appendChild(innerDiv);
      cardBodyElement.appendChild(div);
    }

    // Buraya input oluşturma işlemleri eklenebilir

    var gg = document.getElementById("formDiv");
    gg.appendChild(rowElement);



  };

  var createModalDiv = `<!-- MODAL START -->
  
  <div class="modal fade" id="modal${modalName}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    style="z-index: 9999;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-top" role="document">
      <div class="modal-content">
        <!-- MODAL HEADER START  -->
        <div class="modal-header bg-gradient bg-gray-200 border-bottom shadow py-2">
          <h6 class="modal-title" id="exampleModalLabel">${pageDisplayName} Bilgileri</h6>
          <button type="button" class="btn-close text-dark d-flex align-items-center justify-content-center"
            data-bs-dismiss="modal" aria-label="Close">
            <span class="fs-4" aria-hidden=" true">&times;</span>
          </button>
        </div>
        <!-- MODAL HEADER END  -->
        <!-- MODAL BODY START  -->
        <div class="modal-body pb-0">
          ${gg.innerHTML}
        </div>
        <!-- MODAL BODY END  -->
        <!-- MODAL FOOTER START  -->
        <div class="modal-footer">
          <button type="button" id="close${modalName}"
            class="btn btn-sm btn-outline-secondary shadow border border-custom m-0 me-2"
            data-bs-dismiss="modal">Kapat</button>
          <button type="button" id="submit${modalName}" class="btn btn-sm bg-gradient btn-brand-color shadow m-0 me-1"
            onclick="ModalInsertAndUpdate('modal${modalName}');">Kaydet</button>
        </div>
        <!-- MODAL FOOTER END  -->
      </div>
    </div>
  </div>
  <!-- MODAL END  -->`;
  var ss = document.getElementById("formDiv");
  ss.innerHTML = gridHtmlCode;
  ss.innerHTML += createModalDiv;

  var sss = document.getElementById("formDiv2");
  document.getElementById("formDiv2").value = ss.innerHTML;

jsCode +=`async function update(data) {
  // $('#countryId').val(data.countryId ?? data.CountryId);
   //await countryIdOnChange();
 }
 async function insert() {
 }

 async function defaultFunction2() {
  // await dropdownFill('vw_Companies', 'form${modalName}', 'companyId', 'Name');
 }`;

  jsCode += "</script> \n";
  sss.value += " \n" + jsCode;
}

// Kullanım örneği:
const jsonData = {
  genericID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  updatedAt: "2023-11-17T12:26:25.215Z",
  createdAt: "2023-11-17T12:26:25.215Z",
  active: true,
};
