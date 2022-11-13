import '@wangeditor/editor/dist/css/style.css' // 引入 css
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import Header from '@/components/Header'
import { Container } from '@mui/material'
import WriterBar from '@/components/WriterBar'

function MyEditor() {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState('<p>hello</p>')

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>')
    }, 1500)
  }, [])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法
  // const toolbarConfig = { }                        // JS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      <Container maxWidth="md" className="grow mt-3 mb-11 border rounded-md bg-white">
        <Editor
          onChange={editor => setHtml(editor.getHtml())}
          defaultConfig={editorConfig}
          onCreated={setEditor}
          value={html}
          mode="default"
        />
      </Container>

      {/* 底部固定提交 */}
      <WriterBar />
    </div>
  )
}

export default MyEditor