const fileInput = document.getElementById('input-file');

fileInput.addEventListener('change', importpdf);
  async function importpdf() {
    hide.classList.remove("hide");  

    const file = fileInput.files[0];
    const pdfData = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(pdfData);

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById('pdf1').src = pdfDataUri;

  }

async function extractPDF() {
  pdf1.classList.add("hide");
  pdf2.classList.remove("hide");

  let pages = document.getElementById('pages'); 
  let pagesInput = pages.value; 

  let filename = document.getElementById('filename'); 
  let Filerename = filename;
  const Namefile = Filerename.value.trim() || 'extracted_pdf';

  const fileInput = document.getElementById('input-file');

  const file = fileInput.files[0];

  if (!file) {
    alert("Please select PDF file.");
    return;
  }

  if (!pagesInput) {
    alert("Please enter the pages you want to extract.");
    return;
  }

  const pdfData = await file.arrayBuffer();

  const pdfDoc = await PDFLib.PDFDocument.load(pdfData);

  const extractedPdf = await PDFLib.PDFDocument.create();

  const selectedPages = pagesInput.split(',')
    .map(page => parseInt(page.trim(), 10))
    .filter(page => !isNaN(page) && page >= 1 && page <= pdfDoc.getPageCount());

  if (selectedPages.length === 0) {
    alert("No valid pages selected.");
    return;
  }

  for (const pageNum of selectedPages) {
    const [copiedPage] = await extractedPdf.copyPages(pdfDoc, [pageNum - 1]);
    extractedPdf.addPage(copiedPage);
  }

  const extractedPdfData = await extractedPdf.save();
  const blob = new Blob([extractedPdfData], { type: 'application/pdf' });
  const downloadLink = document.getElementById('downloadLink');

  const pdfDataUri = await extractedPdf.saveAsBase64({ dataUri: true });
  document.getElementById('pdf2').src = pdfDataUri;

  downloadLink.style.display = 'block';
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `${Namefile}.pdf`;

};