const name = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
// Configuración de Gemini AI

// Función para listar modelos disponibles
const description = 'AIzaSyDSIiHrZbniajYLcLX4stj7MEjSCxY0XaM'; // KEY RESTRINGIDA, NO FUNCIONA EN PRODUCCIÓN
async function listAvailableModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${description}`);
        if (!response.ok) {
            throw new Error('Error al obtener la lista de modelos');
        }
        const data = await response.json();
        console.log('Modelos disponibles:', data);
        return data;
    } catch (error) {
        console.error('Error al listar modelos:', error);
        throw error;
    }
}

// Función para procesar datos con Gemini AI
async function processDataWithAI(inputData) {
    try {
        const prompt_base = `
        Recibirás un correo electrónico con una tabla que contiene información financiera o de transacciones. La tabla puede incluir columnas con etiquetas como Descripción, Servicio Prestado, Actividad, Evento, Fecha, Fecha de Ejecución, Fecha Realización, Cantidad, Unidades, Precio Unitario, Costo Unitario, Subtotal, Valor Total, Total, u otras similares. Los valores pueden estar expresados en cualquier moneda (USD, CLP, EUR, etc.), pero se deben tratar como USD. Este prompt ha sido optimizado para que tanto las IA modernas como las antiguas lo procesen sin inconvenientes, garantizando compatibilidad y precisión en la extracción de datos.
        
        Tu tarea es extraer los datos relevantes y devolverlos en el siguiente formato, sin ningún texto adicional:
        
        DESCRIPCIÓN	FECHA	CANTIDAD	VALOR	VALOR UNITARIO
        [Descripción en mayúsculas]	[Fecha en formato d/m/yyyy]	[Cantidad con dos decimales]	$ [Valor total con dos decimales]	$ [Valor unitario con dos decimales]
        
        Reglas a seguir:
        
        1. DESCRIPCIÓN:
           - Utiliza la columna que contenga Descripción, Servicio Prestado, Actividad, Evento o similar.
           - Convierte el contenido a mayúsculas.
        
        2. FECHA:
           - Utiliza la columna Fecha, Fecha de Ejecución, Fecha Realización o equivalente.
           - Transforma la fecha al formato d/m/yyyy (por ejemplo, "02/04/2025" se convierte en "2/4/2025").
        
        3. CANTIDAD:
           - Si existe una columna llamada Cantidad o Unidades, utilízala directamente.
           - Si no existe Cantidad pero sí existen Subtotal y Precio Unitario (o Costo Unitario), calcula:
             Cantidad = Subtotal / Precio Unitario
           - Si no se dispone de datos para calcular la cantidad, asume 1,00.
           - Asegúrate de que la cantidad se muestre siempre con dos decimales (ejemplo: 3 se debe mostrar como 3,00).
        
        4. VALOR:
           - Utiliza la columna Valor Total, Subtotal o Total, según corresponda a cada fila.
           - Si no se dispone de Valor Total pero existen Precio Unitario y Cantidad, calcula:
             Valor = Precio Unitario × Cantidad
           - Precede el valor con el símbolo de dólar ($) y asegúrate de que tenga dos decimales (por ejemplo, 750.000 se muestra como 750.000,00).
        
        5. VALOR UNITARIO:
           - Si existen tanto Cantidad (o Unidades) como Valor Total, calcula el valor unitario dividiendo el Valor Total entre la Cantidad.
           - Si no se puede calcular, utiliza la columna Precio Unitario o Costo Unitario, si está disponible.
           - Precede el valor unitario con el símbolo de dólar ($) y asegúrate de que se muestre con dos decimales.
        
        6. Conversión de decimales:
           - Realiza los cálculos sin que los decimales afecten la precisión.
           - Utiliza internamente el punto (.) como separador decimal en los cálculos y, si es necesario, convierte la salida para mostrar dos decimales con coma (,) de forma consistente.
        
        Exclusiones:
        - No incluyas filas de totales generales (por ejemplo, filas con el encabezado Total al final de la tabla).
        - No agregues encabezados ni texto explicativo en la salida; solo incluye las líneas de datos en el formato especificado.
        
        Ejemplo de entrada y salida:
        
        Ejemplo de Entrada (caso en EUR):
        Evento | Unidades | Fecha Realización | Costo por Evento (EUR) | Total (EUR)
        ---------------------------------------------------------------------------
        Conferencia Tech 2025 (E601) | 2 | 05/06/2025 | 800 | 1.600
        Workshop de Marketing (E602) | 3 | 12/06/2025 | 400 | 1.200
        Networking Empresarial (E603) | 1 | 19/06/2025 | 500 | 500
        Lanzamiento de Producto (E604) | 1 | 26/06/2025 | 300 | 300
        Total | | | | 3.600
        
        Ejemplo de Salida esperada:
        DESCRIPCIÓN	FECHA	CANTIDAD	VALOR	VALOR UNITARIO
        CONFERENCIA TECH 2025 (E601)	5/6/2025	2,00	$ 1.600,00	$ 800,00
        WORKSHOP DE MARKETING (E602)	12/6/2025	3,00	$ 1.200,00	$ 400,00
        NETWORKING EMPRESARIAL (E603)	19/6/2025	1,00	$ 500,00	$ 500,00
        LANZAMIENTO DE PRODUCTO (E604)	26/6/2025	1,00	$ 300,00	$ 300,00
        
        Este prompt está diseñado para que incluso las IA antiguas lo procesen correctamente, garantizando la extracción precisa y consistente de la información requerida.
        `;
        

        const prompt = ` ${prompt_base} 
