// Translations for the invoice generator
const translations = {
  // Spanish translations
  es: {
    "page-title": "InvoiceGen Pro - Generador de Facturas Profesionales",
    "invoice-title": "Factura",
    "app-title": "Factura",
    "label-biller-name": "Datos del emisor",
    "label-biller-address": "Dirección",
    "label-client-name": "Datos del cliente",
    "label-client-address": "Dirección",
    "label-invoice-number": "Factura #",
    "label-invoice-date": "Fecha de emisión",
    "label-payment-terms": "Condiciones de pago",
    "option-immediate": "Al contado",
    "option-net15": "15 días",
    "option-net30": "30 días",
    "option-net60": "60 días",
    "label-due-date": "Fecha de vencimiento",
    "label-purchase-order": "Orden de compra (opcional)",
    "items-title": "Artículos",
    "th-item": "Artículo",
    "th-quantity": "Cantidad",
    "th-rate": "Precio unitario",
    "th-total": "Total",
    "th-actions": "Acciones",
    "add-item-btn": "Agregar artículo",
    "label-notes": "Notas",
    "label-terms": "Términos y condiciones",
    "label-subtotal": "Subtotal",
    "label-tax": "Impuesto",
    "label-total": "Total",
    "label-amount-paid": "Cantidad pagada",
    "label-balance-due": "Saldo adeudado",
    "generate-pdf-btn": "Generar PDF",
    "download-pdf-btn": "Descargar PDF",
    "print-pdf-btn": "Imprimir",
    "footer-text": "Desarrollado con ❤️ por",
    "delete-btn": "Eliminar",
    "item-placeholder": "Descripción del producto o servicio",
    "notes-placeholder": "Observaciones adicionales",
    "terms-placeholder": "Términos y condiciones de la factura",
    "biller-name-placeholder": "Tu nombre o empresa",
    "biller-address-placeholder": "Tu dirección completa",
    "client-name-placeholder": "Nombre del cliente o empresa",
    "client-address-placeholder": "Dirección completa del cliente",
    "how-it-works": "¿Cómo funciona?",
    "step1-title": "Completa los datos",
    "step1-desc": "Ingresa la información de tu empresa, cliente y los detalles de la factura.",
    "step2-title": "Agrega los artículos",
    "step2-desc": "Añade todos los productos o servicios con sus cantidades y precios.",
    "step3-title": "Genera tu PDF",
    "step3-desc": "Descarga tu factura profesional lista para enviar a tus clientes.",
    "app-tagline": "Genera facturas profesionales en segundos",
    "invoice-footer": "Documento generado electrónicamente",
    "generating-pdf": "Generando PDF...",
    "summary-title": "Resumen",
    "import-data-btn": "Importar Datos",
    "import-modal-title": "Importar Datos",
    "cancel-btn": "Cancelar",
    "confirm-btn": "Confirmar",
    "import-success": "Datos importados correctamente",
    "import-error": "Error al importar los datos",
    "preview-btn": "Vista Previa",
    "preview-title": "Vista Previa de la Factura",
    "preview-download": "Descargar PDF",
    "preview-close": "Cerrar",
    "ia-modal-title": "Procesar con IA",
    "process-btn": "Procesar",
    "ia-input-placeholder": "Pega aquí tus datos...",
    "ia-success": "Datos procesados y copiados al portapapeles",
    "ia-error": "Error al procesar los datos",
    "ia-empty": "Por favor, ingresa los datos a procesar",
    "ia-process-btn": "Procesar con IA",
    "ia-modal-description": "Pega los datos en el área de texto y haz clic en Procesar. Luego, copia el resultado y pégalo en el botón \"Importar Datos\".",
    "ia-output-title": "Resultado procesado:",
    "copy-btn": "Copiar",
    "experimental-title": "Funciones Experimentales",
    "experimental-badge": "En desarrollo",
    "experimental-subtitle": "Importación de Datos con IA",
    "experimental-description": "Esta función está en fase de desarrollo y puede no funcionar como se espera. Por favor, verifica los datos antes de generar la factura.",
    "experimental-instructions": "Instrucciones de uso:",
    "experimental-step1": "Copia los datos de la factura en cualquier formato, preferiblemente en formato tabla.",
    "experimental-step2": "Pega los datos en el botón \"Procesar con IA\" y espera el resultado.",
    "experimental-step3": "Copia los datos procesados con el botón mostrado.",
    "experimental-step4": "Inserta los datos en el botón \"Importar Datos\" y procesa.",
    "experimental-note": "Nota: Esta función solo sirve para rellenar los artículos de la factura y realizará cálculos matemáticos para ajustar los campos. Por favor, verifica los datos antes de enviar la factura.",
  },

  // Portuguese translations
  pt: {
    "page-title": "InvoiceGen Pro - Gerador de Faturas Profissionais",
    "invoice-title": "Fatura",
    "app-title": "Fatura",
    "label-biller-name": "Dados do emissor",
    "label-biller-address": "Endereço",
    "label-client-name": "Dados do cliente",
    "label-client-address": "Endereço",
    "label-invoice-number": "Fatura #",
    "label-invoice-date": "Data de emissão",
    "label-payment-terms": "Condições de pagamento",
    "option-immediate": "À vista",
    "option-net15": "15 dias",
    "option-net30": "30 dias",
    "option-net60": "60 dias",
    "label-due-date": "Data de vencimento",
    "label-purchase-order": "Ordem de compra (opcional)",
    "items-title": "Itens",
    "th-item": "Item",
    "th-quantity": "Quantidade",
    "th-rate": "Preço unitário",
    "th-total": "Total",
    "th-actions": "Ações",
    "add-item-btn": "Adicionar item",
    "label-notes": "Notas",
    "label-terms": "Termos e condições",
    "label-subtotal": "Subtotal",
    "label-tax": "Imposto",
    "label-total": "Total",
    "label-amount-paid": "Valor pago",
    "label-balance-due": "Saldo devedor",
    "generate-pdf-btn": "Gerar PDF",
    "download-pdf-btn": "Baixar PDF",
    "print-pdf-btn": "Imprimir",
    "footer-text": "Desenvolvido com ❤️ por",
    "delete-btn": "Excluir",
    "item-placeholder": "Descrição do produto ou serviço",
    "notes-placeholder": "Observações adicionais",
    "terms-placeholder": "Termos e condições da fatura",
    "biller-name-placeholder": "Seu nome ou empresa",
    "biller-address-placeholder": "Seu endereço completo",
    "client-name-placeholder": "Nome do cliente ou empresa",
    "client-address-placeholder": "Endereço completo do cliente",
    "how-it-works": "Como funciona?",
    "step1-title": "Preencha os dados",
    "step1-desc": "Insira as informações da sua empresa, cliente e os detalhes da fatura.",
    "step2-title": "Adicione os itens",
    "step2-desc": "Adicione todos os produtos ou serviços com suas quantidades e preços.",
    "step3-title": "Gere seu PDF",
    "step3-desc": "Baixe sua fatura profissional pronta para enviar aos seus clientes.",
    "app-tagline": "Gere faturas profissionais em segundos",
    "invoice-footer": "Documento gerado eletronicamente",
    "generating-pdf": "Gerando PDF...",
    "summary-title": "Resumo",
    "import-data-btn": "Importar Dados",
    "import-modal-title": "Importar Dados",
    "cancel-btn": "Cancelar",
    "confirm-btn": "Confirmar",
    "import-success": "Dados importados com sucesso",
    "import-error": "Erro ao importar os dados",
    "preview-btn": "Pré-visualizar",
    "preview-title": "Pré-visualização da Fatura",
    "preview-download": "Baixar PDF",
    "preview-close": "Fechar",
    "ia-modal-title": "Processar com IA",
    "process-btn": "Processar",
    "ia-input-placeholder": "Cole seus dados aqui...",
    "ia-success": "Dados processados e copiados para a área de transferência",
    "ia-error": "Erro ao processar os dados",
    "ia-empty": "Por favor, insira os dados para processar",
    "ia-process-btn": "Processar com IA",
    "ia-modal-description": "Cole os dados na área de texto e clique em Processar. Em seguida, copie o resultado e cole-o no botão \"Importar Dados\".",
    "ia-output-title": "Resultado processado:",
    "copy-btn": "Copiar",
    "experimental-title": "Funções Experimentais",
    "experimental-badge": "Em desenvolvimento",
    "experimental-subtitle": "Importação de Dados com IA",
    "experimental-description": "Esta função está em fase de desenvolvimento e pode não funcionar como esperado. Por favor, verifique os dados antes de gerar a fatura.",
    "experimental-instructions": "Instruções de uso:",
    "experimental-step1": "Copie os dados da fatura em qualquer formato, preferencialmente em formato de tabela.",
    "experimental-step2": "Cole os dados no botão \"Processar com IA\" e aguarde o resultado.",
    "experimental-step3": "Copie os dados processados com o botão mostrado.",
    "experimental-step4": "Insira os dados no botão \"Importar Dados\" e processe.",
    "experimental-note": "Nota: Esta função serve apenas para preencher os itens da fatura e realizará cálculos matemáticos para ajustar os campos. Por favor, verifique os dados antes de enviar a fatura.",
  },

  // English translations
  en: {
    "page-title": "InvoiceGen Pro - Professional Invoice Generator",
    "invoice-title": "Invoice",
    "app-title": "Invoice",
    "label-biller-name": "From",
    "label-biller-address": "Address",
    "label-client-name": "Bill To",
    "label-client-address": "Address",
    "label-invoice-number": "Invoice #",
    "label-invoice-date": "Issue Date",
    "label-payment-terms": "Payment Terms",
    "option-immediate": "Immediate",
    "option-net15": "Net 15",
    "option-net30": "Net 30",
    "option-net60": "Net 60",
    "label-due-date": "Due Date",
    "label-purchase-order": "Purchase Order (optional)",
    "items-title": "Items",
    "th-item": "Item",
    "th-quantity": "Quantity",
    "th-rate": "Unit Price",
    "th-total": "Total",
    "th-actions": "Actions",
    "add-item-btn": "Add Item",
    "label-notes": "Notes",
    "label-terms": "Terms & Conditions",
    "label-subtotal": "Subtotal",
    "label-tax": "Tax",
    "label-total": "Total",
    "label-amount-paid": "Amount Paid",
    "label-balance-due": "Balance Due",
    "generate-pdf-btn": "Generate PDF",
    "download-pdf-btn": "Download PDF",
    "print-pdf-btn": "Print",
    "footer-text": "Developed with ❤️ by",
    "delete-btn": "Delete",
    "item-placeholder": "Product or service description",
    "notes-placeholder": "Additional notes",
    "terms-placeholder": "Invoice terms and conditions",
    "biller-name-placeholder": "Your name or company",
    "biller-address-placeholder": "Your complete address",
    "client-name-placeholder": "Client name or company",
    "client-address-placeholder": "Client's complete address",
    "how-it-works": "How it works?",
    "step1-title": "Fill in the details",
    "step1-desc": "Enter your company information, client details, and invoice information.",
    "step2-title": "Add your items",
    "step2-desc": "Add all products or services with their quantities and prices.",
    "step3-title": "Generate your PDF",
    "step3-desc": "Download your professional invoice ready to send to your clients.",
    "app-tagline": "Generate professional invoices in seconds",
    "invoice-footer": "Electronically generated document",
    "generating-pdf": "Generating PDF...",
    "summary-title": "Summary",
    "import-data-btn": "Import Data",
    "import-modal-title": "Import Data",
    "cancel-btn": "Cancel",
    "confirm-btn": "Confirm",
    "import-success": "Data imported successfully",
    "import-error": "Error importing data",
    "preview-btn": "Preview",
    "preview-title": "Invoice Preview",
    "preview-download": "Download PDF",
    "preview-close": "Close",
    "ia-modal-title": "Process with AI",
    "process-btn": "Process",
    "ia-input-placeholder": "Paste your data here...",
    "ia-success": "Data processed and copied to clipboard",
    "ia-error": "Error processing data",
    "ia-empty": "Please enter data to process",
    "ia-process-btn": "Process with AI",
    "ia-modal-description": "Paste the data in the text area and click Process. Then, copy the result and paste it in the \"Import Data\" button.",
    "ia-output-title": "Processed result:",
    "copy-btn": "Copy",
    "experimental-title": "Experimental Features",
    "experimental-badge": "In development",
    "experimental-subtitle": "Data Import with AI",
    "experimental-description": "This feature is under development and may not work as expected. Please verify the data before generating the invoice.",
    "experimental-instructions": "Usage instructions:",
    "experimental-step1": "Copy the invoice data in any format, preferably in table format.",
    "experimental-step2": "Paste the data in the \"Process with AI\" button and wait for the result.",
    "experimental-step3": "Copy the processed data with the shown button.",
    "experimental-step4": "Insert the data in the \"Import Data\" button and process.",
    "experimental-note": "Note: This function only serves to fill in the invoice items and will perform mathematical calculations to adjust the fields. Please verify the data before sending the invoice.",
  },
}

