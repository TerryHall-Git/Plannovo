import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { Tooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";
import "../styles/BlockEditor.css";

//Extensions for tiptap
const extensions = [
  BubbleMenu.configure({
    pluginKey: "bubbleMenuOne",
    element: document.querySelector(".menu-one"),
  }),
  Image.configure({
    inline: true,
    allowBase64: true,
  }),
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
];

/**
 * This component lists all the various text-editing options
 */
const MenuBar = ({ editor, deleteTask, taskIdx }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="MenuBar">
      <div className="MenuBar-left">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold") ? "MenuBar-active" : "MenuBar-inactive"
          }
          data-tooltip-id="boldBtn-tooltip"
          data-tooltip-content="Bold"
        >
          <FontAwesomeIcon icon="fa-solid fa-bold" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic") ? "MenuBar-active" : "MenuBar-inactive"
          }
          data-tooltip-id="italicBtn-tooltip"
          data-tooltip-content="Italic"
        >
          <FontAwesomeIcon icon="fa-solid fa-italic" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike") ? "MenuBar-active" : "MenuBar-inactive"
          }
          data-tooltip-id="strikeBtn-tooltip"
          data-tooltip-content="Strikethrough"
        >
          <FontAwesomeIcon icon="fa-solid fa-strikethrough" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={
            editor.isActive("code") ? "MenuBar-active" : "MenuBar-inactive"
          }
          data-tooltip-id="codeBtn-tooltip"
          data-tooltip-content="Code"
        >
          <FontAwesomeIcon icon="fa-solid fa-code" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "MenuBar-active"
              : "MenuBar-inactive"
          }
          data-tooltip-id="bulletBtn-tooltip"
          data-tooltip-content="Bullet List"
        >
          <FontAwesomeIcon icon="fa-solid fa-list-ul" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "MenuBar-active"
              : "MenuBar-inactive"
          }
          data-tooltip-id="listBtn-tooltip"
          data-tooltip-content="Numbered List"
        >
          <FontAwesomeIcon icon="fa-solid fa-list-ol" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock") ? "MenuBar-active" : "MenuBar-inactive"
          }
          data-tooltip-id="codeBlockBtn-tooltip"
          data-tooltip-content="Code Block"
        >
          <FontAwesomeIcon icon="fa-solid fa-chalkboard" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? "MenuBar-active"
              : "MenuBar-inactive"
          }
          data-tooltip-id="quoteBtn-tooltip"
          data-tooltip-content="Block Quote"
        >
          <FontAwesomeIcon icon="fa-solid fa-quote-left" />
        </button>
        <button
          className="MenuBar-inactive"
          onClick={() => {
            const url = window.prompt("URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          data-tooltip-id="imgBtn-tooltip"
          data-tooltip-content="Insert Image"
        >
          <FontAwesomeIcon icon="fa-solid fa-image" />
        </button>
        <Tooltip id="boldBtn-tooltip" />
        <Tooltip id="italicBtn-tooltip" />
        <Tooltip id="strikeBtn-tooltip" />
        <Tooltip id="codeBtn-tooltip" />
        <Tooltip id="bulletBtn-tooltip" />
        <Tooltip id="listBtn-tooltip" />
        <Tooltip id="codeBlockBtn-tooltip" />
        <Tooltip id="quoteBtn-tooltip" />
        <Tooltip id="imgBtn-tooltip" />
      </div>
      <div className="MenuBar-right">
        <button
          className="BlockEditor-trashIcon"
          onClick={() => deleteTask(taskIdx)}
          data-tooltip-id="trashBtn-tooltip"
          data-tooltip-content="Delete Task"
        >
          <FontAwesomeIcon icon="fa-solid fa-trash-can" />
        </button>
        <Tooltip id="trashBtn-tooltip" />
      </div>
    </div>
  );
};

/**
 * This component displays the text-editor - used for modifying tasks
 */
export default function BlockEditor({
  taskIdx,
  content,
  updateTaskDocHtml,
  deleteTask,
}) {
  function handleChange({ editor }) {
    updateTaskDocHtml(taskIdx, editor.getHTML());
  }

  const editor = useEditor({
    onUpdate: handleChange,
    content: content,
    extensions: extensions,
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    editor.commands.setContent(content);
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <MenuBar editor={editor} deleteTask={deleteTask} taskIdx={taskIdx} />
      <EditorContent editor={editor} />
    </>
  );
}
