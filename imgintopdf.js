const fileInput1 = document.getElementById('input-file');

const fileInput2 = document.getElementById('input-file2');

fileInput1.addEventListener('change', importpdf);
  async function importpdf() {
    hide.classList.remove("hide");  
  }

async function removePDF() {
  let pages = document.getElementById('pages'); 
  let pagesInput = pages.value; 
  
  let filename = document.getElementById('filename'); 
  let Filerename = filename;
  const Namefile = Filerename.value.trim() || 'edited_pdf';
  
  const file = fileInput.files[0];
  
  if (!pagesInput) {
      alert("Please enter the pages you want to remove.");
      return;
    }
  
  const pdfData = await file.arrayBuffer();
  
  const pdfDoc = await PDFLib.PDFDocument.load(pdfData);
  
  const totalPages = pdfDoc.getPageCount();

  const selectedPages = pagesInput.split(',')
    .map(page => parseInt(page.trim(), 10))
    .filter(page => !isNaN(page) && page >= 1 && page <= totalPages)
    .sort((a, b) => b - a);

  for (const page of selectedPages) {
    pdfDoc.removePage(page - 1);
  }

  const removedPdfData = await pdfDoc.save();
  const blob = new Blob([removedPdfData], { type: 'application/pdf' });
  const downloadLink = document.getElementById('downloadLink');
  
  downloadLink.style.display = 'block';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${Namefile}.pdf`;
  
  };