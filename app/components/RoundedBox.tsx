import React, { CSSProperties, ReactNode } from 'react';

interface RoundedBoxProps {
  children: ReactNode;
  backgroundColor?: string;
  accentColor?: string;
  textColor?: string;
  padding?: string;
  borderRadius?: string;
  borderWidth?: string;
  width?: string;
  shadow?: string;
  className?: string;
  [key: string]: any;
}

const RoundedBox: React.FC<RoundedBoxProps> = ({
  children,
  backgroundColor = 'inherit',
  accentColor = 'var(--accent-color, inherit)',
  textColor = 'inherit',
  padding = '1rem',
  borderRadius = 'var(--border-radius, 0.5rem)',
  borderWidth = 'var(--border-width, 2px)',
  width = '100%',
  shadow = 'var(--box-shadow, inherit)',
  className = '',
  ...otherProps
}) => {
  const boxStyle: CSSProperties = {
    backgroundColor,
    color: textColor,
    padding,
    borderRadius,
    border: `${borderWidth} solid ${accentColor}`,
    width,
    boxShadow: shadow,
  };

  return (
    <div
      style={boxStyle}
      className={className}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default RoundedBox;
