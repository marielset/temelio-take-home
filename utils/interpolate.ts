export function interpolateString(
  template: string,
  variables: Record<string, string>
): string {
  return template.replace(/{\s*(\w+)\s*}/g, (_, key) => {
    return key in variables ? variables[key] : `{${key}}`;
  });
}
