import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function RichTextEditor({ value, onChange, placeholder }) {
    
    return (
        <div className="ckeditor-container" style={{ minHeight: '250px' }}>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                config={{
                    placeholder: placeholder,
                    toolbar: [ 
                        'heading', '|', 'bold', 'italic', '|',
                        'link', 'bulletedList', 'numberedList', '|',
                        'blockQuote', 'undo', 'redo'
                    ]
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                onReady={editor => {
                    console.log('CKEditor is ready to use!', editor);
                }}
            />
        </div>
    );
}