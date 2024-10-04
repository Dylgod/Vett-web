import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
  // !TODO put a try/catch in here
  const post = await import(`../${params.slug}.md`);
  const { title, description, longDescription, date, published, canonicalUrl } = post.metadata;
  const content = post.default;

  if (published) {
    return {
      canonicalUrl,
      published,
      title,
      description,
      longDescription,
      date,
      content,
    };
  } else {
    error(404);
  }
};