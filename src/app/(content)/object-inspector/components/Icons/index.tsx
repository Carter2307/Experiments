import * as React from "react";

function WIcon(props: { size?: number }) {
  const { size = 24 } = props;
  const viewBox = `0 0 ${24} ${24}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.63323 16.8152L6 7.18506H7.18495L9.19749 15.0283H9.29154L11.3417 7.18506H12.6583L14.7085 15.0283H14.8025L16.815 7.18506H18L15.3668 16.8152H14.163L12.0376 9.14117H11.9624L9.83699 16.8152H8.63323Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HIcon(props: { size?: number }) {
  const { size = 24 } = props;
  const viewBox = `0 0 ${24} ${24}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 17.1587V6.84131H9.24937V11.4358H14.7506V6.84131H16V17.1587H14.7506V12.5441H9.24937V17.1587H8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { WIcon, HIcon };
