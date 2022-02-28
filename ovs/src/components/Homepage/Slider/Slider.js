import { React ,useState, useEffect } from "react";
import { sliderData } from "./Slider-data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const autoSlide = true;
  let slideInterval;
  let intervalTime = 7000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoSlide) {
      auto();
      return () => clearInterval(slideInterval);
    }
  }, [currentSlide]);

  return (
    <div className="slider">
      {sliderData.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "opacity-100 transition-all duration-2000 ease-in-out" : "opacity-0 h-0"}
            key={index}
          >
            {index === currentSlide && (
              <div>
            
                <img
                  src={slide.image}
                  alt={slide.desc}
                  className="relative w-auto h-auto m-auto float-right rounded lg:w-auto lg:h-auto lg:m-auto lg:float-right lg:rounded-bl-full "
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
