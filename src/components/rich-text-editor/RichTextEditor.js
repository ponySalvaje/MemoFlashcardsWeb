import { useRef, memo, useCallback } from "react";
import JoditEditor from "jodit-react";
import "./RichTextEditor.css";

const RichTextEditor = memo(
  ({ value, setValue, config }) => {
    const editor = useRef(null);

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
