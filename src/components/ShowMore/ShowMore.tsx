import React, { ReactNode, useState, useEffect, useRef } from "react";
import Truncate from "./Truncate";

interface ShowMoreProps {
  lines?: number;
  more?: string | ReactNode;
  less?: string | ReactNode;
  className?: string;
  anchorClass?: string;
  onClick?: () => void;
  expanded?: boolean;
  width?: 0;
  keepNewLines?: boolean;
  truncatedEndingComponent?: string | ReactNode;
}

const ShowMore: React.FC<ShowMoreProps> = ({
  children,
  lines = 3,
  more = "Show more",
  less = "Show less",
  className = "show-more",
  anchorClass = "",
  onClick = undefined,
  expanded = false,
  width = 0,
  keepNewLines = false,
  truncatedEndingComponent = "... ",
}) => {
  const isMounted = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  //   const handleTruncate = () => {};

  const toggleLines = () => {
    console.log("toggleLines");
  };

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={className}>
      <Truncate>{children}</Truncate>
      {!isTruncated && isExpanded && (
        <span>
          <a href="/" className={anchorClass} onClick={toggleLines}>
            {less}
          </a>
        </span>
      )}
    </div>
  );
};

export default ShowMore;
