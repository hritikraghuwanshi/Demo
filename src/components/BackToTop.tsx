import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const SCROLL_THRESHOLD = 400;

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="back-to-top-btn fixed bottom-6 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
    >
      <FiArrowUp size={22} className="shrink-0 text-white" />
    </button>
  );
};

export default BackToTop;

