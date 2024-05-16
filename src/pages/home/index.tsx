import React, { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import {
  downloadScripts,
  generateScripts,
  getCampaignContents,
} from "../../services/api";
import Previewer from "../../components/Previewer";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  tomorrow,
  arta,
  docco,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
export default function Home() {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [htmlInput, setHtmlInput] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [scripts, setScripts] = useState("");

  useEffect(() => {
    const pages = localStorage.getItem("campaignPages");
    const html = localStorage.getItem("htmlInput");
    const campaignId_local = localStorage.getItem("campaignId");
    if (pages) {
      setContent(JSON.parse(pages));
    }
    if (html) {
      setHtmlInput(html);
    }
    if (campaignId_local) {
      setCampaignId(campaignId_local);
    }
  }, []);

  const handleInput = (e: any) => {
    setHtmlInput(e?.target?.value);
    localStorage.setItem("htmlInput", e?.target?.value);
  };

  const handleGenerateButton = async () => {
    try {
      if (!htmlInput.length) {
        return;
      }
      setIsLoading(true);
      const a = await getCampaignContents(htmlInput);
      setContent(a.data.modifiedHTMLs);
      setCampaignId(a.data.campaignId);
      localStorage.setItem("campaignPages", JSON.stringify(a.data));
      localStorage.setItem("campaignId", JSON.stringify(a.data.campaignId));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateScriptButton = async () => {
    try {
      console.log(campaignId);
      if (!campaignId.length) {
        return;
      }
      // setIsLoading(true);
      const a = await generateScripts(campaignId);
      console.log(a.data.scripts);
      setScripts(a.data.scripts);
    } catch (error) {
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="m-8 justify-center w-screen justify-center w-full content-center justify-items-center w-screen items-center	">
      <div className="flex gap-4 mb-4 items-center justify-center">
        <div className="w-2/5 h-[500px]">
          <div>Place your html here:</div>
          <textarea
            value={htmlInput}
            className="border-2 w-full h-full  overflow-auto"
            name="postContent"
            onInput={handleInput}
          />
        </div>
        <div className="w-2/5 h-[500px]">
          <div>Preview your html:</div>
          <iframe
            title="HTML Preview"
            srcDoc={htmlInput}
            className="border-2 w-full p-4 h-full overflow-auto"
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-start mx-48 gap-16 mt-20">
        <button
          onClick={handleGenerateButton}
          disabled={isLoading}
          className="border-2 h-16 bg-green-900 text-white w-80 self-center"
          type="button"
        >
          Generate
        </button>
        <button
          onClick={handleGenerateScriptButton}
          disabled={isLoading}
          className="border-2 h-16 bg-green-900 text-white w-80 self-center"
          type="button"
        >
          Get Script to Host
        </button>
        <SyntaxHighlighter className="border-2 w-1/3 mx-6 h-32 py-16 text-center item-center">
          {/* Click to generate scripts */}
          {scripts || "no"}
        </SyntaxHighlighter>
      </div>

      <div className="flex flex-wrap w-full gap-4 mt-24 h-[50%] content-center justify-center justify-items-center items-center">
        {isLoading && <RotateLoader color="#36d7b7" />}
        {!isLoading &&
          content.length &&
          content.map((item: any) => <Previewer item={item} />)}
      </div>
    </div>
  );
}
