import { IImageService } from '../../application/interfaces/services/image.service.interace';
import { unsplashApi } from '../../config/unplash.config';

export class ImageService implements IImageService {
  private async searchPhoto(query: string): Promise<string | null> {
    try {
      const res = await unsplashApi.GET('/search/photos', {
        params: {
          query: { query: query.trim(), orientation: 'landscape', per_page: 1 },
        },
      });
      const photo = res.data?.results?.[0];
      return photo?.urls?.regular ?? null;
    } catch (error) {
      console.error(`[ImageService] Error searching photo for "${query}":`, error);
      return null;
    }
  }

  async getDestinationCover(destination: string): Promise<string | null> {
    if (!destination || !destination.trim()) {
      return null;
    }

    const trimmed = destination.trim();
    const primaryName = trimmed.split(',')[0].trim();

    // 1. Try primary city / place name (e.g. "Kannur" from "Kannur, Keralam, India")
    if (primaryName) {
      const photo = await this.searchPhoto(primaryName);
      if (photo) return photo;
    }

    // 2. Try the full destination query if it differs from primary
    if (trimmed !== primaryName) {
      const photo = await this.searchPhoto(trimmed);
      if (photo) return photo;
    }

    // 3. Fallback to a scenic travel photo so destinations are never blank
    const fallbackPhoto = await this.searchPhoto('travel landscape scenic');
    return fallbackPhoto;
  }
}
