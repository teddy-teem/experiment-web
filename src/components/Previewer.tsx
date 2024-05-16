import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Previewer({ item }: { item: any }) {
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCodeCopied) {
      setTimeout(() => {
        setIsCodeCopied(false);
      }, 2000);
    }
  }, [isCodeCopied]);

  return (
    <div className="w-5/12 gap-6 h-full content-center justify-center justify-items-center items-center">
      <iframe
        title="HTML Preview"
        srcDoc={item?.htmlContent}
        className="border-2 p-4 w-full h-[600px] overflow-auto"
      />
      <div className="w-full flex justify-between">
        <button
          onClick={() => {
            navigate(`/${item?.pageId}`);
          }}
          className="border-2 w-full h-12 bg-green-800 text-white"
          type="button"
        >
          {"Go for Details"}
        </button>
      </div>
    </div>
  );
}
