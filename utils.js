/**
 * Utility functions for the invoice generator
 */

// Format date to YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// Format display date based on locale
function formatDisplayDate(dateString, locale) {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString(locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Add animation to element
function animateElement(element, animation, duration = 500) {
  if (!element) return

  // Remove any existing animation classes
  element.classList.remove("fade-in", "opacity-0", "translate-y-4")

  // Force a reflow to ensure the animation plays
  void element.offsetWidth

  if (animation === "fadeIn") {
    element.classList.add("fade-in")
  } else if (animation === "fadeInUp") {
    element.classList.add("opacity-0", "translate-y-4")
    setTimeout(() => {
      element.classList.add("transition-all", `duration-${duration}`)
      element.classList.remove("opacity-0", "translate-y-4")
    }, 10)
  }
}

// Format currency
function formatCurrency(amount, locale = "es-ES") {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Debounce function to improve performance
function debounce(func, wait = 300) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Generate a random invoice number
function generateInvoiceNumber() {
  const prefix = "INV-"
  const randomNum = Math.floor(1000 + Math.random() * 9000)
  return prefix + randomNum
}

// Calculate due date based on payment terms and issue date
function calculateDueDate(issueDate, terms) {
  if (!issueDate) return ""

  const date = new Date(issueDate)
  let daysToAdd = 0

  switch (terms) {
    case "immediate":
      daysToAdd = 0
      break
    case "net15":
      daysToAdd = 15
      break
    case "net30":
      daysToAdd = 30
      break
    case "net60":
      daysToAdd = 60
      break
  }

  date.setDate(date.getDate() + daysToAdd)
  return formatDate(date)
}

// Show alert message
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

// Función para actualizar el total de una fila
function updateRowTotal(row) {
  const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
  const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
  const total = quantity * rate;
  row.querySelector('.item-total').textContent = formatCurrency(total);
}

// Función para procesar datos importados
function processImportedData(data) {
  try {
    // Dividir el texto en líneas y filtrar líneas vacías
    const lines = data.split('\n').filter(line => line.trim());
    
    // Eliminar la primera línea (encabezados)
    lines.shift();
    
    // Obtener el contenedor de ítems
    const itemsBody = document.getElementById("items-body");
    if (!itemsBody) throw new Error('No se encontró el contenedor de ítems');

    // Obtener el botón de agregar artículo
    const addItemBtn = document.getElementById("add-item-btn");
    if (!addItemBtn) throw new Error('No se encontró el botón de agregar artículo');

    // Primero, crear todas las filas necesarias
    const totalRows = lines.length;
    for (let i = 0; i < totalRows - 1; i++) {
      addItemBtn.click();
    }

    // Esperar un momento para que todas las filas se creen
    setTimeout(() => {
      // Obtener todas las filas
      const rows = itemsBody.querySelectorAll("tr");
      
      // Procesar cada línea y actualizar su fila correspondiente
      lines.forEach((line, index) => {
        // Dividir la línea por tabulaciones
        const [description, date, quantity, value, unitValue] = line.split('\t');
        
        // Limpiar y formatear los datos
        const cleanDescription = description.trim();
        
        // Limpiar y formatear la cantidad, reemplazando comas por puntos
        const cleanQuantity = quantity.replace(',', '.').trim();
        const parsedQuantity = parseFloat(cleanQuantity);
        
        // Limpiar y formatear el valor, removiendo el símbolo de moneda y reemplazando comas por puntos
        const cleanValue = value.replace('$', '').replace(',', '.').trim();
        const parsedValue = parseFloat(cleanValue);
        
        // Obtener la fila correspondiente
        const row = rows[index];
        if (row) {
          // Actualizar los valores en los inputs
          const descriptionInput = row.querySelector('.item-description');
          const quantityInput = row.querySelector('.item-quantity');
          const rateInput = row.querySelector('.item-rate');
          
          if (descriptionInput) descriptionInput.value = cleanDescription;
          
          // Formatear la cantidad con 2 decimales
          if (quantityInput) {
            quantityInput.value = parsedQuantity.toFixed(2);
          }
          
          // Si tenemos valor unitario, usarlo directamente, si no, calcularlo
          if (unitValue) {
            const cleanUnitValue = unitValue.replace('$', '').replace(',', '.').trim();
            const parsedUnitValue = parseFloat(cleanUnitValue);
            if (rateInput) {
              rateInput.value = parsedUnitValue.toFixed(2);
            }
          } else {
            // Calcular el precio unitario (valor total / cantidad)
            const unitPrice = parsedValue / parsedQuantity;
            if (rateInput) {
              rateInput.value = unitPrice.toFixed(2);
            }
          }
          
          // Actualizar el total de la fila
          updateRowTotal(row);
        }
      });

      // Actualizar el total general
      let total = 0;
      rows.forEach(row => {
        const rowTotal = parseFloat(row.querySelector('.item-total').textContent.replace(/[^0-9.-]+/g, '')) || 0;
        total += rowTotal;
      });

      // Actualizar el total en el DOM
      const totalElement = document.getElementById('total-amount');
      if (totalElement) {
        totalElement.textContent = formatCurrency(total);
      }

      // Disparar el evento de cambio en los inputs para asegurar que se actualicen los totales
      const inputs = itemsBody.querySelectorAll('input');
      inputs.forEach(input => {
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
      });
    }, 500); // Dar más tiempo para que todas las filas se creen
    
    return true;
  } catch (error) {
    console.error('Error procesando datos:', error);
    throw new Error('Error al procesar los datos importados');
  }
}

// Función para mostrar el modal de importación
function showImportModal() {
  const modal = document.getElementById('import-modal');
  const importData = document.getElementById('import-data');
  const cancelBtn = document.getElementById('cancel-import');
  const confirmBtn = document.getElementById('confirm-import');

  // Mostrar el modal
  modal.classList.remove('hidden');

  // Función para cerrar el modal
  const closeModal = () => {
    modal.classList.add('hidden');
    importData.value = '';
  };

  // Event listeners
  cancelBtn.onclick = closeModal;
  confirmBtn.onclick = () => {
    try {
      const data = importData.value;
      processImportedData(data);
      
      // Mostrar mensaje de éxito
      showAlert(translations[document.getElementById('language-select').value]["import-success"], 'success');
      
      // Cerrar el modal
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      showAlert(translations[document.getElementById('language-select').value]["import-error"], 'error');
    }
  };
}

