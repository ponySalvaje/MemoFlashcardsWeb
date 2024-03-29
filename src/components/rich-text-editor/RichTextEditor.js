import { useRef } from "react";
import JoditEditor from "jodit-react";
import "./RichTextEditor.css";

const RichTextEditor = ({ value, setValue }) => {
  const editor = useRef(null);

  const config = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "es",
    toolbarButtonSize: "medium",
    toolbarAdaptive: true,
    showCharsCounter: true,
    showWordsCounter: true,
    enableDragAndDropFileToEditorenableDragAndDropFileToEditor: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  const handleBlur = () => {
    setValue(editor.current.value);
  };

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1}
      onBlur={handleBlur}
    />
  );
};

export default RichTextEditor;
