import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Card, Container, Section } from "./ui";
import { fetchTestimonials, type Testimonial } from "../services/api";

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTestimonials()
      .then(setTestimonials)
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [testimonials.length, next, isPaused]);

  if (loading) {
    return (
      <Section>
        <Container>
          <div className="text-center mb-16">
            <div className="h-10 w-64 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-5 w-96 mx-auto mt-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-8 animate-pulse">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-6" />
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  if (testimonials.length === 0) return null;

  const isSingle = testimonials.length === 1;

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Loved by finance teams
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto dark:text-gray-400">
            See what teams building the future of payments are saying.
          </p>
        </motion.div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-8 hover:border-gray-300 dark:hover:border-gray-700/80 transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <FiStar key={j} className="text-amber-400 fill-amber-400" size={18} />
                  ))}
                </div>
                <blockquote className="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold dark:bg-indigo-500/20 dark:text-indigo-300">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel with pause on hover */}
        <div
          ref={carouselRef}
          className="md:hidden overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <FiStar key={j} className="text-amber-400 fill-amber-400" size={18} />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold dark:bg-indigo-500/20 dark:text-indigo-300">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {testimonials[currentIndex].author}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {!isSingle && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 p-2 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <FiChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 p-2 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <FiChevronRight size={24} className="text-gray-700 dark:text-gray-300" />
                </button>
              </>
            )}
          </div>
          {!isSingle && (
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? "w-6 bg-indigo-600"
                      : "w-2 bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default Testimonials;
