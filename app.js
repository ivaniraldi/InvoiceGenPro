/**
 * Main application script for the invoice generator
 */

// Global state
let appInitialized = false;

// Currency symbols
const currencySymbols = {
  USD: "USD",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  ARS: "ARS",
  BRL: "R$",
  CLP: "CLP",
  COP: "COP",
  CRC: "₡",
  DOP: "DOP",
  GTQ: "Q",
  HNL: "L",
  MXN: "MXN",
  NIO: "C$",
  PAB: "B/.",
  PEN: "S/.",
  PYG: "₲",
  UYU: "UYU",
  VES: "Bs."
}

// Wait for translations to be loaded
function waitForTranslations(callback, maxAttempts = 10) {
  let attempts = 0;
  const checkTranslations = () => {
    if (typeof translations !== 'undefined' && translations) {
      callback();
      return;
    }
    attempts++;
    if (attempts < maxAttempts) {
      setTimeout(checkTranslations, 100);
    } else {
      console.error('Error: Las traducciones no se cargaron correctamente');
      showAlert('Error: Las traducciones no se cargaron correctamente. Por favor, recargue la página.');
    }
  };
  checkTranslations();
}

// Initialize the application
function initializeApp() {
  // Prevent multiple initializations
  if (appInitialized) {
    console.warn('La aplicación ya está inicializada');
    return;
  }

  // Initialize variables
  let currentLanguage = "es"
  let itemCounter = 0

  // DOM elements
  const elements = {
    languageSelect: document.getElementById("language-select"),
    invoiceNumber: document.getElementById("invoice-number"),
    invoiceNumberDisplay: document.getElementById("invoice-number-display"),
    invoiceDate: document.getElementById("invoice-date"),
    dueDate: document.getElementById("due-date"),
    paymentTerms: document.getElementById("payment-terms"),
    addItemBtn: document.getElementById("add-item-btn"),
    itemsBody: document.getElementById("items-body"),
    taxRate: document.getElementById("tax-rate"),
    amountPaid: document.getElementById("amount-paid"),
    generatePdfBtn: document.getElementById("generate-pdf-btn"),
    currency: document.getElementById("currency"),
    previewBtn: document.getElementById("preview-btn"),
    previewModal: document.getElementById("preview-modal"),
    closePreview: document.getElementById("close-preview"),
    previewContent: document.getElementById("preview-content"),
    downloadPreview: document.getElementById("download-preview"),
    pdfPreview: document.getElementById("pdf-preview"),
    issueDate: document.getElementById("issue-date"),
    billerName: document.getElementById("biller-name"),
    billerAddress: document.getElementById("biller-address"),
    clientName: document.getElementById("client-name"),
    clientAddress: document.getElementById("client-address")
  }

  // Initialize the application
  function init() {
    try {
      // Set today's date as default for invoice date
      const today = new Date()
      if (elements.invoiceDate) {
        elements.invoiceDate.value = formatDate(today)
      }

      // Set invoice number to 1
      if (elements.invoiceNumber) {
        elements.invoiceNumber.value = "1"
      }
      if (elements.invoiceNumberDisplay) {
        elements.invoiceNumberDisplay.textContent = "1"
      }

      // Set up event listeners
      setupEventListeners()

      // Apply initial language
      applyLanguage(currentLanguage)

      // Add initial item row
      addItemRow()

      // Calculate initial totals
      calculateTotals()

      // Add animation to the invoice container
      const invoiceContainer = document.querySelector(".invoice-container")
      if (invoiceContainer) {
        animateElement(invoiceContainer, "fadeInUp")
      }

      // Load saved data
      loadSavedData()

      // Mark as initialized
      appInitialized = true;
    } catch (error) {
      console.error('Error al inicializar la aplicación:', error)
      showAlert('Error al inicializar la aplicación. Por favor, recargue la página.')
    }
  }

  // Set up event listeners
  function setupEventListeners() {
    // Language change
    if (elements.languageSelect) {
      elements.languageSelect.addEventListener("change", function () {
        currentLanguage = this.value
        applyLanguage(currentLanguage)
      })
    }

    // Import data button
    const importDataBtn = document.getElementById("import-data-btn")
    if (importDataBtn) {
      importDataBtn.addEventListener("click", function() {
        console.log("Botón de importar datos clickeado");
        showImportModal();
      })
    } else {
      console.error("No se encontró el botón de importar datos");
    }

    // Add item button
    if (elements.addItemBtn) {
      elements.addItemBtn.addEventListener("click", addItemRow)
    }

    // Issue date change
    if (elements.issueDate) {
      elements.issueDate.addEventListener("change", function () {
        const issueDate = this.value
        if (issueDate) {
          // Actualizar la fecha de emisión
          elements.issueDate.value = issueDate
        }
      })
    }

    // Due date change
    if (elements.dueDate) {
      elements.dueDate.addEventListener("change", function () {
        const dueDate = this.value
        if (dueDate) {
          // Actualizar la fecha de vencimiento
          elements.dueDate.value = dueDate
        }
      })
    }

    // Payment terms change
    if (elements.paymentTerms) {
      elements.paymentTerms.addEventListener("change", updateDueDate)
    }

    // Tax rate change
    if (elements.taxRate) {
      elements.taxRate.addEventListener("input", debounce(calculateTotals, 300))
    }

    // Amount paid change
    if (elements.amountPaid) {
      elements.amountPaid.addEventListener("input", debounce(calculateTotals, 300))
    }

    // Invoice number change
    if (elements.invoiceNumber && elements.invoiceNumberDisplay) {
      elements.invoiceNumber.addEventListener("input", function () {
        elements.invoiceNumberDisplay.textContent = this.value
      })
    }

    // Currency change
    if (elements.currency) {
      elements.currency.addEventListener("change", () => {
        calculateTotals()
        updatePreview()
      })
    }

    // Preview button
    if (elements.previewBtn) {
      elements.previewBtn.addEventListener("click", showPdfPreview)
    }

    // Close preview button
    if (elements.closePreview) {
      elements.closePreview.addEventListener("click", hidePreview)
    }

    // Download preview button
    if (elements.downloadPreview) {
      elements.downloadPreview.addEventListener("click", () => {
        const previewContent = elements.previewContent.querySelector('.invoice-container')
        if (previewContent) {
          const opt = {
            margin: 1,
            filename: `invoice-${elements.invoiceNumber.value}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
          }
          html2pdf().set(opt).from(previewContent).save()
        }
      })
    }

    // Close preview on click outside
    if (elements.previewModal) {
      elements.previewModal.addEventListener("click", (e) => {
        if (e.target === elements.previewModal) {
          hidePreview()
        }
      })
    }

    // Agregar event listeners para los campos de emisor y cliente
    const billerFields = ["biller-name", "biller-address"];
    const clientFields = ["client-name", "client-address"];

    billerFields.forEach(fieldId => {
      const element = document.getElementById(fieldId);
      if (element) {
        element.addEventListener("input", debounce(saveBillerAndClientData, 500));
      }
    });

    clientFields.forEach(fieldId => {
      const element = document.getElementById(fieldId);
      if (element) {
        element.addEventListener("input", debounce(saveBillerAndClientData, 500));
      }
    });
  }

  // Apply language to all elements
  function applyLanguage(lang) {
    if (!translations[lang]) return

    // Update page title
    const pageTitle = document.getElementById("page-title")
    if (pageTitle && translations[lang]["page-title"]) {
      pageTitle.textContent = translations[lang]["page-title"]
    }

    // Update all elements with translations
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.getAttribute("data-translate")
      if (translations[lang][key]) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.placeholder = translations[lang][key]
        } else if (element.tagName === "SPAN") {
          element.textContent = translations[lang][key]
        } else {
          // Para elementos que no son input, textarea o span, solo actualizar el texto
          const icon = element.querySelector('i')
          if (icon) {
            // Si tiene un icono, mantener el icono y actualizar solo el texto
            const textSpan = element.querySelector('span[data-translate]')
            if (textSpan) {
              textSpan.textContent = translations[lang][key]
            }
          } else {
            element.textContent = translations[lang][key]
          }
        }
      }
    })

    // Update button text
    if (elements.addItemBtn) {
      const icon = elements.addItemBtn.querySelector('i')
      const textSpan = elements.addItemBtn.querySelector('span[data-translate]')
      if (textSpan) {
        textSpan.textContent = translations[lang]["add-item-btn"] || "Add Item"
      }
    }

    if (elements.generatePdfBtn) {
      const icon = elements.generatePdfBtn.querySelector('i')
      const textSpan = elements.generatePdfBtn.querySelector('span[data-translate]')
      if (textSpan) {
        textSpan.textContent = translations[lang]["generate-pdf-btn"] || "Generate PDF"
      }
    }

    // Update PDF options text
    const downloadPdfBtn = document.getElementById("download-pdf")
    if (downloadPdfBtn) {
      const icon = downloadPdfBtn.querySelector('i')
      const textSpan = downloadPdfBtn.querySelector('span[data-translate]')
      if (textSpan) {
        textSpan.textContent = translations[lang]["download-pdf-btn"] || "Download PDF"
      }
    }

    const printPdfBtn = document.getElementById("print-pdf")
    if (printPdfBtn) {
      const icon = printPdfBtn.querySelector('i')
      const textSpan = printPdfBtn.querySelector('span[data-translate]')
      if (textSpan) {
        textSpan.textContent = translations[lang]["print-pdf-btn"] || "Print"
      }
    }

    // Update delete buttons
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.textContent = translations[lang]["delete-btn"] || "Delete"
    })

    // Update placeholders for existing item rows
    document.querySelectorAll(".item-description").forEach((input) => {
      input.placeholder = translations[lang]["item-placeholder"] || "Item description"
    })
  }

  // Add a new item row
  function addItemRow() {
    const currency = elements.currency.value;
    const symbol = currencySymbols[currency] || currency;
    
    const row = document.createElement("tr")
    row.className = "item-row fade-in"
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
        <input type="text" class="item-description block w-full rounded-md border-gray-300 shadow-sm input-focus input-transition" data-translate="item-placeholder" placeholder="Descripción del artículo">
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <input type="number" class="item-quantity block w-full rounded-md border-gray-300 shadow-sm input-focus input-transition" min="1" value="1">
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <input type="number" class="item-rate block w-full rounded-md border-gray-300 shadow-sm input-focus input-transition" min="0" step="0.01" value="0.00" placeholder="0.00 ${symbol}">
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="item-total">0.00 ${symbol}</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <button class="delete-btn text-red-600 hover:text-red-800" data-translate="delete-btn">Eliminar</button>
      </td>
    `

    // Add event listeners to the new row
    const inputs = row.querySelectorAll("input")
    inputs.forEach((input) => {
      input.addEventListener("input", () => updateRowTotal(row))
    })

    const deleteBtn = row.querySelector(".delete-btn")
    deleteBtn.addEventListener("click", () => deleteRow(row))

    // Add the row to the table
    elements.itemsBody.appendChild(row)

    // Calculate totals
    calculateTotals()
  }

  // Update the total for a single row
  function updateRowTotal(row) {
    const quantity = parseFloat(row.querySelector(".item-quantity").value) || 0
    const rate = parseFloat(row.querySelector(".item-rate").value) || 0
    const total = quantity * rate
    const currency = elements.currency.value
    const symbol = currencySymbols[currency] || currency
    row.querySelector(".item-total").textContent = total.toFixed(2) + " " + symbol
    calculateTotals()
  }

  // Delete a row
  function deleteRow(row) {
    row.remove()
    calculateTotals()
  }

  // Calculate all totals
  function calculateTotals() {
    let subtotal = 0
    document.querySelectorAll(".item-row").forEach((row) => {
      const total = parseFloat(row.querySelector(".item-total").textContent) || 0
      subtotal += total
    })

    const taxRate = parseFloat(elements.taxRate.value) || 0
    const tax = subtotal * (taxRate / 100)
    const total = subtotal + tax
    const amountPaid = parseFloat(elements.amountPaid.value) || 0
    const balanceDue = total - amountPaid

    const currency = elements.currency.value
    const symbol = currencySymbols[currency] || currency

    // Update the display
    document.getElementById("subtotal").textContent = subtotal.toFixed(2) + " " + symbol
    document.getElementById("tax").textContent = tax.toFixed(2) + " " + symbol
    document.getElementById("total").textContent = total.toFixed(2) + " " + symbol
    document.getElementById("balance-due").textContent = balanceDue.toFixed(2) + " " + symbol

    // Update preview if visible
    if (elements.previewModal && !elements.previewModal.classList.contains("hidden")) {
      updatePreview()
    }
  }

  // Format date for input field
  function formatDate(date) {
    try {
      if (!(date instanceof Date) || isNaN(date)) {
        console.warn('Fecha inválida proporcionada a formatDate')
        return ''
      }
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      return `${year}-${month}-${day}`
    } catch (error) {
      console.error('Error al formatear la fecha:', error)
      return ''
    }
  }

  // Generate a unique invoice number
  function generateInvoiceNumber() {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
    return `INV-${year}${month}-${random}`
  }

  // Add animation to an element
  function animateElement(element, animationName) {
    element.classList.add(animationName)
    setTimeout(() => {
      element.classList.remove(animationName)
    }, 1000)
  }

  // Calculate due date based on payment terms
  function updateDueDate() {
    try {
      const invoiceDateInput = elements.invoiceDate
      const paymentTerms = elements.paymentTerms.value
      
      if (!invoiceDateInput || !invoiceDateInput.value) {
        console.warn('No hay fecha de factura seleccionada')
        return
      }

      const invoiceDate = new Date(invoiceDateInput.value)
      if (isNaN(invoiceDate.getTime())) {
        console.warn('Fecha de factura inválida')
        return
      }

      const dueDate = calculateDueDate(invoiceDate, paymentTerms)
      if (elements.dueDate) {
        elements.dueDate.value = formatDate(dueDate)
      }
    } catch (error) {
      console.error('Error al actualizar la fecha de vencimiento:', error)
      showAlert('Error al calcular la fecha de vencimiento. Por favor, inténtelo de nuevo.')
    }
  }

  // Calculate due date based on payment terms
  function calculateDueDate(invoiceDate, paymentTerms) {
    const date = new Date(invoiceDate)
    switch (paymentTerms) {
      case "net15":
        date.setDate(date.getDate() + 15)
        break
      case "net30":
        date.setDate(date.getDate() + 30)
        break
      case "net60":
        date.setDate(date.getDate() + 60)
        break
      default:
        // Immediate payment
        break
    }
    return date
  }

  // Debounce function to limit the rate of function calls
  function debounce(func, delay) {
    let timeoutId
    return function (...args) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(this, args), delay)
    }
  }

  // Show preview modal
  function showPreview() {
    if (elements.previewModal) {
      elements.previewModal.classList.remove("hidden")
      elements.previewModal.classList.add("flex")
      updatePreview()
    }
  }

  // Hide preview modal
  function hidePreview() {
    if (elements.previewModal) {
      elements.previewModal.classList.add("hidden")
      elements.previewModal.classList.remove("flex")
    }
  }

  // Update preview content
  function updatePreview() {
    if (!elements.previewContent) return

    // Clone the invoice container
    const invoiceContainer = document.querySelector(".invoice-container")
    if (!invoiceContainer) return

    const previewClone = invoiceContainer.cloneNode(true)
    
    // Remove interactive elements from preview
    previewClone.querySelectorAll("input, select, button").forEach(el => {
      if (el.id !== "generate-pdf-btn") {
        el.replaceWith(document.createTextNode(el.value || el.textContent))
      }
    })

    // Update currency symbols in preview
    const currency = elements.currency.value
    const symbol = currencySymbols[currency] || currency
    
    previewClone.querySelectorAll(".item-total, #subtotal, #tax, #total, #balance-due").forEach(el => {
      const amount = parseFloat(el.textContent)
      if (!isNaN(amount)) {
        el.textContent = amount.toFixed(2) + " " + symbol
      }
    })

    // Clear and update preview content
    elements.previewContent.innerHTML = ""
    elements.previewContent.appendChild(previewClone)
  }

  // Función para mostrar la vista previa del PDF
  function showPdfPreview() {
    try {
      // Recopilar datos de la factura
      const invoiceData = collectInvoiceData();
      if (!invoiceData) {
        return;
      }

      // Crear el contenido del PDF
      const pdfContent = createPdfContent();
      if (!pdfContent) {
        return;
      }

      // Mostrar el modal
      elements.previewModal.classList.remove("hidden");
      elements.previewModal.classList.add("flex");

      // Actualizar la vista previa del PDF
      const pdfPreview = elements.pdfPreview.querySelector('div:last-child');
      if (pdfPreview) {
        pdfPreview.innerHTML = '';
        pdfPreview.appendChild(pdfContent);
      }
    } catch (error) {
      console.error("Error al generar la vista previa:", error);
      showAlert("Hubo un error al generar la vista previa. Por favor, inténtelo de nuevo.");
    }
  }

  // Función para guardar datos en localStorage y cookies
  function saveBillerAndClientData() {
    const billerData = {
      name: elements.billerName.value,
      address: elements.billerAddress.value
    };
    
    const clientData = {
      name: elements.clientName.value,
      address: elements.clientAddress.value
    };

    // Guardar en localStorage
    localStorage.setItem("billerData", JSON.stringify(billerData));
    localStorage.setItem("clientData", JSON.stringify(clientData));

    // Guardar en cookies (expiran en 1 año)
    const cookieOptions = "path=/; max-age=31536000; SameSite=Strict";
    document.cookie = `billerData=${JSON.stringify(billerData)}; ${cookieOptions}`;
    document.cookie = `clientData=${JSON.stringify(clientData)}; ${cookieOptions}`;
  }

  // Función para recuperar datos guardados
  function loadSavedData() {
    // Intentar recuperar de localStorage primero
    let billerData = localStorage.getItem("billerData");
    let clientData = localStorage.getItem("clientData");

    // Si no hay datos en localStorage, intentar recuperar de cookies
    if (!billerData || !clientData) {
      const cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'billerData') {
          billerData = value;
        } else if (name === 'clientData') {
          clientData = value;
        }
      });
    }

    // Si se encontraron datos, llenar los campos
    if (billerData) {
      const biller = JSON.parse(billerData);
      elements.billerName.value = biller.name;
      elements.billerAddress.value = biller.address;
    }

    if (clientData) {
      const client = JSON.parse(clientData);
      elements.clientName.value = client.name;
      elements.clientAddress.value = client.address;
    }
  }

  // Initialize the application
  init()
}

