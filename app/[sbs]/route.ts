import { getValue } from "@/utilities";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { sbs: string } }) {
  let returnValue: {
    status: boolean;
    message?: {
      previous: string;
      next: string;
    };
    error?: string;
  };
  try {
    const sbs = params.sbs;
    const isGet = await getValue(sbs);
    if (isGet !== null) {
      const isGetURL = decodeURIComponent(isGet);
      return NextResponse.redirect(isGetURL);
    } else {
      return NextResponse.redirect(`${process.env.APP_URL}`);
    }
  } catch (error: any) {
    returnValue = {
      status: false,
      error: `${error.name} ${error.message}`,
    };
  }
  return NextResponse.json(returnValue);
}