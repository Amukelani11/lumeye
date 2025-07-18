declare module 'json5' {
  export function parse(text: string, reviver?: (key: any, value: any) => any): any;
  export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string;
} 