// Wait for DOM and translations to be ready
function waitForDependencies() {
  let attempts = 0;
  const maxAttempts = 10;
  
  const checkDependencies = () => {
    if (document.readyState === 'complete' && typeof translations !== 'undefined' && translations) {
      initializeApp();
      return;
    }
    
    attempts++;
    if (attempts < maxAttempts) {
      setTimeout(checkDependencies, 100);
    } else {
      console.error('Error: No se pudieron cargar las dependencias necesarias');
      showAlert('Error al cargar la aplicación. Por favor, recargue la página.');
    }
  };
  
  checkDependencies();
}

// Start the application
waitForDependencies();

// Función para actualizar los símbolos de moneda en toda la factura
function updateCurrencySymbols() {
    const currency = document.getElementById("currency").value;
    const symbol = currencySymbols[currency] || currency;
    
    // Actualizar los totales
    const subtotal = document.getElementById("subtotal");
    const tax = document.getElementById("tax");
    const total = document.getElementById("total");
    const balanceDue = document.getElementById("balance-due");
    
    if (subtotal) subtotal.textContent = `${subtotal.textContent.split(" ")[0]} ${symbol}`;
    if (tax) tax.textContent = `${tax.textContent.split(" ")[0]} ${symbol}`;
    if (total) total.textContent = `${total.textContent.split(" ")[0]} ${symbol}`;
    if (balanceDue) balanceDue.textContent = `${balanceDue.textContent.split(" ")[0]} ${symbol}`;
    
    // Actualizar los totales de los items
    document.querySelectorAll(".item-total").forEach(total => {
        total.textContent = `${total.textContent.split(" ")[0]} ${symbol}`;
    });
    
    // Actualizar los inputs de tasa
    document.querySelectorAll(".item-rate").forEach(rate => {
        rate.value = rate.value.split(" ")[0];
        rate.placeholder = `0.00 ${symbol}`;
    });
}

