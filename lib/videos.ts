export const getCommonVideos = async (url: string) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    const BASE_URL = 'youtube.googleapis.com/youtube/v3';

    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`,
    );

    const data = await response.json();

    if (data?.error) {
      console.error('YouTube API error', data.error);
      return [];
    }

    return data?.items.map((video: any) => {
      return {
        title: video?.snippet.title,
        imgUrl: video?.snippet.thumbnails.high.url,
        id: video?.id?.videoId ?? video?.id,
      };
    });
  } catch (error) {
    console.error('something went wrong');
    return [];
  }
};

export const getVideos = (searchQuery: string) => {
  const URL = `search?part=snippet&type=video&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`;
  return getCommonVideos(URL);
};
