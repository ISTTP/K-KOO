// AI 분석 로직 추가 필요
export async function getKeyword(contents: string) {
  return contents.length > 20 ? '사랑' : '우정';
}
