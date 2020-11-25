import React, { ChangeEvent } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";

const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

type MyProps = { 
    onEditorChange: (event: ChangeEvent) => void,
    placeholder: string,
 };
type MyState = { editorHtml: any};

class QuillEditor extends React.Component<MyProps, MyState> {

    bandId;
    placeholder;
    onEditorChange;
    _isMounted;
    pollHandler: any;
    reactQuillRef: any;
    quill: any;


    constructor(props) {
        super(props);
        this.state = {
            editorHtml: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
        };

        this.reactQuillRef = null;
    }

    undoChange() {
      this.quill.history.undo();
    }
    redoChange() {
      this.quill.history.redo();
    }

    CustomUndo = () => (
      <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
        <path
          className="ql-stroke"
          d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
      </svg>
    );
    
    // Redo button icon component for Quill editor
    CustomRedo = () => (
      <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
        <path
          className="ql-stroke"
          d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
        />
      </svg>
    );
    handleChange = (html) => {
        this.setState({
            editorHtml: html
        }, () => {
            this.props.onEditorChange(this.state.editorHtml);
        });
    };



    render() {
        return (
            <div>
              <div id="toolbar">
                <span className="ql-formats">
                  <select className="ql-header" defaultValue="3">
                    <option value="1">Heading</option>
                    <option value="2">Subheading</option>
                    <option value="3">Normal</option>
                  </select>
                </span>
                <span className="ql-formats">
                  <button className="ql-bold" />
                  <button className="ql-italic" />
                  <button className="ql-underline" />
                  <button className="ql-strike" />
                </span>
                <span className="ql-formats">
                  <button className="ql-list" value="ordered" />
                  <button className="ql-list" value="bullet" />
                </span>
                <span className="ql-formats">
                  <button className="ql-script" value="super" />
                  <button className="ql-script" value="sub" />
                  <button className="ql-blockquote" />
                  <button className="ql-direction" />
                </span>
                <span className="ql-formats">
                  <select className="ql-align" />
                  <select className="ql-color" />
                  <select className="ql-background" />
                </span>
                <span className="ql-formats">
                  <button className="ql-link" />
                  <button className="ql-video" />
                </span>
                <span className="ql-formats">
                  <button className="ql-code-block" />
                  <button className="ql-clean" />
                </span>
                <span className="ql-formats">
                  <button className="ql-undo">
                    <this.CustomUndo />
                  </button>
                  <button className="ql-redo">
                    <this.CustomRedo />
                  </button>
                </span>
              </div>
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    onChange={this.handleChange}
                    modules={this.modules}
                    formats={this.formats}
                    value={this.state.editorHtml}
                    placeholder={this.props.placeholder}
                    className="bg-light text-primary"
                />
            </div>
        )
    }
    modules = {
        syntax: false,
        toolbar: {
            container: '#toolbar',
            handlers: {
              undo: this.undoChange,
              redo: this.redoChange
            },
        },
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true
        }
    }
    
    formats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "align",
      "strike",
      "script",
      "blockquote",
      "background",
      "list",
      "bullet",
      "indent",
      "link",
      "video",
      "color",
      "code-block"
    ];
  };
export default QuillEditor;