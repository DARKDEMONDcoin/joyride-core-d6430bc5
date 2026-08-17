/**
 * Unified retry + fallback wrapper for streaming chat/service turns.
 *
 * Wraps an async operation with:
 *  - Exponential backoff (base 400ms, max 2 retries by default)
 *  - Optional fallback model list (tries next model on final failure)
 *  - Abort-signal aware (does not retry after abort)
 *  - Error classification: 429/5xx retryable; 400/401/402/403 not retryable
 *
 * Usage:
 *   await runWithRetry({
 *     signal,
 *     models: ["qwen-max", "qwen-plus"],
 *     run: async (modelId, attempt) => runChatStreamOnce({ model: modelId, ... }),
 *     onRetry: (info) => toast.info(`Retrying with ${info.model}…`),
 *   });
 */

export interface RetryInfo {
  attempt: number;
  model: string;
  error: unknown;
  willRetry: boolean;
  delayMs: number;
}

export interface RunWithRetryOptions<T> {
  /** Model IDs to try in order. First is primary; rest are fallbacks. */
  models: string[];
  /** The operation. Receives the current modelId and attempt (0-indexed). */
  run: (modelId: string, attempt: number) => Promise<T>;
  /** Max retries per model. Default 2 (= 3 attempts per model). */
  maxRetriesPerModel?: number;
  /** Base backoff in ms. Default 400. */
  baseDelayMs?: number;
  /** AbortSignal — no retries once aborted. */
  signal?: AbortSignal;
  /** Called before each retry (skipped if abort). */
  onRetry?: (info: RetryInfo) => void;
  /** Optional classifier override. Return true to force retry. */
  isRetryable?: (err: unknown) => boolean;
}

const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);
const NON_RETRYABLE_STATUS = new Set([400, 401, 402, 403, 404, 422]);

export function classifyError(err: unknown): {
  status?: number;
  retryable: boolean;
  message: string;
} {
  const anyErr = err as {
    status?: number;
    code?: number;
    message?: string;
    name?: string;
  } | null;
  const status = anyErr?.status ?? anyErr?.code;
  const message = anyErr?.message ?? String(err ?? "Unknown error");
  const isAbort = anyErr?.name === "AbortError" || /abort/i.test(message);
  if (isAbort) return { status, retryable: false, message };
  if (typeof status === "number") {
    if (NON_RETRYABLE_STATUS.has(status)) return { status, retryable: false, message };
    if (RETRYABLE_STATUS.has(status)) return { status, retryable: true, message };
  }
  // Network-ish: TypeError from fetch, ECONN*, timeouts
  if (/network|fetch|timeout|econn|socket/i.test(message))
    return { status, retryable: true, message };
  return { status, retryable: false, message };
}

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const t = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);
    const onAbort = () => {
      cleanup();
      reject(new DOMException("Aborted", "AbortError"));
    };
    const cleanup = () => {
      clearTimeout(t);
      signal?.removeEventListener("abort", onAbort);
    };
    signal?.addEventListener("abort", onAbort);
  });

export async function runWithRetry<T>(opts: RunWithRetryOptions<T>): Promise<T> {
  const {
    models,
    run,
    maxRetriesPerModel = 2,
    baseDelayMs = 400,
    signal,
    onRetry,
    isRetryable,
  } = opts;

  if (!models.length) throw new Error("runWithRetry: models list is empty");

  let lastError: unknown = new Error("No attempts made");

  for (let mi = 0; mi < models.length; mi++) {
    const modelId = models[mi];
    for (let attempt = 0; attempt <= maxRetriesPerModel; attempt++) {
      if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
      try {
        return await run(modelId, attempt);
      } catch (err) {
        lastError = err;
        const cls = classifyError(err);
        const forced = isRetryable?.(err);
        const canRetryOnSameModel = attempt < maxRetriesPerModel;
        const shouldRetry = (forced ?? cls.retryable) && canRetryOnSameModel;
        const hasFallback = mi < models.length - 1;

        if (signal?.aborted) throw err;

        if (shouldRetry) {
          const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * 150;
          onRetry?.({
            attempt: attempt + 1,
            model: modelId,
            error: err,
            willRetry: true,
            delayMs: delay,
          });
          await sleep(delay, signal);
          continue;
        }

        // Not retryable on this model — try fallback if available.
        if (hasFallback) {
          onRetry?.({
            attempt: attempt + 1,
            model: models[mi + 1],
            error: err,
            willRetry: true,
            delayMs: 0,
          });
          break; // break inner loop → next model
        }

        throw err;
      }
    }
  }

  throw lastError;
}

export default runWithRetry;
