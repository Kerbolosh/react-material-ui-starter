import { TAsyncResult } from "../useAsyncValue";
import { TRoute } from "../types";

export function DemoTitle({
  dataResult,
  routeParams,
}: {
  dataResult: TAsyncResult<null>;
  routeParams: {};
}) {
  return <>Demo</>;
}

export function DemoContent(props: {
  dataResult: TAsyncResult<null>;
  routeParams: {};
}) {
  return <>Demo</>;
}

export const demoRoute: TRoute<any, any> = {
  path: "/demo",
  Title: DemoTitle,
  Content: DemoContent,
};
