import React from "react";

interface MSLogoProps {
  width?: number;
  height?: number;
}

export default function MSLogo({ width = 48, height = 48 }: MSLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* Red M */}
      <text
        x="35"
        y="85"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="90"
        fontWeight="bold"
        fill="#E31E24"
      >
        M
      </text>

      {/* Black S */}
      <text
        x="105"
        y="85"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="90"
        fontWeight="bold"
        fill="#333333"
      >
        S
      </text>

      {/* Diagonal swoosh - gray with black shadow effect */}
      <path
        d="M 15 95 L 140 45 L 135 40 L 10 90 Z"
        fill="#333333"
      />
      <path
        d="M 15 95 L 140 45 L 138 43 L 13 93 Z"
        fill="#666666"
      />
    </svg>
  );
}
