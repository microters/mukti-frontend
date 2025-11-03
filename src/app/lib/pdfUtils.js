export const downloadAsPdf = async (elementClass, filename) => {
    if (typeof window === 'undefined') {
        console.error("Attempted PDF download on the server.");
        return;
    }
    
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.querySelector(`.${elementClass}`);
    
    if (!element) {
        throw new Error("Print layout not found in DOM.");
    }
    
    const opt = {
        margin: 0, // Set margin to 0 and let the CSS handle spacing (20mm padding)
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        
        // --- CRITICAL FIXES HERE ---
        html2canvas: { 
            // 1. Remove manual scale and rely on default resolution
            // scale: 2, 
            logging: false, 
            useCORS: true, // Needed if your logo is loaded from another domain
            
            // 2. Add custom CSS to the canvas element to force print styles
            // This ensures background colors and absolute positions are respected.
            // Force A4 size and margin handling (which your media query sets)
            // The @page rules are difficult to inject, so we force them via CSS properties.
            width: 794, // Equivalent to 210mm at 96dpi (A4)
            windowHeight: 1123, // Equivalent to 297mm (A4)
        },
        
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        },
        
        // OPTIONAL: Helps with single-page documents
        pagebreak: { 
            mode: 'avoid-all' 
        }
    };
    
    await html2pdf().set(opt).from(element).save();
};