import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Modal from "@/app/_components/Modal";

export default function AccessibilityInfoModal() {
  return (
    <Modal
      heading="Required contrast ratio explanation"
      button={<InformationCircleIcon className="pointer-events-none size-6" />}
    >
      <p>
        For WCAG 2.1 AA contrast ratio you have{" "}
        <a
          href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
          target="_blank"
        >
          Success Criterion 1.4.3 Contrast (Minimum)
          <span className="sr-only"> (opens in new tab)</span>
        </a>{" "}
        and for WCAG 2.1 AAA you have{" "}
        <a
          href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html"
          target="_blank"
        >
          Success Criterion 1.4.6 Contrast (Enhanced)
          <span className="sr-only"> (opens in new tab)</span>
        </a>
        .
      </p>

      <table className="mb-6 text-left">
        <thead>
          <tr>
            <th className="px-3 py-2 md:min-w-20">WCAG</th>
            <th className="px-3 py-2 md:min-w-20">AA</th>
            <th className="px-3 py-2 md:min-w-20">AAA</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-slate-300">
            <th className="max-w-64 px-3 py-2">Normal text</th>
            <td className="px-3 py-2">4.5:1</td>
            <td className="px-3 py-2">7.0:1</td>
          </tr>
          <tr className="border-t border-slate-300">
            <th className="max-w-64 px-3 py-2">Large text</th>
            <td className="px-3 py-2">3.0:1</td>
            <td className="px-3 py-2">4.5:1</td>
          </tr>
          <tr className="border-t border-slate-300">
            <th className="max-w-64 px-3 py-2">
              Graphical objects and user interface components
            </th>
            <td className="px-3 py-2">3.0:1</td>
            <td className="px-3 py-2">3.0:1</td>
          </tr>
        </tbody>
      </table>

      <p className="text-sm text-slate-600 dark:text-slate-300">
        Large text is defined as minimal 14 point (18.66px) and bold or 18 point
        (24px).
      </p>
    </Modal>
  );
}
