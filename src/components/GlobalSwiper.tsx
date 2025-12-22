import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'; // ✅ uniquement SwiperCore
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// On enregistre les modules globalement
SwiperCore.use([
  require('swiper/modules/navigation/navigation').Navigation,
  require('swiper/modules/pagination/pagination').Pagination,
  require('swiper/modules/autoplay/autoplay').Autoplay,
]);

interface GlobalSwiperProps {
  slides: string[];
}

const GlobalSwiper: React.FC<GlobalSwiperProps> = ({ slides }) => {
  const nextRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);

  return (
    <div className="global-swiper-container">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: nextRef.current ?? undefined,
          prevEl: prevRef.current ?? undefined,
        }}
        onBeforeInit={(swiper) => {
          const nav = swiper.params.navigation as any;
          nav.nextEl = nextRef.current;
          nav.prevEl = prevRef.current;
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <img src={slide} alt={`Slide ${i}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div ref={nextRef} className="swiper-button-next">›</div>
      <div ref={prevRef} className="swiper-button-prev">‹</div>
    </div>
  );
};

export default GlobalSwiper;
