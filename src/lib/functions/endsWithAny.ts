export default function(suffixes: string[], string: string) {
    return suffixes.some((suffix) => string.endsWith(suffix));
  }