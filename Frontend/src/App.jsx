import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import EditorModule from "react-simple-code-editor";
import axios from "axios"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const App = () => {
  const [code, setCode] = useState(``);

  const [review, setReview] = useState(``)

  const Editor = EditorModule.default;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("http://localhost:3000/ai/get-review", { code })

    setReview(response.data)
    
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              border: "1px solid #ddd",borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        <div onClick={reviewCode} className="review">Review</div>
      </div>

      <div className="right">
        <Markdown
         rehypePlugins={[ rehypeHighlight ]}
        >{review}</Markdown>
      </div>
    </main>
  );
};

export default App;
