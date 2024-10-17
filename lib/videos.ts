import videoTestData from '../data/videos.json';

const fetchVideos = async (url: string) => {
  const BASE_URL = 'youtube.googleapis.com/youtube/v3';

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`,
  );

  return await response.json();
};

export const getCommonVideos = async (url: string) => {
  try {
    const isDev = process.env.DEVELOPMENT;
    const data = isDev ? videoTestData : await fetchVideos(url);

    if (data?.error) {
      console.error('YouTube API error', data.error);
      return [];
    }

    return data?.items.map((video: any) => {
      const snippet = video?.snippet;
      return {
        title: snippet.title,
        imgUrl: snippet.thumbnails.high.url,
        id: video?.id?.videoId ?? video?.id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: video.statistics ?? { viewCount: 0 },
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

export const getYoutubeVideoById = (videoId: string) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};
