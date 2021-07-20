import { useState, useMemo, useRef } from "react";

export type TAsyncResult<TValue> =
  | TAsyncResult$None
  | TAsyncResult$Pending
  | TAsyncResult$Resolved<TValue>
  | TAsyncResult$Rejected;
export type TAsyncResult$None = { type: "NONE" };
export type TAsyncResult$Pending = { type: "PENDING" };
export type TAsyncResult$Resolved<TValue> = { type: "RESOLVED"; value: TValue };
export type TAsyncResult$Rejected = { type: "REJECTED"; error: any };

export function useAsyncValue<TValue>(
  promise: Promise<TValue> | null
): TAsyncResult<TValue> {
  const lastFinishedPromiseRef = useRef(promise);
  const [result, setResult] = useState<
    null | TAsyncResult$Rejected | TAsyncResult$Resolved<TValue>
  >(null);

  const lastHandledPromiseRef = useRef<null | Promise<unknown>>(null);

  if (
    promise &&
    (lastHandledPromiseRef.current !== promise ||
      lastHandledPromiseRef.current !== lastFinishedPromiseRef.current)
  ) {
    lastHandledPromiseRef.current = promise;
    promise
      .then((value) => {
        setTimeout(() => {
          lastFinishedPromiseRef.current = promise;
          setResult({ type: "RESOLVED", value });
        }, 0);
      })
      .catch((error) => {
        setTimeout(() => {
          lastFinishedPromiseRef.current = promise;
          setResult({ type: "REJECTED", error });
        }, 0);
      });
  }

  return useMemo(() => {
    return !promise
      ? // promise got "cleared" or was never passed
        { type: "NONE" }
      : lastFinishedPromiseRef.current === promise
      ? // finished promise is also the newest one we know
        //@ts-ignore
        result ?? { type: "PENDING", case: 1 }
      : // we have a promise but no result for it yet
        //@ts-ignore
        { type: "PENDING", case: 2 };
  }, [result, promise]);
}
