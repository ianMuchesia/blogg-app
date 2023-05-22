import dynamic from 'next/dynamic';
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
    content: string;
    handleEditorChange: (value: string) => void
}



const DynamicReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link'],
    ['clean'],
  ],
};

const Editor = ({handleEditorChange, content}:Props) => {
  return (
    <div className="editor-container">
    <DynamicReactQuill
        modules={modules}
        theme="snow"
        placeholder="Content goes here..."
        onChange={handleEditorChange}
        value={content}
      
      />
      </div>
  )
}

export default Editor