/**
 * @doc Unified tool identity for every in-chat tool/service.
 *
 * The shared design is intentionally icon-free: tool cards are text-only so all
 * services (docs, slides, images, video, music, research, coder, web) look
 * identical and stay clean. `ToolIcon` / `ToolIconSm` are kept as no-op
 * components so existing call sites don't need to change.
 */

export type ToolService =
  | "docs"
  | "slides"
  | "images"
  | "video"
  | "music"
  | "research"
  | "coder"
  | "web"
  | "generic";

/** English label for each service — used for consistent card titles. */
export const TOOL_LABELS: Record<ToolService, string> = {
  docs: "Document",
  slides: "Slides",
  images: "Image",
  video: "Video",
  music: "Music",
  research: "Deep Research",
  coder: "Coder",
  web: "Web",
  generic: "Assistant",
};

export function ToolIcon(_props: { service: ToolService; className?: string }) {
  return null;
}

export function ToolIconSm(_props: { service: ToolService; className?: string }) {
  return null;
}

export default ToolIcon;
