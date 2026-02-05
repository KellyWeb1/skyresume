/**
 * Export logic using html2pdf.js
 */
function exportToPDF() {
    const element = document.getElementById('resume-preview');
    
    // Create options for PDF generation
    // We remove the scale transform temporarily to ensure high quality capture
    const opt = {
        margin:       0,
        filename:     'Sky-Resume-Export.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true,
            letterRendering: true,
            scrollY: 0
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Show processing state
    const btn = document.getElementById('nextBtn');
    const originalText = btn.innerText;
    btn.innerText = "Exporting...";
    btn.disabled = true;

    // Use html2pdf
    html2pdf().set(opt).from(element).save().then(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        alert('Your premium resume has been downloaded!');
    }).catch(err => {
        console.error('PDF Export Error:', err);
        btn.innerText = originalText;
        btn.disabled = false;
        alert('Export failed. Please try again.');
    });
}
