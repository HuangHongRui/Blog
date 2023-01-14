import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import WriterBar from '@/components/WriterBar'
import { Container, TextareaAutosize } from '@mui/material'
import { basicSetup } from "codemirror"
import { EditorView, keymap } from "@codemirror/view"
import { EditorState, Compartment } from "@codemirror/state"
import { indentWithTab } from "@codemirror/commands"
import { solarizedDark } from 'cm6-theme-solarized-dark'
import { javascript } from "@codemirror/lang-javascript"
import { marked } from 'marked';
import 'github-markdown-css'
import Style from './index.module.less'
import { editPlaceholder } from '@/utils/mock'

function MyEditor() {
  const [text, setText] = useState(editPlaceholder)
  const [html, setHtml] = useState('')
  const editorRef = useRef<any>(null)
  let editorView: any;

  useEffect(() => {
    // initMark()
    editorView = initCodemirror()
    return () => editorView.destroy()
  }, [])

  // const initMark = () => {
  //   marked.setOptions({
  //     renderer: new marked.Renderer(),
  //     highlight: function (code, lang) {
  //       const hljs = highlight
  //       const language = hljs.getLanguage(lang) ? lang : 'plaintext';
  //       return hljs.highlight(code, { language }).value;
  //     },
  //     async: false,
  //     baseUrl: null,
  //     breaks: false,
  //     gfm: true,
  //     headerIds: true,
  //     headerPrefix: "",
  //     langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  //     mangle: true,
  //     pedantic: false,
  //     sanitize: false,
  //     sanitizer: null,
  //     silent: false,
  //     smartypants: false,
  //     tokenizer: null,
  //     walkTokens: null,
  //     xhtml: false
  //   });
  // }

  const initCodemirror= () => {
    const tabSize = new Compartment
    const state = EditorState.create({
      doc: text,
      extensions: [
        basicSetup,
        tabSize.of(EditorState.tabSize.of(4)),
        solarizedDark,
        EditorView.updateListener.of((e) => {
          const val = e.state.doc.toString();
          setText(val)
          setHtml(marked.parse(val))
          return val
        })
      ],
    })

    return new EditorView({
      state,
      parent: editorRef.current,
    })
  }

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />

      <Container maxWidth="xl" className="flex flex-row grow mt-3 mb-11 border rounded-md bg-white h-[80vh] p-0">
        <div className={`${Style['editor-wrap']} grow overflow-hidden min-w-[50%]`}  ref={editorRef} />
        <article className={`markdown-body grow min-w-[50%] overflow-auto ${Style['markdown-wrap']}`} dangerouslySetInnerHTML={{ __html: html }} />
      </Container>

      {/* 底部固定提交 */}
      <WriterBar />
    </div>
  )
}

export default MyEditor