import React from 'react';
// Librerías CKEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

/**
 * Componente Editor de Texto Enriquecido (CKEditor 5).
 * Resuelve el conflicto de findDOMNode al usar una librería moderna.
 */
export default function RichTextEditor({ value, onChange, placeholder }) {
    
    return (
        <div className="ckeditor-container" style={{ minHeight: '250px' }}>
            <CKEditor
                editor={ClassicEditor} // Usamos la versión clásica
                data={value} // El valor actual del formulario
                config={{
                    placeholder: placeholder,
                    toolbar: [ // Barra de herramientas simplificada
                        'heading', '|', 'bold', 'italic', '|',
                        'link', 'bulletedList', 'numberedList', '|',
                        'blockQuote', 'undo', 'redo'
                    ]
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    // Enviamos el contenido HTML al componente padre (Admin.jsx)
                    onChange(data);
                }}
                onReady={editor => {
                    // Puedes añadir lógica al inicializar si es necesario
                    console.log('CKEditor is ready to use!', editor);
                }}
            />
        </div>
    );
}