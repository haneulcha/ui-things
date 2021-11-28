import React, {
  ReactNode,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

interface TruncateProps {
  ellipsis?: string | ReactNode;
  lines?: number;
  trimWhitespace?: boolean;
  width?: number;
  onTruncate?: () => void;
}

const Truncate: React.FC<TruncateProps> = ({
  children,
  ellipsis = "...",
  lines = 1,
  trimWhitespace = false,
  width = 0,
}) => {
  const targetEl = useRef<HTMLSpanElement>(null);
  const textEl = useRef<HTMLSpanElement>(null);
  const ellipsisEl = useRef<HTMLSpanElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  const [targetWidth, setTargetWidth] = useState(0);

  const innerText = (node: HTMLSpanElement): string => {
    const div = document.createElement("div");
    const contentKey =
      "innerText" in window.HTMLElement.prototype ? "innerText" : "textContent";
    console.log("contentKey", contentKey);

    const content = node.innerHTML.replace(/\r\n|\r|\n/g, " ");
    div.innerHTML = content;
    // div.innerHTML = extractReplaceLinksKeys(content);

    let text = div[contentKey];

    // test
    const test = document.createElement("div");
    test.innerHTML = "foo<br />bar";

    if (test[contentKey]?.replace(/\r\n|\r/g, "\n") !== "foo\nbar") {
      div.innerHTML = div.innerHTML.replace(/<br.*?[\/]?>/gi, "\n");
      text = div[contentKey];
    }

    return text || "";
  };

  const calcTargetWidth = useCallback(() => {
    if (!targetEl.current || !ctx.current) return;

    const targetWidth = Math.floor(
      targetEl.current.parentElement?.getBoundingClientRect().width ?? width
    );

    // if(!targetWidth) {
    //     return window.requestAnimationFrame(() => calcTargetWidth());
    // }

    const style: CSSStyleDeclaration = window.getComputedStyle(
      targetEl.current
    );

    const font = [
      style.fontWeight,
      style.fontStyle,
      style.fontSize,
      style.fontFamily,
    ].join(" ");

    ctx.current.font = font;

    setTargetWidth(targetWidth);
  }, [width]);

  useEffect(() => {
    if (!textEl.current) return;
    // TODO:: Node not needed in document tree to read its content
    textEl.current.parentElement?.removeChild(textEl.current);
  }, [targetWidth]);

  useEffect(() => {
    if (!textEl.current) return;

    const canvas = document.createElement("canvas");
    ctx.current = canvas.getContext("2d");

    calcTargetWidth();

    window.addEventListener("resize", calcTargetWidth);
  }, [calcTargetWidth]);

  useEffect(() => {
    console.log(targetWidth);
  }, [targetWidth]);

  return (
    <span ref={targetEl}>
      <span ref={textEl}>{children}</span>
      <span ref={ellipsisEl}>{ellipsis}</span>
    </span>
  );
};

export default Truncate;
