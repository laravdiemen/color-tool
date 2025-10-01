/**
 * The element has visibility: hidden, which makes it initially un-focusable, creating an error.
 * This ensures an wait until it can activate the trap.
 */
export const checkCanFocusTrap = async (
  elements: (HTMLElement | SVGElement)[],
): Promise<void> => {
  const results = elements.map((element) => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (getComputedStyle(element).visibility !== "hidden") {
          resolve();
          clearInterval(interval);
        }
      }, 5);
    });
  });
  await Promise.all(results);
};
