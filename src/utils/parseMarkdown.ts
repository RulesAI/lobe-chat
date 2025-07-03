import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

// import remarkParse from 'remark-parse'
// import remarkStringify from 'remark-stringify'

export const parseMarkdown = async (content: string) => {
  const file = await remark().use(remarkGfm).use(remarkHtml).process(content.trim());

  return String(file);
};

// export const parseMarkdown2 = async (content: string) => {
//   const file = await remark().use(remarkParse).use(remarkStringify).process(content.trim());

//   return String(file);
// };
