import htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

export async function exportNodeAsPng(node: HTMLElement, fileName = 'posterflow.png') {
  const dataUrl = await htmlToImage.toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#020617'
  });

  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}

export async function exportNodeAsPdf(node: HTMLElement, fileName = 'posterflow.pdf') {
  const dataUrl = await htmlToImage.toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#020617'
  });

  const img = new Image();
  img.src = dataUrl;
  await new Promise(resolve => {
    img.onload = resolve;
  });

  const pdf = new jsPDF({
    orientation: img.width >= img.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [img.width, img.height]
  });

  pdf.addImage(dataUrl, 'PNG', 0, 0, img.width, img.height);
  pdf.save(fileName);
}
