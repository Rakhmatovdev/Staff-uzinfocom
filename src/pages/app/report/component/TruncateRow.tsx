import { Tooltip } from "antd";
import { useRef } from "react";

interface IProps {
  text: string | number;
  maxWidth?: number;
}

export default function TruncateRow({
  text = "--",
  maxWidth = 300,
}: IProps): React.ReactElement {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  return (
    <Tooltip
      title={text}
      style={{ maxWidth }}
      placement="rightTop"
      className={`w-[${maxWidth}px]`}
    >
      <span ref={tooltipRef} className={`line-clamp-4 max-w-[${maxWidth}px]`}>
        {text}
      </span>
    </Tooltip>
  );
}
