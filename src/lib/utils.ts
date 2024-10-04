type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate (date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
  // Safari doesn't like dashes
  const dateToFormat = new Date(date.replaceAll('-', '/'));
  const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return dateFormatter.format(dateToFormat);
}

import type { Post } from '$lib/post-types';

export const fetchMarkdownPosts = async () => {
  let allPosts: Post[] = [];

  // !TODO handle the error here so we don't hit 500s
  // documentation: https://vitejs.dev/guide/features.html#glob-import
  const paths = import.meta.glob('/src/routes/blog/*.md', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<Post, 'slug'>;
      const post = { ...metadata, slug } satisfies Post;
      if (post.published && post.date && post.title && post.description && post.longDescription) {
        allPosts.push(post);
      }
    }
  }

  allPosts = allPosts.sort((first, second) =>
    new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return allPosts;
};