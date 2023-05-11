import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import React, { useRef } from 'react';
import { Button } from 'antd';

const ReportEditor = props => {
    const editorRef = useRef();

    const handleClickButton = () => {
        props.callback(editorRef.current.getInstance().getMarkdown());
    };

    return (
        <div style={{ height: '100%' }}>
            <div style={{ height: '90%', background: 'lightyellow' }}>
                <Editor
                    placeholder='내용을 입력해주세요.'
                    previewStyle="vertical"
                    height="100%"
                    background="lightyellow"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    ref={editorRef}
                />
            </div>

            <br />
            <br />

            <div style={{ textAlign: 'center' }}>
                <Button onClick={handleClickButton}>작성하기</Button>
            </div>
        </div>
    );
}

export default ReportEditor;