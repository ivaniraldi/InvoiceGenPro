  /**
   * PDF Generator for the invoice application
   */

  // Mock translations object (replace with your actual translations)


  // Función para mostrar/ocultar el menú de opciones de PDF
  function togglePdfOptions() {
    const pdfOptions = document.getElementById("pdf-options")
    pdfOptions.classList.toggle("hidden")
  }

  // Función para cerrar el menú de opciones si se hace clic fuera de él
  function closePdfOptionsOnClickOutside(event) {
    const pdfOptions = document.getElementById("pdf-options")
    const generatePdfBtn = document.getElementById("generate-pdf-btn")

    if (
      !pdfOptions.classList.contains("hidden") &&
      !pdfOptions.contains(event.target) &&
      !generatePdfBtn.contains(event.target)
    ) {
      pdfOptions.classList.add("hidden")
    }
  }

  // Crear el contenido HTML para el PDF
  function createPdfContent() {
    try {
      const languageSelect = document.getElementById("language-select");
      let currentLanguage = languageSelect ? languageSelect.value : "en";
      if (!translations[currentLanguage]) {
        console.warn(`Language "${currentLanguage}" not found. Defaulting to "en".`);
        currentLanguage = "en";
      }

      const invoiceData = collectInvoiceData();
      if (!invoiceData) {
        throw new Error('No se pudieron recopilar los datos de la factura');
      }

      const mainContainer = document.createElement('div');
      mainContainer.style.width = '210mm';
      mainContainer.style.margin = '0 auto';
      mainContainer.style.backgroundColor = 'white';
      mainContainer.style.fontFamily = 'Inter, sans-serif';

      const itemsPerPage = 10;
      const totalPages = Math.ceil(invoiceData.items.length / itemsPerPage);

      if (invoiceData.items.length > 0) {
        for (let i = 0; i < totalPages; i++) {
          const startIndex = i * itemsPerPage;
          const endIndex = Math.min(startIndex + itemsPerPage, invoiceData.items.length);
          const pageItems = invoiceData.items.slice(startIndex, endIndex);
          
          const page = document.createElement('div');
          page.style.width = '210mm';
          page.style.minHeight = totalPages > 1 ? '294mm' : '296mm';
          page.style.padding = '10mm';
          page.style.backgroundColor = 'white';
          page.style.position = 'relative';
          page.style.pageBreakAfter = (i < totalPages - 1) ? 'avoid' : 'avoid';
          
          // Header solo en la primera página
          if (i === 0) {
            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.marginBottom = '30px';
            header.style.paddingBottom = '20px';
            header.style.borderBottom = '2px solid #854836';
            header.style.pageBreakInside = 'avoid';

            const titleContainer = document.createElement('div');
            titleContainer.style.flex = '1';
            titleContainer.style.textAlign = 'left';

            const title = document.createElement('h1');
            title.style.fontSize = '28px';
            title.style.fontWeight = 'bold';
            title.style.color = '#854836';
            title.style.margin = '0';
            title.textContent = translations[currentLanguage]["invoice-title"];

            const invoiceNumberContainer = document.createElement('div');
            invoiceNumberContainer.style.textAlign = 'right';
            invoiceNumberContainer.style.marginLeft = '20px';

            const invoiceNumberLabel = document.createElement('div');
            invoiceNumberLabel.style.fontSize = '14px';
            invoiceNumberLabel.style.color = '#666666';
            invoiceNumberLabel.style.marginBottom = '5px';
            invoiceNumberLabel.textContent = translations[currentLanguage]["label-invoice-number"];

            const invoiceNumber = document.createElement('div');
            invoiceNumber.style.fontSize = '24px';
            invoiceNumber.style.fontWeight = 'bold';
            invoiceNumber.style.color = '#854836';
            invoiceNumber.textContent = invoiceData.invoiceNum;

            invoiceNumberContainer.appendChild(invoiceNumberLabel);
            invoiceNumberContainer.appendChild(invoiceNumber);
            titleContainer.appendChild(title);
            header.appendChild(titleContainer);
            header.appendChild(invoiceNumberContainer);
            page.appendChild(header);

            // Información de la empresa y cliente (solo en primera página)
            const infoContainer = document.createElement('div');
            infoContainer.style.display = 'flex';
            infoContainer.style.justifyContent = 'space-between';
            infoContainer.style.marginBottom = '40px';
            infoContainer.style.fontSize = '13px';

            // Información del emisor
            const billerInfo = document.createElement('div');
            billerInfo.style.flex = '1';
            billerInfo.style.marginRight = '40px';

            const billerTitle = document.createElement('h2');
            billerTitle.style.fontSize = '16px';
            billerTitle.style.fontWeight = 'bold';
            billerTitle.style.marginBottom = '12px';
            billerTitle.style.color = '#854836';
            billerTitle.textContent = translations[currentLanguage]["label-biller-name"];

            const billerName = document.createElement('div');
            billerName.style.fontSize = '15px';
            billerName.style.marginBottom = '10px';
            billerName.textContent = invoiceData.billerName;

            const billerAddress = document.createElement('div');
            billerAddress.style.color = '#666666';
            billerAddress.style.whiteSpace = 'pre-line';
            billerAddress.style.lineHeight = '1.5';
            billerAddress.textContent = invoiceData.billerAddress;

            billerInfo.appendChild(billerTitle);
            billerInfo.appendChild(billerName);
            billerInfo.appendChild(billerAddress);

            // Información del cliente
            const clientInfo = document.createElement('div');
            clientInfo.style.flex = '1';
            clientInfo.style.textAlign = 'right';

            const clientTitle = document.createElement('h2');
            clientTitle.style.fontSize = '16px';
            clientTitle.style.fontWeight = 'bold';
            clientTitle.style.marginBottom = '12px';
            clientTitle.style.color = '#854836';
            clientTitle.textContent = translations[currentLanguage]["label-client-name"];

            const clientName = document.createElement('div');
            clientName.style.fontSize = '15px';
            clientName.style.marginBottom = '10px';
            clientName.textContent = invoiceData.clientName;

            const clientAddress = document.createElement('div');
            clientAddress.style.color = '#666666';
            clientAddress.style.whiteSpace = 'pre-line';
            clientAddress.style.lineHeight = '1.5';
            clientAddress.textContent = invoiceData.clientAddress;

            clientInfo.appendChild(clientTitle);
            clientInfo.appendChild(clientName);
            clientInfo.appendChild(clientAddress);

            infoContainer.appendChild(billerInfo);
            infoContainer.appendChild(clientInfo);
            page.appendChild(infoContainer);

            // Detalles de la factura (solo en primera página)
            const detailsContainer = document.createElement('div');
            detailsContainer.style.marginBottom = '40px';
            detailsContainer.style.padding = '20px';
            detailsContainer.style.backgroundColor = '#F7F7F7';
            detailsContainer.style.borderRadius = '8px';
            detailsContainer.style.fontSize = '13px';

            const detailsGrid = document.createElement('div');
            detailsGrid.style.display = 'grid';
            detailsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            detailsGrid.style.gap = '20px';

            // Fecha de emisión
            const invoiceDateContainer = document.createElement('div');
            invoiceDateContainer.style.color = '#666666';

            const invoiceDateLabel = document.createElement('div');
            invoiceDateLabel.style.fontWeight = 'bold';
            invoiceDateLabel.style.marginBottom = '8px';
            invoiceDateLabel.textContent = translations[currentLanguage]["label-invoice-date"];

            const invoiceDate = document.createElement('div');
            invoiceDate.textContent = formatDisplayDate(invoiceData.invoiceIssueDate, currentLanguage);

            invoiceDateContainer.appendChild(invoiceDateLabel);
            invoiceDateContainer.appendChild(invoiceDate);
            detailsGrid.appendChild(invoiceDateContainer);

            // Condiciones de pago
            const paymentTermsContainer = document.createElement('div');
            paymentTermsContainer.style.color = '#666666';

            const paymentTermsLabel = document.createElement('div');
            paymentTermsLabel.style.fontWeight = 'bold';
            paymentTermsLabel.style.marginBottom = '8px';
            paymentTermsLabel.textContent = translations[currentLanguage]["label-due-date"];

            const paymentTerms = document.createElement('div');
            paymentTerms.textContent = formatDisplayDate(invoiceData.invoiceDueDate, currentLanguage);

            paymentTermsContainer.appendChild(paymentTermsLabel);
            paymentTermsContainer.appendChild(paymentTerms);
            detailsGrid.appendChild(paymentTermsContainer);

            // Fecha de vencimiento (solo si existe)
            if (invoiceData.purchaseOrder) {
              const purchaseOrderContainer = document.createElement('div');
              purchaseOrderContainer.style.color = '#666666';

              const purchaseOrderLabel = document.createElement('div');
              purchaseOrderLabel.style.fontWeight = 'bold';
              purchaseOrderLabel.style.marginBottom = '8px';
              purchaseOrderLabel.textContent = translations[currentLanguage]["label-purchase-order"];

              const purchaseOrder = document.createElement('div');
              purchaseOrder.textContent = invoiceData.purchaseOrder;

              purchaseOrderContainer.appendChild(purchaseOrderLabel);
              purchaseOrderContainer.appendChild(purchaseOrder);
              detailsGrid.appendChild(purchaseOrderContainer);
            }

            detailsContainer.appendChild(detailsGrid);
            page.appendChild(detailsContainer);
          }

          // Tabla de artículos
          const table = document.createElement('table');
          table.style.width = '100%';
          table.style.borderCollapse = 'collapse';
          table.style.marginBottom = '30px';
          table.style.fontSize = '13px';
          table.style.pageBreakInside = 'auto';

          // Encabezados de la tabla
          const thead = document.createElement('thead');
          thead.style.backgroundColor = '#F7F7F7';
          thead.style.pageBreakInside = 'avoid';
          thead.innerHTML = `
            <tr>
              <th style="text-align: left; padding: 12px; color: #666666; font-weight: bold; font-size: 13px;">${translations[currentLanguage]["th-item"]}</th>
              <th style="text-align: left; padding: 12px; color: #666666; font-weight: bold; font-size: 13px;">${translations[currentLanguage]["th-quantity"]}</th>
              <th style="text-align: left; padding: 12px; color: #666666; font-weight: bold; font-size: 13px;">${translations[currentLanguage]["th-rate"]}</th>
              <th style="text-align: left; padding: 12px; color: #666666; font-weight: bold; font-size: 13px;">${translations[currentLanguage]["th-total"]}</th>
            </tr>
          `;
          table.appendChild(thead);

          // Cuerpo de la tabla
          const tbody = document.createElement('tbody');
          pageItems.forEach(item => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #E5E7EB';
            tr.style.pageBreakInside = 'avoid';
            tr.innerHTML = `
              <td style="padding: 12px;">${item.description}</td>
              <td style="padding: 12px;">${item.quantity}</td>
              <td style="padding: 12px;">${Number.parseFloat(item.rate).toFixed(2)}</td>
              <td style="padding: 12px;">${item.total}</td>
            `;
            tbody.appendChild(tr);
          });
          table.appendChild(tbody);

          page.appendChild(table);

          // Resumen (solo en la última página)
          if (i === totalPages - 1) {
            const summaryContainer = document.createElement('div');
            summaryContainer.style.marginTop = '30px';
            summaryContainer.style.padding = '20px';
            summaryContainer.style.backgroundColor = '#F7F7F7';
            summaryContainer.style.borderRadius = '8px';
            summaryContainer.style.fontSize = '13px';
            summaryContainer.style.pageBreakInside = 'avoid';

            const summaryGrid = document.createElement('div');
            summaryGrid.style.display = 'grid';
            summaryGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            summaryGrid.style.gap = '25px';

            // Columna de información
            const infoColumn = document.createElement('div');

            // Subtotal
            const subtotalRow = document.createElement('div');
            subtotalRow.style.display = 'flex';
            subtotalRow.style.justifyContent = 'space-between';
            subtotalRow.style.marginBottom = '12px';
            subtotalRow.innerHTML = `
              <span style="color: #666666;">${translations[currentLanguage]["label-subtotal"]}</span>
              <span>${invoiceData.subtotal}</span>
            `;
            infoColumn.appendChild(subtotalRow);

            // Impuesto (solo si existe)
            if (invoiceData.taxRate > 0) {
              const taxRow = document.createElement('div');
              taxRow.style.display = 'flex';
              taxRow.style.justifyContent = 'space-between';
              taxRow.style.marginBottom = '12px';
              taxRow.innerHTML = `
                <span style="color: #666666;">${translations[currentLanguage]["label-tax"]} (${invoiceData.taxRate}%)</span>
                <span>${invoiceData.taxAmount}</span>
              `;
              infoColumn.appendChild(taxRow);
            }

            // Total
            const totalRow = document.createElement('div');
            totalRow.style.display = 'flex';
            totalRow.style.justifyContent = 'space-between';
            totalRow.style.marginBottom = '12px';
            totalRow.style.fontSize = '15px';
            totalRow.style.fontWeight = 'bold';
            totalRow.innerHTML = `
              <span>${translations[currentLanguage]["label-total"]}</span>
              <span>${invoiceData.total}</span>
            `;
            infoColumn.appendChild(totalRow);

            // Saldo adeudado (solo si hay cantidad pagada)
            if (invoiceData.amountPaid > 0) {
              const balanceRow = document.createElement('div');
              balanceRow.style.display = 'flex';
              balanceRow.style.justifyContent = 'space-between';
              balanceRow.style.fontSize = '15px';
              balanceRow.style.fontWeight = 'bold';
              balanceRow.innerHTML = `
                <span>${translations[currentLanguage]["label-amount-paid"]}</span>
                <span style="color: #dc2626;">${Number.parseFloat(invoiceData.amountPaid).toFixed(2)}</span>
              `;
              infoColumn.appendChild(balanceRow);
            }

            summaryGrid.appendChild(infoColumn);
            summaryContainer.appendChild(summaryGrid);
            page.appendChild(summaryContainer);

            // Notas y términos
            if (invoiceData.notes || invoiceData.terms) {
              const notesTermsContainer = document.createElement('div');
              notesTermsContainer.style.marginTop = '40px';
              notesTermsContainer.style.display = 'grid';
              notesTermsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
              notesTermsContainer.style.gap = '25px';

              // Notas
              if (invoiceData.notes) {
                const notesContainer = document.createElement('div');

                const notesLabel = document.createElement('div');
                notesLabel.style.fontWeight = 'bold';
                notesLabel.style.marginBottom = '10px';
                notesLabel.style.fontSize = '14px';
                notesLabel.textContent = translations[currentLanguage]["label-notes"];

                const notes = document.createElement('div');
                notes.style.color = '#666666';
                notes.style.whiteSpace = 'pre-line';
                notes.style.lineHeight = '1.5';
                notes.textContent = invoiceData.notes;

                notesContainer.appendChild(notesLabel);
                notesContainer.appendChild(notes);
                notesTermsContainer.appendChild(notesContainer);
              }

              // Términos
              if (invoiceData.terms) {
                const termsContainer = document.createElement('div');

                const termsLabel = document.createElement('div');
                termsLabel.style.fontWeight = 'bold';
                termsLabel.style.marginBottom = '10px';
                termsLabel.style.fontSize = '14px';
                termsLabel.textContent = translations[currentLanguage]["label-terms"];

                const terms = document.createElement('div');
                terms.style.color = '#666666';
                terms.style.whiteSpace = 'pre-line';
                terms.style.lineHeight = '1.5';
                terms.textContent = invoiceData.terms;

                termsContainer.appendChild(termsLabel);
                termsContainer.appendChild(terms);
                notesTermsContainer.appendChild(termsContainer);
              }

              page.appendChild(notesTermsContainer);
            }
          }

          mainContainer.appendChild(page);
        }
      }

      // Agregar log para depuración
      console.log('Contenido HTML generado:', mainContainer.outerHTML);
      
      return mainContainer;
    } catch (error) {
      console.error('Error al crear el contenido del PDF:', error);
      showAlert('Error al crear el contenido del PDF. Por favor, inténtelo de nuevo.');
      return null;
    }
  }

  // Función para mostrar alertas estilizadas
  function showAlert(message, type = 'error') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
      type === 'error' ? 'bg-red-100 border-l-4 border-red-500 text-red-700' : 'bg-green-100 border-l-4 border-green-500 text-green-700'
    }`;
    alertDiv.innerHTML = `
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium">${message}</p>
        </div>
      </div>
    `;
    document.body.appendChild(alertDiv);
    
    // Eliminar la alerta después de 5 segundos
    setTimeout(() => {
      alertDiv.classList.add('opacity-0', 'translate-x-full');
      setTimeout(() => alertDiv.remove(), 300);
    }, 5000);
  }

  // Collect all invoice data from the form
  function collectInvoiceData() {
    try {
    // Get company and client info
      const billerName = document.getElementById("biller-name")?.value || '';
      const billerAddress = document.getElementById("biller-address")?.value || '';
      const clientName = document.getElementById("client-name")?.value || '';
      const clientAddress = document.getElementById("client-address")?.value || '';

    // Get invoice details
      const invoiceNum = document.getElementById("invoice-number")?.value || '';
      const invoiceIssueDate = document.getElementById("invoice-date")?.value || '';
      const invoiceDueDate = document.getElementById("due-date")?.value || '';
      const purchaseOrder = document.getElementById("purchase-order")?.value || '';

    // Get notes and terms
      const notes = document.getElementById("notes")?.value || '';
      const terms = document.getElementById("terms")?.value || '';

    // Get items
      const items = [];
      const itemRows = document.querySelectorAll(".item-row");
    itemRows.forEach((row) => {
        const description = row.querySelector(".item-description")?.value || '';
        const quantity = row.querySelector(".item-quantity")?.value || '0';
        const rate = row.querySelector(".item-rate")?.value || '0';
        const total = row.querySelector(".item-total")?.textContent || '0.00 €';
        
        if (description) {
      items.push({
            description,
            quantity,
            rate,
            total,
          });
        }
      });

    // Get totals
      const subtotal = document.getElementById("subtotal")?.textContent || '0.00 €';
      const taxRate = document.getElementById("tax-rate")?.value || '0';
      const taxAmount = document.getElementById("tax")?.textContent || '0.00 €';
      const total = document.getElementById("total")?.textContent || '0.00 €';
      const amountPaid = document.getElementById("amount-paid")?.value || '0';
      const balanceDue = document.getElementById("balance-due")?.textContent || '0.00 €';

      // Validar datos requeridos
      if (!billerName || !clientName || items.length === 0) {
        showAlert('Por favor, complete los campos requeridos: nombre del emisor, nombre del cliente y al menos un artículo.');
        return null;
      }

    return {
      billerName,
      billerAddress,
      clientName,
      clientAddress,
      invoiceNum,
      invoiceIssueDate,
      invoiceDueDate,
      purchaseOrder,
      notes,
      terms,
      items,
      subtotal,
      taxRate,
      taxAmount,
      total,
      amountPaid,
      balanceDue,
      };
    } catch (error) {
      console.error('Error al recopilar datos de la factura:', error);
      showAlert('Error al recopilar los datos de la factura. Por favor, inténtelo de nuevo.');
      return null;
    }
  }

  // Función para formatear fechas
  function formatDisplayDate(dateString, language) {
    if (!dateString) return ""

    const date = new Date(dateString)
    const options = { year: "numeric", month: "long", day: "numeric" }

    let locale
    switch (language) {
      case "es":
        locale = "es-ES"
        break
      case "pt":
        locale = "pt-BR"
        break
      default:
        locale = "en-US"
    }

    return date.toLocaleDateString(locale, options)
  }

  // Función para descargar el PDF
  function downloadPdf() {
    const loadingOverlay = document.getElementById("loading-overlay");
    if (!loadingOverlay) {
      showAlert('Error: No se encontró el elemento de carga');
      return;
    }
    loadingOverlay.classList.remove("hidden");

    try {
      const invoiceData = collectInvoiceData();
      if (!invoiceData) {
        loadingOverlay.classList.add("hidden");
        return;
      }

      const pdfContent = createPdfContent();
      if (!pdfContent) {
        loadingOverlay.classList.add("hidden");
        return;
      }

      const opt = {
        margin: 0,
        filename: `factura-${invoiceData.invoiceNum}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          logging: false,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0
        },
        jsPDF: { 
          unit: "mm", 
          format: "a4", 
          orientation: "portrait",
          compress: true
        },
      };

      window.html2pdf()
        .from(pdfContent)
        .set(opt)
        .save()
        .then(() => {
          loadingOverlay.classList.add("hidden");
          showAlert('PDF generado exitosamente', 'success');
        })
        .catch((error) => {
          console.error("Error al generar el PDF:", error);
          showAlert("Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.");
          loadingOverlay.classList.add("hidden");
        });
    } catch (error) {
      console.error("Error al preparar el PDF:", error);
      showAlert("Hubo un error al preparar el PDF. Por favor, inténtelo de nuevo.");
      loadingOverlay.classList.add("hidden");
    }
  }

  // Función para imprimir el PDF
  function printPdf() {
    const loadingOverlay = document.getElementById("loading-overlay");
    if (!loadingOverlay) {
      showAlert('Error: No se encontró el elemento de carga');
      return;
    }
    loadingOverlay.classList.remove("hidden");

    try {
      const invoiceData = collectInvoiceData();
      if (!invoiceData) {
        loadingOverlay.classList.add("hidden");
        return;
      }

      const pdfContent = createPdfContent();
      if (!pdfContent) {
        loadingOverlay.classList.add("hidden");
        return;
      }

      const opt = {
        margin: 0,
        filename: `factura-${invoiceData.invoiceNum}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          logging: false,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0
        },
        jsPDF: { 
          unit: "mm", 
          format: "a4", 
          orientation: "portrait",
          compress: true
        },
      };

      // Generar el PDF y abrirlo en una nueva ventana para imprimir
      window.html2pdf()
        .from(pdfContent)
        .set(opt)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          // Convertir el PDF a blob
          const blob = pdf.output("blob");

          // Crear una URL para el blob
          const blobUrl = URL.createObjectURL(blob);

          // Abrir una nueva ventana con el PDF
          const printWindow = window.open(blobUrl, "_blank");

          if (printWindow) {
            // Esperar a que se cargue el PDF y luego imprimir
            printWindow.onload = () => {
              setTimeout(() => {
                printWindow.print();
                // Ocultar el overlay de carga
                loadingOverlay.classList.add("hidden");
              }, 1000);
            };
          } else {
            showAlert("Por favor, permita las ventanas emergentes para imprimir la factura.");
            loadingOverlay.classList.add("hidden");
          }
        })
        .catch((error) => {
          console.error("Error al generar el PDF para imprimir:", error);
          showAlert("Hubo un error al generar el PDF para imprimir. Por favor, inténtelo de nuevo.");
          loadingOverlay.classList.add("hidden");
        });
    } catch (error) {
      console.error("Error al preparar el PDF para imprimir:", error);
      showAlert("Hubo un error al preparar el PDF para imprimir. Por favor, inténtelo de nuevo.");
      loadingOverlay.classList.add("hidden");
    }
  }

  // Inicializar los eventos para el generador de PDF
  document.addEventListener("DOMContentLoaded", () => {
    // Botón para mostrar/ocultar opciones de PDF
    const generatePdfBtn = document.getElementById("generate-pdf-btn")
    if (generatePdfBtn) {
      generatePdfBtn.addEventListener("click", togglePdfOptions)
    }

    // Botón para descargar PDF
    const downloadPdfBtn = document.getElementById("download-pdf")
    if (downloadPdfBtn) {
      downloadPdfBtn.addEventListener("click", () => {
        document.getElementById("pdf-options").classList.add("hidden")
        downloadPdf()
      })
    }

    // Botón para imprimir PDF
    const printPdfBtn = document.getElementById("print-pdf")
    if (printPdfBtn) {
      printPdfBtn.addEventListener("click", () => {
        document.getElementById("pdf-options").classList.add("hidden")
        printPdf()
      })
    }

    // Cerrar el menú de opciones al hacer clic fuera
    document.addEventListener("click", closePdfOptionsOnClickOutside)
  })

  // Mock formatDisplayDate function (replace with your actual date formatting function)
  //function formatDisplayDate(dateString, language) {
  //  if (!dateString) return ""
  //
  //  const date = new Date(dateString)
  //  const options = { year: "numeric", month: "long", day: "numeric" }
  //
  //  let locale
  //  switch (language) {
  //    case "es":
  //      locale = "es-ES"
  //      break
  //    case "pt":
  //      locale = "pt-BR"
  //      break
  //    default:
  //      locale = "en-US"
  //  }
  //
  //  return date.toLocaleDateString(locale, options)
  //}

  // Generate PDF from invoice data
  function generatePDF() {
    // Show loading overlay
    const loadingOverlay = document.getElementById("loading-overlay")
    loadingOverlay.classList.remove("hidden")

    // Small delay to show the loading animation
    setTimeout(() => {
      try {
        // Create a new window for the PDF preview
        //const printWindow = window.open("", "_blank")

        // Get all the invoice data
        const invoiceData = collectInvoiceData()

        // Create the HTML content for the PDF
        const htmlContent = createPdfHtml(invoiceData)

        // Write the HTML to the new window
        //printWindow.document.open()
        //printWindow.document.write(htmlContent)
        //printWindow.document.close()

        // Wait for the content to load, then print
        //printWindow.onload = () => {
        //  printWindow.print()
        //}
      } catch (error) {
        console.error("Error generating PDF:", error)
        alert("Error generating PDF. Please try again.")
      } finally {
        // Hide loading overlay
        loadingOverlay.classList.add("hidden")
      }
    }, 800)
  }

  // Create HTML content for the PDF
  function createPdfHtml(data) {
    const currentLanguage = document.getElementById("language-select").value

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${data.invoiceNum}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            color: #000000;
            margin: 0;
            padding: 0;
            background-color: #FFFFFF;
          }
          
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .invoice-header {
            background-color: #854836;
            color: white;
            padding: 2rem;
            position: relative;
            overflow: hidden;
          }
          
          .invoice-header::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E');
            opacity: 0.1;
          }
          
          .invoice-title-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            position: relative;
            z-index: 1;
          }
          
          .invoice-title {
            font-size: 2rem;
            font-weight: 700;
          }
          
          .invoice-number {
            text-align: right;
          }
          
          .invoice-number-label {
            font-size: 0.875rem;
            opacity: 0.9;
          }
          
          .invoice-number-value {
            font-size: 1.5rem;
            font-weight: 700;
          }
          
          .invoice-info-row {
            display: flex;
            justify-content: space-between;
            position: relative;
            z-index: 1;
          }
          
          .invoice-info-col {
            flex: 1;
          }
          
          .invoice-info-label {
            font-size: 0.875rem;
            opacity: 0.9;
            margin-bottom: 0.25rem;
          }
          
          .invoice-info-value {
            font-weight: 500;
          }
          
          .invoice-body {
            padding: 2rem;
          }
          
          .entity-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
          }
          
          .entity-col {
            flex: 1;
          }
          
          .entity-title {
            font-size: 0.875rem;
            color: #6B7280;
            margin-bottom: 0.5rem;
          }
          
          .entity-name {
            font-weight: 600;
            font-size: 1.125rem;
            margin-bottom: 0.5rem;
          }
          
          .entity-address {
            color: #4B5563;
            white-space: pre-line;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 2rem;
          }
          
          th {
            background-color: #F7F7F7;
            padding: 0.75rem;
            text-align: left;
            font-weight: 600;
            color: #374151;
            font-size: 0.875rem;
            text-transform: uppercase;
          }
          
          td {
            padding: 1rem 0.75rem;
            border-bottom: 1px solid #E5E7EB;
          }
          
          .item-description {
            width: 50%;
          }
          
          .text-right {
            text-align: right;
          }
          
          .summary-section {
            display: flex;
            justify-content: flex-end;
          }
          
          .summary-table {
            width: 350px;
          }
          
          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 4px;
            border-bottom: 1px solid #E5E7EB;
          }
          
          .summary-row.total {
            font-weight: 700;
            font-size: 1.125rem;
            border-bottom: 2px solid #E5E7EB;
          }
          
          .summary-row.balance {
            font-weight: 700;
            font-size: 1.125rem;
            color: #DC2626;
          }
          
          .notes-section {
            margin-top: 2rem;
            border-top: 1px solid #E5E7EB;
            padding-top: 1.5rem;
          }
          
          .notes-title {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #374151;
          }
          
          .notes-content {
            color: #4B5563;
            white-space: pre-line;
          }
          
          .terms-section {
            margin-top: 1.5rem;
          }
          
          .invoice-footer {
            background-color: #F7F7F7;
            padding: 1.5rem;
            text-align: center;
            color: #6B7280;
            font-size: 0.875rem;
            border-top: 1px solid #E5E7EB;
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <div class="invoice-title-row">
              <div class="invoice-title">${translations[currentLanguage]["invoice-title"]}</div>
              <div class="invoice-number">
                <div class="invoice-number-label">${translations[currentLanguage]["label-invoice-number"]}</div>
                <div class="invoice-number-value">${data.invoiceNum}</div>
              </div>
            </div>
            <div class="invoice-info-row">
              <div class="invoice-info-col">
                <div class="invoice-info-label">${translations[currentLanguage]["label-invoice-date"]}</div>
                <div class="invoice-info-value">${formatDisplayDate(data.invoiceIssueDate, currentLanguage)}</div>
              </div>
              <div class="invoice-info-col">
                <div class="invoice-info-label">${translations[currentLanguage]["label-due-date"]}</div>
                <div class="invoice-info-value">${formatDisplayDate(data.invoiceDueDate, currentLanguage)}</div>
              </div>
              ${
                data.purchaseOrder
                  ? `
              <div class="invoice-info-col">
                <div class="invoice-info-label">${translations[currentLanguage]["label-purchase-order"]}</div>
                <div class="invoice-info-value">${data.purchaseOrder}</div>
              </div>
              `
                  : ""
              }
            </div>
          </div>
          
          <div class="invoice-body">
            <div class="entity-details">
              <div class="entity-col">
                <div class="entity-title">${translations[currentLanguage]["label-biller-name"]}</div>
                <div class="entity-name">${data.billerName}</div>
                <div class="entity-address">${data.billerAddress.replace(/\n/g, "<br>")}</div>
              </div>
              <div class="entity-col">
                <div class="entity-title">${translations[currentLanguage]["label-client-name"]}</div>
                <div class="entity-name">${data.clientName}</div>
                <div class="entity-address">${data.clientAddress.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            
            <table>
              <thead>
                <tr>
                  <th class="item-description">${translations[currentLanguage]["th-item"]}</th>
                  <th>${translations[currentLanguage]["th-quantity"]}</th>
                  <th>${translations[currentLanguage]["th-rate"]}</th>
                  <th class="text-right">${translations[currentLanguage]["th-total"]}</th>
                </tr>
              </thead>
              <tbody>
                ${data.items
                  .map(
                    (item) => `
                  <tr>
                    <td class="item-description">${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>${Number.parseFloat(item.rate).toFixed(2)}</td>
                    <td class="text-right">${item.total}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
            
            <div class="summary-section">
              <div class="summary-table">
                <div class="summary-row">
                  <div>${translations[currentLanguage]["label-subtotal"]}</div>
                  <div>${data.subtotal}</div>
                </div>
                <div class="summary-row">
                  <div>${translations[currentLanguage]["label-tax"]} (${data.taxRate}%)</div>
                  <div>${data.taxAmount}</div>
                </div>
                <div class="summary-row total">
                  <div>${translations[currentLanguage]["label-total"]}</div>
                  <div style="color: #854836;">${data.total}</div>
                </div>
                <div class="summary-row">
                  <div>${translations[currentLanguage]["label-amount-paid"]}</div>
                  <div>${Number.parseFloat(data.amountPaid).toFixed(2)}</div>
                </div>
                <div class="summary-row balance">
                  <div>${translations[currentLanguage]["label-balance-due"]}</div>
                  <div style="color: #dc2626;">${data.balanceDue}</div>
                </div>
              </div>
            </div>
            
            ${
              data.notes
                ? `
            <div class="notes-section">
              <div class="notes-title">${translations[currentLanguage]["label-notes"]}</div>
              <div class="notes-content">${data.notes.replace(/\n/g, "<br>")}</div>
            </div>
            `
                : ""
            }
            
            ${
              data.terms
                ? `
            <div class="terms-section">
              <div class="notes-title">${translations[currentLanguage]["label-terms"]}</div>
              <div class="notes-content">${data.terms.replace(/\n/g, "<br>")}</div>
            </div>
            `
                : ""
            }
          </div>
          
          <div class="invoice-footer">
            ${translations[currentLanguage]["invoice-footer"]}
          </div>
        </div>
      </body>
      </html>
    `
  }

