import React from 'react';
import './tiptap.css';
import { FaBold, FaItalic, FaListOl, FaListUl } from 'react-icons/fa';
import { MdTitle, MdCode } from 'react-icons/md';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'


import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';


const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group">
        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FaBold />
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FaItalic />
        </button>

        {/* Headings H1, H2, H3 */}
        {[1, 2, 3].map((level) => (
          <button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={editor.isActive('heading', { level }) ? 'is-active' : ''}
          >
            <MdTitle style={{ fontSize: '1em' }} /> H{level}
          </button>
        ))}

        {/* Bullet List */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <FaListUl />
        </button>

        {/* Ordered List */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <FaListOl />
        </button>

        {/* Code Block */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <MdCode />
        </button>


        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive('textAlign', { textAlign: 'left' }) ? 'is-active' : ''}>
          Left
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive('textAlign', { textAlign: 'center' }) ? 'is-active' : ''}>
          Center
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive('textAlign', { textAlign: 'right' }) ? 'is-active' : ''}>
          Right
        </button>


        <button onClick={() => addImage(editor)}>Add image from URL</button>

      </div>
    </div>
  );
};


const addImage = (editor) => {
  const url = window.prompt('URL')

  if (url) {
    editor.chain().focus().setImage({ src: url }).run()
  }
}



const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'], 
  }),
  Image,

  
];


const Tiptap = ({ setEntry, content }) => {
  const editor = useEditor({
    extensions: extensions, // Ensure extensions are properly defined
    content: content, // Set initial content if needed
    onUpdate: ({ editor }) => {
      // Pass the editor's current content back to NewNote.jsx
      setEntry(editor.getHTML()); // This will send the HTML content
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content-container" />
    </div>
  );
};

export default Tiptap;
