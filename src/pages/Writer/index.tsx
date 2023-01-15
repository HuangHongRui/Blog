import { marked } from 'marked';
import { basicSetup } from "codemirror"
import CreateModal from "./CreateModal";
import Header from '@/components/Header'
import { Container } from '@mui/material'
import { vim } from "@replit/codemirror-vim"
import { editPlaceholder } from '@/utils/mock'
import WriterBar from '@/pages/Writer/WriterBar'
import { useContext, useEffect, useRef, useState } from 'react'
import { markdown } from "@codemirror/lang-markdown"
import { EditorView, keymap } from "@codemirror/view"
import { solarizedDark } from 'cm6-theme-solarized-dark'
import { javascript } from '@codemirror/lang-javascript'
import useModal, { useModalProps } from '@/hooks/useModal';
import { EditorState, Compartment } from "@codemirror/state"
import { defaultKeymap, history, historyKeymap, insertTab } from "@codemirror/commands"
import 'github-markdown-css'
import Style from './index.module.less'
import { fetchBlogAdd } from '@/service/blogs';
import { AppConfigContext } from '@/components/AppConfProvider';

function MyEditor() {
  const { msg } = useContext(AppConfigContext) || ({} as any);
  const modalProps: useModalProps = useModal();
  const [text, setText] = useState(editPlaceholder)
  const [html, setHtml] = useState('')
  const editorRef = useRef<any>(null)
  const editorView = useRef<any>(null)

  useEffect(() => {
    initCodemirror()
    return () => editorView.current.destroy()
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

    editorView.current = new EditorView({ state, parent: editorRef.current })
  }

  const fnCreate = async (title: string) => {
    const res = await fetchBlogAdd({ title, content: text })
    if (res) {
      msg.switch(true, '创建成功')
      editorView.current.dispatch({
        changes: {from: 0, to: editorView.current.state.doc.toString().length, insert:''}
      })
    } else {
      msg.switch(true, '创建失败', 'error')
    }
    modalProps.toggle(false);
  }

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />

      <Container maxWidth="xl" className="flex flex-row grow mt-3 mb-11 border rounded-md bg-white h-[80vh] p-0">
        <div className={`${Style['editor-wrap']} grow overflow-hidden min-w-[50%]`} ref={editorRef} />
        <article className={`markdown-body grow min-w-[50%] overflow-auto ${Style['markdown-wrap']}`} dangerouslySetInnerHTML={{ __html: html }} />
      </Container>

      <WriterBar onOpenModal={() => modalProps.toggle(true)}/>
      <CreateModal {...modalProps} onCreate={fnCreate} />
    </div>
  )
}

export default MyEditor