import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GridMotion.css';

gsap.registerPlugin(ScrollTrigger);

interface GridMotionProps {
    items?: (string | React.ReactNode)[];
    gradientColor?: string;
}

const GridMotion: React.FC<GridMotionProps> = ({ items = [], gradientColor = 'black' }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mouseXRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);

    const totalRows = 8;
    const itemsPerRow = 7;
    const totalItemsCount = totalRows * itemsPerRow;

    const displayItems = useMemo(() => {
        if (items.length === 0) return Array.from({ length: totalItemsCount }, (_, i) => `Item ${i + 1}`);
        let result = [...items];
        while (result.length < totalItemsCount) {
            result = [...result, ...items];
        }
        return result.slice(0, totalItemsCount);
    }, [items, totalItemsCount]);

    useEffect(() => {
        gsap.ticker.lagSmoothing(0);

        const handleMouseMove = (e: MouseEvent) => {
            mouseXRef.current = e.clientX;
        };

        const updateMotion = () => {
            const maxMoveAmount = 200; // Reduced from 300 to keep horizontal motion low
            const baseDuration = 1.2;
            const inertiaFactors = [0.8, 0.5, 0.4, 0.6];

            rowRefs.current.forEach((row, index) => {
                if (row) {
                    const direction = index % 2 === 0 ? 1 : -1;
                    const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;

                    gsap.to(row, {
                        x: moveAmount,
                        duration: baseDuration + (inertiaFactors[index % inertiaFactors.length] || 0),
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }
            });
        };

        const tickerCallback = () => updateMotion();
        gsap.ticker.add(tickerCallback);

        // Multi-Directional Scroll Parallax (Horizontal + Vertical)
        rowRefs.current.forEach((row, index) => {
            if (row) {
                const direction = index % 2 === 0 ? 1 : -1;
                const verticalOffset = (index - totalRows / 2) * 50; // Different vertical speeds
                const horizontalShift = 8 * direction; // Kept low (8%) as requested

                gsap.fromTo(row,
                    {
                        xPercent: -horizontalShift,
                        y: verticalOffset
                    },
                    {
                        xPercent: horizontalShift,
                        y: -verticalOffset,
                        ease: "none",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        }
                    }
                );
            }
        });

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            gsap.ticker.remove(tickerCallback);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="noscroll h-full w-full" ref={gridRef}>
            <section
                className="intro-grid"
                style={{
                    background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
                }}
            >
                <div className="gridMotion-container">
                    {[...Array(totalRows)].map((_, rowIndex) => (
                        <div key={rowIndex} className="row-grid" ref={el => (rowRefs.current[rowIndex] = el)}>
                            {[...Array(itemsPerRow)].map((_, itemIndex) => {
                                const content = displayItems[rowIndex * itemsPerRow + itemIndex];
                                const isImage = typeof content === 'string' && (content.includes('/') || content.startsWith('data:'));

                                return (
                                    <div key={itemIndex} className="row__item-grid">
                                        <div className="row__item-inner-grid">
                                            {isImage ? (
                                                <div
                                                    className="row__item-img-grid"
                                                    style={{
                                                        backgroundImage: `url(${content})`
                                                    }}
                                                ></div>
                                            ) : (
                                                <div className="row__item-content-grid">{content}</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default GridMotion;
