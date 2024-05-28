import imageUrlBuilder from '@sanity/image-url';

// Create a builder outside the function scope
const imageBuilder = imageUrlBuilder({
    projectId: 'xq20i5im',
    dataset: 'production',
});

export const urlForImage = (source) => {
  // Check if source is null or undefined
  if (!source) {
    return null; // or return a placeholder URL or handle the error in some other way
  }
  // If source is not null or undefined, return the image URL
  return imageBuilder.image(source).auto('format').fit('max').url();
};
