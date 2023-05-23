import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: `${process.env.UPSTASH_REDIS_REST_URL}`,
  token: `${process.env.UPSTASH_REDIS_REST_TOKEN}`,
});

const encodeURL = async (href: string) => {
  const encodedURL = encodeURIComponent(href);
  return encodedURL;
}

const getValue = async (key: string) => {
  const data: string = await redis.get(key) as string;
  const value: string = data;
  return value;
}

const setKey = async (key: string, value: string) => {
  let returnValue: boolean;
  const data = await redis.set(key, value);
  const responseStatusText = data;
  if (responseStatusText === "OK") {
    returnValue = true;
  } else {
    returnValue = false;
  }
  return returnValue;
}

export { encodeURL, getValue, setKey };