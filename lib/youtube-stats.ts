import type { Locale } from "@/lib/site-content";

type YouTubeApiResponse = {
  items?: Array<{
    snippet?: {
      title?: string;
    };
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
    statistics?: {
      subscriberCount?: string;
      viewCount?: string;
      videoCount?: string;
    };
  }>;
};

type YouTubePlaylistItemsResponse = {
  items?: Array<{
    snippet?: {
      title?: string;
      resourceId?: {
        videoId?: string;
      };
    };
    contentDetails?: {
      videoId?: string;
    };
  }>;
};

export type YouTubeStats = {
  subscribers: string;
  views: string;
  videos: string;
  channelTitle?: string;
  latestVideo?: {
    id: string;
    title: string;
    embedUrl: string;
  };
};

function optionalEnv(key: string) {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

function channelIdForLocale(locale: Locale) {
  return locale === "pt" ? optionalEnv("YOUTUBE_CHANNEL_ID_PT") : optionalEnv("YOUTUBE_CHANNEL_ID_EN");
}

function formatApproximateCount(value: string | undefined, locale: Locale) {
  const count = Number(value);

  if (!Number.isFinite(count) || count <= 0) {
    return undefined;
  }

  const suffixes = [
    { threshold: 1_000_000_000, suffix: "B" },
    { threshold: 1_000_000, suffix: "M" },
    { threshold: 1_000, suffix: "K" }
  ];

  const formatter = new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0
  });

  for (const { threshold, suffix } of suffixes) {
    if (count >= threshold) {
      const roundedDown = Math.floor((count / threshold) * 10) / 10;
      return `${formatter.format(roundedDown)}${suffix}+`;
    }
  }

  return `${formatter.format(Math.floor(count))}+`;
}

export async function getYouTubeStats(locale: Locale): Promise<YouTubeStats | null> {
  const apiKey = optionalEnv("YOUTUBE_API_KEY");
  const channelId = channelIdForLocale(locale);

  if (!apiKey || !channelId) {
    return null;
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "snippet,contentDetails,statistics");
  url.searchParams.set("id", channelId);
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60 * 60 * 6
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as YouTubeApiResponse;
    const channel = data.items?.[0];
    const statistics = channel?.statistics;

    if (!statistics) {
      return null;
    }

    let latestVideo: YouTubeStats["latestVideo"];
    const uploadsPlaylistId = channel?.contentDetails?.relatedPlaylists?.uploads;

    if (uploadsPlaylistId) {
      const playlistUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
      playlistUrl.searchParams.set("part", "snippet,contentDetails");
      playlistUrl.searchParams.set("playlistId", uploadsPlaylistId);
      playlistUrl.searchParams.set("maxResults", "1");
      playlistUrl.searchParams.set("key", apiKey);

      const playlistResponse = await fetch(playlistUrl, {
        next: {
          revalidate: 60 * 60 * 6
        }
      });

      if (playlistResponse.ok) {
        const playlistData = (await playlistResponse.json()) as YouTubePlaylistItemsResponse;
        const latestItem = playlistData.items?.[0];
        const latestVideoId = latestItem?.contentDetails?.videoId ?? latestItem?.snippet?.resourceId?.videoId;

        if (latestVideoId) {
          const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${latestVideoId}`);
          embedUrl.searchParams.set("autoplay", "1");
          embedUrl.searchParams.set("mute", "1");
          embedUrl.searchParams.set("playsinline", "1");
          embedUrl.searchParams.set("rel", "0");
          embedUrl.searchParams.set("modestbranding", "1");

          latestVideo = {
            id: latestVideoId,
            title: latestItem?.snippet?.title?.trim() || "Latest video",
            embedUrl: embedUrl.toString()
          };
        }
      }
    }

    return {
      subscribers: formatApproximateCount(statistics.subscriberCount, locale) ?? "",
      views: formatApproximateCount(statistics.viewCount, locale) ?? "",
      videos: formatApproximateCount(statistics.videoCount, locale) ?? "",
      channelTitle: channel?.snippet?.title?.trim(),
      latestVideo
    };
  } catch {
    return null;
  }
}