// Función para calcular los totales con el símbolo de moneda correcto
function calculateTotals() {
    const currency = document.getElementById("currency").value;
    const symbol = currencySymbols[currency] || currency;
    
    let subtotal = 0;
    document.querySelectorAll(".item-row").forEach(row => {
        const quantity = parseFloat(row.querySelector(".item-quantity").value) || 0;
        const rate = parseFloat(row.querySelector(".item-rate").value) || 0;
        const total = quantity * rate;
        subtotal += total;
        
        const totalElement = row.querySelector(".item-total");
        totalElement.textContent = `${total.toFixed(2)} ${symbol}`;
    });
    
    const taxRate = parseFloat(document.getElementById("tax-rate").value) || 0;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;
    const amountPaid = parseFloat(document.getElementById("amount-paid").value) || 0;
    const balanceDue = total - amountPaid;
    
    document.getElementById("subtotal").textContent = `${subtotal.toFixed(2)} ${symbol}`;
    document.getElementById("tax").textContent = `${tax.toFixed(2)} ${symbol}`;
    document.getElementById("total").textContent = `${total.toFixed(2)} ${symbol}`;
    document.getElementById("balance-due").textContent = `${balanceDue.toFixed(2)} ${symbol}`;
}

// Función para agregar una fila de item con el símbolo de moneda correcto
function addItemRow() {
    const currency = document.getElementById("currency").value;
    const symbol = currencySymbols[currency] || currency;
    
    const itemsContainer = document.getElementById("items-container");
    const itemRow = document.createElement("div");
    itemRow.className = "item-row grid grid-cols-1 md:grid-cols-4 gap-4 mb-4";
    
    itemRow.innerHTML = `
        <div>
            <input type="text" class="item-description w-full rounded-md border-gray-300 shadow-sm input-focus input-transition" placeholder="Descripción">
        </div>
        <div>
            <input type="number" class="item-quantity w-full rounded-md border-gray-300 shadow-sm input-focus input-transition" value="1" min="0" step="1">
        </div>
        <div>
            <input type="number" class="item-rate w-full rounded-md border-gray-300 shadow-sm input-focus input-transition" value="0.00" min="0" step="0.01" placeholder="0.00 ${symbol}">
        </div>
        <div class="flex items-center justify-between">
            <span class="item-total text-lg font-semibold">0.00 ${symbol}</span>
            <button class="remove-item text-red-500 hover:text-red-700" onclick="removeItemRow(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    itemsContainer.appendChild(itemRow);
    
    // Agregar event listeners
    const quantityInput = itemRow.querySelector(".item-quantity");
    const rateInput = itemRow.querySelector(".item-rate");
    
    quantityInput.addEventListener("input", calculateTotals);
    rateInput.addEventListener("input", calculateTotals);
}

// Event listener para el cambio de moneda
document.getElementById("currency").addEventListener("change", updateCurrencySymbols);

