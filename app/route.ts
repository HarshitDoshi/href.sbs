import { encodeURL, getValue, setKey } from '@/utilities';
import { nanoid } from 'nanoid/async';
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let returnValue: {
    status: boolean;
    message?: {
      previous: string;
      next: string;
    };
    error?: string;
  };
  try {
    const requestURL = new URL(request.url)
    const href = requestURL.searchParams.get("href") || "";
    if (!href) {
      return NextResponse.json({
        "index": {
          "message": "Get started with href.sbs by attaching a url to a query parameter named 'href' to the '/' end-point. It is recommended to use a client like cURL for sending requests to href.sbs while we work on our own client for it.",
          "example": "GET http://href.sbs?href=https://shunyaek.se",
        }
      })
    } else {
      const validatedURL = new URL(href);
      const validatedHREF = validatedURL.href;
      const encodedURL = await encodeURL(validatedHREF);
      const isGet = await getValue(encodedURL);
      let sbs: string;
      if (isGet) {
        sbs = isGet;
        returnValue = {
          status: true,
          message: {
            previous: validatedHREF,
            next: `${process.env.APP_URL}/${sbs}`,
          },
        };
      } else {
        sbs = await nanoid(16);
        const isSet = await setKey(encodedURL, sbs)
        const isSetReverse = await setKey(sbs, encodedURL)
        if (isSet && isSetReverse) {
          returnValue = {
            status: true,
            message: {
              previous: validatedHREF,
              next: `${process.env.APP_URL}/${sbs}`,
            },
          };
        } else {
          throw Error("There was an error. Please try again later.")
        }
      }
    }
  } catch (error: any) {
    returnValue = {
      status: false,
      error: `${error.name} ${error.message}`,
    };
  }
  return NextResponse.json(returnValue);
}