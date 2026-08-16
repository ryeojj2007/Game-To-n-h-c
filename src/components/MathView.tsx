import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathViewProps {
  latex: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ latex, block = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    try {
      katex.render(latex, containerRef.current, {
        displayMode: block,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch (e) {
      if (containerRef.current) {
        containerRef.current.innerText = latex;
      }
    }
  }, [latex, block]);

  return (
    <span
      ref={containerRef}
      className={`inline-math-container font-mono ${block ? 'block my-1 text-center' : 'inline-block'} ${className}`}
    />
  );
};
