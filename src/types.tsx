import MuiAlert from "@material-ui/lab/Alert";
import { ComponentProps, ComponentType } from "react";
import { TAPI } from "./api";
import { TAsyncResult } from "./useAsyncValue";

export type TLocationState =
  | {
      message: {
        text: string;
        severity: Exclude<
          ComponentProps<typeof MuiAlert>["severity"],
          undefined
        >;
      };
    }
  | { returnTo: string }
  | undefined;

export type TRoute<TRouteData, TRouteParams extends {}> = {
  path: string;
  backPath?: string;
  Title: ComponentType<{
    dataResult: TAsyncResult<TRouteData>;
    routeParams: TRouteParams;
  }>;
  Content: ComponentType<{
    dataResult: TAsyncResult<TRouteData>;
    routeParams: TRouteParams;
  }>;
  loadData?: (api: TAPI, params: TRouteParams) => TRouteData;
};
