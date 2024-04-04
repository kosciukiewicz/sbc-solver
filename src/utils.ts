export function mode(arr: number[]): number | undefined {
  const counts: { [name: number]: number } = {};
  let maxCount = 0;
  let maxKey;

  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    const count = (counts[key] = (counts[key] || 0) + 1);
    if (count > maxCount) {
      maxCount = count;
      maxKey = key;
    }
  }

  return maxKey;
}

export function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; h &= h) h = 31 * h + s.charCodeAt(i++);
  return h;
}
