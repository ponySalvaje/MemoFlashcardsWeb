import { useRef, memo, useCallback } from "react";
import JoditEditor from "jodit-react";
import "./RichTextEditor.css";

const RichTextEditor = memo(
  ({ value, setValue }) => {
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

    const handleBlur = useCallback(
      (newContent) => {
        setValue(newContent);
      },
      [setValue]
    );

    return (
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1}
        onBlur={handleBlur}
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.setValue === nextProps.setValue &&
      JSON.stringify(prevProps.config) === JSON.stringify(nextProps.config)
    );
  }
);

export default RichTextEditor;
