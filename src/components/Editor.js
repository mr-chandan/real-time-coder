import React from 'react'
import Codemirror from 'codemirror';
import { useEffect } from 'react';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/lib/codemirror.css'

export default function Editor() {

  useEffect(() => {
    async function init() {
      Codemirror.fromTextArea(document.getElementById('realtimeeditor'), {
        mode: { name: 'javascript', json: true },
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true
      });
    }
    init()

  }, [])


  return<textarea id='realtimeeditor'></textarea>
 
}