Datos a procesar:
${inputData}`;

        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        };

        const response = await fetch(`${name}?key=${description}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error de la API: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
            throw new Error('Formato de respuesta inválido de la API');
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error al procesar datos con Gemini AI:', error);
        throw error;
    }
}

// Función para mostrar el modal de IA
function showIAModal() {
    const modal = document.createElement('div');
    modal.id = 'ia-modal';
    modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 hidden overflow-y-auto h-full w-full z-50';
    modal.innerHTML = `
        <div class="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div class="mt-3">
                <h3 class="text-lg leading-6 font-medium text-gray-900 text-center" data-translate="ia-modal-title">Procesar con IA</h3>
                <p class="text-sm text-gray-500 mt-2 text-center" data-translate="ia-modal-description">
                    Pega los datos en el área de texto y haz clic en Procesar. Luego, copia el resultado y pégalo en el botón "Importar Datos".
                </p>
                <div class="mt-4">
                    <textarea id="ia-input" class="w-full h-32 p-2 border rounded-md" placeholder="Pega aquí tus datos..."></textarea>
                </div>
                <div class="mt-4">
                    <div id="ia-output" class="hidden">
                        <h4 class="text-sm font-medium text-gray-700 mb-2" data-translate="ia-output-title">Resultado procesado:</h4>
                        <div class="bg-gray-50 p-3 rounded-md">
                            <pre id="ia-output-text" class="text-sm whitespace-pre-wrap"></pre>
                        </div>
                        <div class="mt-3 flex justify-end">
                            <button id="copy-output" class="px-4 py-2 bg-[#FFB22C] text-white text-sm font-medium rounded-md shadow-sm hover:bg-[#FFB22C]/90 focus:outline-none focus:ring-2 focus:ring-[#FFB22C]">
                                <i class="fas fa-copy mr-2"></i>
                                <span data-translate="copy-btn">Copiar</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-4 flex justify-between">
                    <button id="cancel-ia" class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        <span data-translate="cancel-btn">Cancelar</span>
                    </button>
                    <button id="process-ia" class="px-4 py-2 bg-[#FFB22C] text-white text-base font-medium rounded-md shadow-sm hover:bg-[#FFB22C]/90 focus:outline-none focus:ring-2 focus:ring-[#FFB22C]">
                        <span data-translate="process-btn">Procesar</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.classList.remove('hidden');

    // Event listeners
    document.getElementById('cancel-ia').addEventListener('click', () => {
        modal.remove();
    });

    document.getElementById('process-ia').addEventListener('click', async () => {
        const inputData = document.getElementById('ia-input').value;
        if (!inputData.trim()) {
            showAlert('Por favor, ingresa los datos a procesar', 'error');
            return;
        }

        try {
            const processedData = await processDataWithAI(inputData);
            const outputDiv = document.getElementById('ia-output');
            const outputText = document.getElementById('ia-output-text');
            outputText.textContent = processedData;
            outputDiv.classList.remove('hidden');
        } catch (error) {
            showAlert('Error al procesar los datos', 'error');
        }
    });

    document.getElementById('copy-output').addEventListener('click', async () => {
        const outputText = document.getElementById('ia-output-text').textContent;
        try {
            await navigator.clipboard.writeText(outputText);
            showAlert('Texto copiado al portapapeles', 'success');
        } catch (error) {
            showAlert('Error al copiar el texto', 'error');
        }
    });
}

// Función para mostrar alertas
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white z-50`;
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

// Exponer la función globalmente
window.showIAModal = showIAModal;

// Agregar event listener cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const iaProcessBtn = document.getElementById('ia-process-btn');
    if (iaProcessBtn) {
        iaProcessBtn.addEventListener('click', showIAModal);
    }
});
