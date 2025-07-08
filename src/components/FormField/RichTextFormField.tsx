import React, { useRef } from 'react';

import './RichTextFormField.css'
import '@toast-ui/editor/dist/toastui-editor.css';
import { IFormFieldProps } from './FormField';

import { Editor } from '@toast-ui/react-editor';

export const RichTextFormField = (props: IFormFieldProps) => {
    const editorRef = useRef<Editor>(null);
    return (
        <div className='form-field-rich-text'>
            <Editor
                toolbarItems={[
                    [
                        'heading',
                        'bold',
                        'italic',
                        'strike',
                    ],
                    [
                        'hr',
                        'quote'
                    ],
                    [
                        'ul',
                        'ol',
                        'task',
                        'indent',
                        'outdent'
                    ],
                    [
                        'table',
                        // 'image',
                    ],
                    [
                        'code',
                        'codeblock',
                    ],
                    [
                        'link',
                        'scrollSync'
                    ]
                ]}
                ref={editorRef}
                
                initialValue={props.value}
                onChange={(e) => {
                    props.onUpdate(editorRef.current?.getInstance().getMarkdown());
                }}
                initialEditType='wysiwyg'
            />
        </div>
    );
};
