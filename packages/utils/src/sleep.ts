// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
