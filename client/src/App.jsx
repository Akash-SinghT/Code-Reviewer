import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { toast } from "react-toastify";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    if (!code.trim()) {
      toast.error("Please write some code before requesting a review");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${"http://localhost:3000"}/ai/get-review`,
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
    <main style={{ display: "flex", height: "100vh" }}>
      {/* Left Side - Code Editor */}
      <div className="left" style={{ flex: 1, padding: "10px" }}>
        <h3 style={{ color: "#fff", marginBottom: "10px" }}>
          Write Your Code Here:
        </h3>
        <div className="code" style={{ height: "80%" }}>
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
              backgroundColor: "#1e1e1e",
              color: "#fff",
            }}
            placeholder="Write your code here..."
          />
        </div>
        <button
          onClick={reviewCode}
          className="review"
          disabled={loading}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Reviewing..." : "Review"}
        </button>
      </div>

      {/* Right Side - Review */}
      <div
        className="right"
        style={{
          flex: 1,
          backgroundColor: "#2d2d2d",
          padding: "20px",
          borderRadius: "8px",
          color: "#fff",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Code Review:</h3>
        <div
          style={{
            backgroundColor: "#1e1e1e",
            padding: "15px",
            borderRadius: "5px",
            minHeight: "80%",
            overflowY: "auto",
          }}
        >
          {review ? (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          ) : (
            <p style={{ color: "#aaa" }}>
              Your code review will appear here...
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
