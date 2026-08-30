// Single source of truth for the GitHub Pages base path, shared by
// next.config.mjs (build config) and app code (image src prefixing) so
// they can never drift out of sync.
export const repoName = "RentIt";
export const basePath = `/${repoName}`;
