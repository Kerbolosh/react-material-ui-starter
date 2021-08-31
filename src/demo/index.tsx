import { TAsyncResult } from "../useAsyncValue";
import { TRoute } from "../types";
import {ButtonList} from "./Buttons";
export function DemoTitle({
  dataResult,
  routeParams,
}: {
  dataResult: TAsyncResult<null>;
  routeParams: {};
}) {
  return <>Schweinerei</>;
}

export function DemoContent(props: {
  dataResult: TAsyncResult<null>;
  routeParams: {};
}) {
  return <>
  <ButtonList></ButtonList>
  </>;
}

export const demoRoute: TRoute<any, any> = {
  path: "/demo",
  Title: DemoTitle,
  Content: DemoContent,
};
