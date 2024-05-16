import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCampaignPageById,
  getCampaignPageCTRByPageId,
} from "../../services/api";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  tomorrow,
  arta,
  docco,
} from "react-syntax-highlighter/dist/esm/styles/hljs"; // Choose a style you prefer
import CopyToClipboard from "react-copy-to-clipboard";
import prettier from "prettier";

interface ControlData {
  elementId: string;
}

export default function PageDetails() {
  const { pageId } = useParams();
  const navigate = useNavigate();

  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isWatchingCode, setIsWatchingCode] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [ctrData, setCtrData] = useState([]);
  const [elementObject, setElementObject] = useState<{
    [key: string]: string | null;
  }>({});
  const [styleTag, setStyleTags] = useState<string | null>("");

  const getPage = useCallback(async () => {
    try {
      const a = await getCampaignPageById(pageId);
      setHtmlContent(a.htmlContent);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [pageId]);

  const getPageCTR = useCallback(async () => {
    try {
      const a = await getCampaignPageCTRByPageId(pageId);
      setCtrData(a);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    getPage();
    getPageCTR();
  }, [getPage, getPageCTR, pageId]);

  useEffect(() => {
    if (isCodeCopied) {
      setTimeout(() => {
        setIsCodeCopied(false);
      }, 2000);
    }
  }, [isCodeCopied]);

  useEffect(() => {
    if (htmlContent) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      let tempElementObject: { [key: string]: string | null } = {};
      console.log();

      let styles = doc.querySelector("style");
      setStyleTags(styles?.outerHTML || null);

      if (ctrData) {
        ctrData.forEach((i: ControlData) => {
          const element = doc.getElementById(i.elementId);
          tempElementObject[i.elementId] = element ? element.outerHTML : null;
        });
      }

      setElementObject(tempElementObject);
    }
  }, [htmlContent, ctrData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log(styleTag);
  // console.log(
  //   `<html><head>${styleTag}</head><body>${elementObject["31d063ea-e9a0-4bf4-bb80-6f636e72374f"]}</body></html>`
  // );

  // const formateHtmlCode = () =>
  //   prettier.format(htmlContent, {
  //     parser: "html",
  //   });

  return (
    <div className="w-screen p-8 h-screen">
      <div
        className="w-full mb-8 hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        {""}GO BACK
      </div>
      <div className="w-full h-full flex gap-16">
        <div className="w-[45%] h-full">
          <div className="items-center">Preview</div>
          {!isWatchingCode && (
            <iframe
              title="HTML Preview"
              srcDoc={htmlContent}
              className="border-2 w-full h-4/5 overflow-auto"
            />
          )}
          {isWatchingCode && (
            <div className="border-2 w-full h-4/5 overflow-auto">
              <SyntaxHighlighter
                className="h-full"
                language="html"
                style={docco}
                showLineNumbers
                wrapLines
              >
                {htmlContent}
              </SyntaxHighlighter>
            </div>
          )}
          <div className="w-full flex justify-between">
            <button
              className="border-2 w-1/3 h-12 bg-green-800 text-white"
              onClick={() => {
                setIsWatchingCode(!isWatchingCode);
              }}
            >
              {!isWatchingCode ? "Watch Code" : "Watch Preview "}
            </button>
            {isCodeCopied ? (
              <span className="mt-2" style={{ color: "green" }}>
                code is copied.
              </span>
            ) : null}
            <CopyToClipboard
              text={htmlContent}
              onCopy={() => {
                setIsCodeCopied(true);
              }}
            >
              <button className="bg-[#80669d] w-1/3 text-white">
                Copy Code{" "}
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="w-[45%] h-full ">
          <div>CTR</div>
          <div className="flex w-full justify-between bg-yellow-200 p-4">
            <div className="w-6/12">ElementId</div>
            <div className="w-4/12">Element</div>
            {/* <div>ElementContent</div> */}
            <div className="w-1/12 text-center">Clicked</div>
          </div>
          {ctrData.map((i: any) => (
            <div
              key={i.elementId}
              className="flex w-full justify-between bg-yellow-50 p-4 mt-1"
            >
              <div className="w-6/12">{i.elementId}</div>

              <div className="w-4/12 h-full">
                <iframe
                  title="element"
                  srcDoc={`<html><head>${styleTag}</head><body>${elementObject[i.elementId]}</body></html>`}
                  className="h-[60px] self-center bg-yellow-50	 content-center w-full"
                />
                {/* <div className="bg-red-400">{"-------"}</div> */}
              </div>

              <div className="w-1/12 text-center">{i.clickCount}</div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
