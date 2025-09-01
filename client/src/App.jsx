import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ for feedback
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    if (!code.trim()) {
      toast.error("Please write some code before requesting a review");
      return;
    }

    setLoading(true); // ✅ start loading
    try {
      const response = await axios.post(
        `${"https://code-reviewer-mauve.vercel.app"}/ai/get-review`,
        { code },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        setReview(response.data.data?.text || "No review generated.");
        toast.success("Code reviewed successfully!");
      } else {
        toast.error(response.data?.message || "Failed to get review");
      }
    } catch (error) {
      console.error("Error reviewing code:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <button onClick={reviewCode} className="review" disabled={loading}>
          {loading ? "Reviewing..." : "Review"}
        </button>
      </div>
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;
