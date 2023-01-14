import { marked } from 'marked';
import { basicSetup } from "codemirror"
import Header from '@/components/Header'
import { Container } from '@mui/material'
import { vim } from "@replit/codemirror-vim"
import { editPlaceholder } from '@/utils/mock'
import WriterBar from '@/pages/Writer/WriterBar'
import { useEffect, useRef, useState } from 'react'
import { markdown } from "@codemirror/lang-markdown"
import { EditorView, keymap } from "@codemirror/view"
import { solarizedDark } from 'cm6-theme-solarized-dark'
import { javascript } from '@codemirror/lang-javascript'
import { EditorState, Compartment } from "@codemirror/state"
import { defaultKeymap, history, historyKeymap, insertTab } from "@codemirror/commands"
import 'github-markdown-css'
import Style from './index.module.less'

function MyEditor() {
  const [text, setText] = useState(editPlaceholder)
  const [html, setHtml] = useState('')
  const editorRef = useRef<any>(null)
  let editorView: any;

  useEffect(() => {
    initCodemirror()
    return () => editorView.destroy()
  }, [])

  const initCodemirror = () => {
    const tabSize = new Compartment
    const state = EditorState.create({
      doc: text,
      extensions: [
        basicSetup,
        solarizedDark,
        tabSize.of(EditorState.tabSize.of(2)),
        vim(),
        history(),
        markdown(),
        javascript({ jsx: true, typescript: true }),
        keymap.of([
          ...defaultKeymap, ...historyKeymap,
          { key: "Tab", preventDefault: true, run: insertTab, }
        ]),
        EditorView.updateListener.of((e) => {
          const val = e.state.doc.toString();
          setText(val)
          setHtml(marked.parse(val))
          return val
        })
      ],
    })

    editorView = new EditorView({ state, parent: editorRef.current })
  }

  const fnCreate = () => {
    console.log('create: ', text)
  }

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />

      <Container maxWidth="xl" className="flex flex-row grow mt-3 mb-11 border rounded-md bg-white h-[80vh] p-0">
        <div className={`${Style['editor-wrap']} grow overflow-hidden min-w-[50%]`} ref={editorRef} />
        <article className={`markdown-body grow min-w-[50%] overflow-auto ${Style['markdown-wrap']}`} dangerouslySetInnerHTML={{ __html: html }} />
      </Container>

      <WriterBar onCreate={fnCreate}/>
    </div>
  )
}

export default MyEditor