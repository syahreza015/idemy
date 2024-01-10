"use server"

import { revalidateTag } from 'next/cache';

export const revalidateTagAction = (tagName: string) => {
  revalidateTag(tagName);
};
