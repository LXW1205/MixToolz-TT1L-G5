let uploadedFileName = "";
let file = document.getElementById("input-file");
let pdf_btn = document.querySelector(".hide");

file.addEventListener('change', displayImage);
  function displayImage() {
    const reader = new FileReader();
    reader.onload = function(e) {
      const poster = document.querySelector('.poster img');
      poster.src = e.target.result;
      uploadedFileName = file.files[0].name.split('.')[0];
      pdf_btn.classList.remove("hide");
      };
      reader.readAsDataURL(file.files[0]);
  }

//Drag and Drop to Import Image
let drop_area = document.querySelector(".drop_area");
drop_area.addEventListener("dragover", function(e){
  e.preventDefault();
  drop_area.style = "border: 2px dashed #19DC02";
  drop_area.innerText = "Release your image to upload";
});

drop_area.addEventListener("drop", function(e){
  e.preventDefault();
  file.files = e.dataTransfer.files;
  uploadedFileName = file.files[0].name.split('.')[0];
  drop_area.style = "border: 2px dashed #f7673b";
  drop_area.innerText = "Drag & Drop your image here";
  displayImage();
});

drop_area.addEventListener("dragleave", function(e){
  e.preventDefault();
  drop_area.style = "border: 2px dashed #f7673b";
  drop_area.innerText = "Drag & Drop your image here";
});

function convertToPDF() {
  const { jsPDF } = window.jspdf;
  const img = document.querySelector('.poster img');
  const pdf = new jsPDF();

  pdf.addImage(img.src, 'image/*', 15, 40, 180, 160);
  const pdfFileName = uploadedFileName ? `${uploadedFileName}.pdf` : 'download.pdf';
  pdf.save(pdfFileName);  
}  