declare module '*.svg' {
  import React from 'react';
  const content: string;
  export default content;

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
}
