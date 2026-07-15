import type { MouseEvent } from "react";

export function scrollToHash(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  const [path = "", hash] = href.split("#");
  if (!hash || window.location.pathname !== (path || "/")) {
    return;
  }
  const target = document.getElementById(hash);
  if (!target) {
    return;
  }
  event.preventDefault();
  target.scrollIntoView();
  history.replaceState(null, "", `#${hash}`);
}
